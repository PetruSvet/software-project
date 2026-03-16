let waveColour       = '#76aaceff';
let backgroundColour         = '#f6f5f5';
let trashFrame   = 120;    // frames between new trash spawns
let bubbleSpawn    = 0.02;   // probability per frame
let fishLerp        = 0.01;   // fish tracking speed
let seabinSpeed     = 0.4;    // pixels per frame
let waveTop         = 0.15;   // wave height range (fraction of canvas)
let waveBot         = 0.60;


let canvasW, canvasH;
let noiseOffset = 0;
let gameState   = 'menu';

let fishX, fishY;
let fishBubbles = [];

let trashImages = [];
let trash       = [];

let seabinImg;
let seabinX;
let arrowImg;


function preload() {
    let files = ['bottle', 'can', 'sixpackrings', 'straw', 'trashbag'];
    trashImages = files.map(name => loadImage(`images/${name}.png`));
    seabinImg = loadImage('images/seabin.png');
    arrowImg = loadImage('images/arrow.png');
}

function setup() {
    canvasW = windowWidth;
    canvasH = windowHeight;
    createCanvas(canvasW, canvasH);

    fishX  = width  / 2;
    fishY  = height / 2;
    seabinX = width * 0.75;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function draw() {

    if (gameState === 'menu') {
        drawMenu();
    } 
    else if (gameState === 'simulation') {
        drawSimulation();
        drawArrow();
    }
    else if (gameState === 'instructions') {
        drawInstructions();
        drawArrow();
    }
}


function drawSimulation() {
    background(backgroundColour);

    drawWave();
    spawnEntities();
    updateAndDrawTrash();
    updateAndDrawFish();
    updateAndDrawBubbles();
    updateAndDrawSeabin();
}

function drawWave() {
    fill(waveColour);
    noStroke();
    beginShape();

    for (let x = 0; x <= width; x += 10) {
        let nx = map(x, 0, width, 0, width * 0.008);
        let y  = map(noise(nx, noiseOffset), 1, 10, height * waveTop, height * waveBot);
        vertex(x, y);
    }

    vertex(width, height);
    vertex(0,     height);
    endShape(CLOSE);

    noiseOffset += 0.003;
}

function spawnEntities() {
    if (trashImages.length > 0 && frameCount % trashFrame === 0) {
        trash.push(new Trash());
    }
    if (random(1) < bubbleSpawn) {
        fishBubbles.push(new Bubble());
    }
}

function updateAndDrawTrash() {
    for (let i = trash.length - 1; i >= 0; i--) {
        let t = trash[i];
        t.update();
        t.display();

        if (t.x < -100 || t.x > width + 100 || t.alpha <= 0) {
            trash.splice(i, 1);
        }
    }
}

function updateAndDrawFish() {
    // Smoothly follow the mouse
    fishX = lerp(fishX, mouseX, fishLerp);
    fishY = lerp(fishY, mouseY, fishLerp);

    // Keep the fish below the water surface
    let waveY = getWaveHeight(fishX);
    if (fishY < waveY + 20) fishY = waveY + 20;

    let angle = atan2(mouseY - fishY, mouseX - fishX);

    push();
    translate(fishX, fishY);
    rotate(angle);
    drawFish();
    pop();
}

function updateAndDrawBubbles() {
    for (let i = fishBubbles.length - 1; i >= 0; i--) {
        let b = fishBubbles[i];
        b.update();
        b.display();

        if (b.y < getWaveHeight(b.x)) {
            fishBubbles.splice(i, 1);
        }
    }
}

function updateAndDrawSeabin() {
    // Wrap seabin across screen
    if (seabinX > width + 60) seabinX = -50;

    let seabinY = getWaveHeight(seabinX) + sin(frameCount * 0.05) * 3;

    push();
    imageMode(CENTER);
    image(seabinImg, seabinX, seabinY - 0, 120, 120);
    pop();
}


function drawFish() {
    fill(backgroundColour);
    stroke(255);

    ellipse(10,  0,  70, 28);   // body
    ellipse(35,  0,  28, 20);   // head

    triangle(-20, 0,  -35, -8,  -35, 8);   // tail base
    triangle(-35, -8, -55, -18, -45, -2);  // upper fork
    triangle(-35,  8, -55,  18, -45,  2);  // lower fork

    triangle(5, -14, 18, -30, 28, -12);    // top fin
    triangle(5,  14, 18,  30, 28,  12);    // bottom fin
}


function mousePressed() {
    if      (gameState === 'menu')         menuMousePressed();
    else if (gameState === 'instructions') gameState = 'menu';
}


function getWaveHeight(x) {
    x = constrain(x, 0, width);
    let nx = map(x, 0, width, 0, width * 0.05);
    return map(noise(nx, noiseOffset), 1, 10, height * waveTop, height * waveBot);
}


class Trash {

    constructor() {
        this.img = random(trashImages) ?? trashImages[0];
        this.size = random(40, 80);
        this.alpha = 255;
        this.wobbleOffset = random(1000);
        this.angle = random(TWO_PI);
        this.rotationSpeed = random(-0.01, 0.01);
        this.collected = false;

        let fromLeft = random() < 0.5;
        this.x = fromLeft ? -50 : width + 50;
        this.speed = fromLeft ? random(0.5, 1.5) : -random(0.5, 1.5);
        this.y = random(height * 0.3, height * 0.8);
    }

    update() {
        this.x += this.speed;
        this.y += sin(frameCount * 0.05 + this.wobbleOffset) * 0.5;
        this.angle += this.rotationSpeed;

        let d = dist(this.x, this.y, fishX, fishY);
        if (d < this.size / 2 + 40) this.collected = true;

        if (this.collected) {
            this.alpha -= 8;
            this.size  *= 0.97;
        }
    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        imageMode(CENTER);
        tint(255, this.alpha);
        image(this.img, 0, 0, this.size, this.size);
        pop();
    }
}

    function drawArrow() {

        push();

        imageMode(CORNER);
        tint('#76aaceff');
        image(arrowImg, 20, 20, 40, 40);

        noTint();
        fill('#76aaceff');
        noStroke();
        textSize(18);
        textAlign(LEFT, CENTER);

        text("Press ESC to go back to the menu", 70, 40);

        pop();
    }

    function keyPressed() {

        if (keyCode === ESCAPE && gameState !== 'menu') {
            gameState = 'menu';
            return false; // prevents browser default ESC behaviour
        }

    }