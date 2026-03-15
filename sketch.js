let canvasW, canvasH;
let yPos = 0.0; // Perlin noise (controls animation over time)
let gameState = "menu";
let fishX, fishY;
let trashImages = [];
let trash = [];
let maxTrash = 10;
let fishBubbles = [];
let seabinImg;
let seabinX;

function preload() {
    console.log("preload running");
    trashImages.push(loadImage("images/bottle.png"));
    trashImages.push(loadImage("images/can.png"));
    trashImages.push(loadImage("images/sixpackrings.png"));
    trashImages.push(loadImage("images/straw.png"));
    trashImages.push(loadImage("images/trashbag.png"));
    seabinImg = loadImage("images/seabin.png");
}


function setup() {
    canvasW = windowWidth;
    canvasH = windowHeight;
    createCanvas(canvasW, canvasH);
    fishX = width/2;
    fishY = height/2;
    console.log(trashImages);
    console.log("images:", trashImages);
    seabinX = width * 0.75; 
}

function draw() {

    if (gameState === "menu") {
        drawMenu();
    } 
    else if (gameState === "simulation") {
        drawSimulation();
    }
    else if (gameState === "instructions") {
        drawInstructions();
    }
}

function drawSimulation() {

    background('#f6f5f5ff');
    fill('#76aace');
    noStroke();
    beginShape();

    let xPos = 0;

    if (trashImages.length > 0 && frameCount % 120 === 0) {
        trash.push(new Trash());
    }

    if (random(1) < 0.02) {
        fishBubbles.push(new Bubble());
    }

    for (let x = 0; x <= width; x += 10) {

        let y = map(noise(xPos, yPos),1, 10,height * 0.15,height * 0.6);

        vertex(x, y);
        xPos += 0.05;
    }

    yPos += 0.01;

    vertex(width, height);
    vertex(0, height);

    endShape(CLOSE);

    for (let i = trash.length - 1; i >= 0; i--) {

        let t = trash[i];

        if (!t) continue;

        t.update();
        t.display();

        if (t.x < -100 || t.x > width + 100) {
            trash.splice(i,1);
        }

    }

    // move fish toward mouse
    fishX = lerp(fishX, mouseX, 0.01);
    fishY = lerp(fishY, mouseY, 0.01);

    // keep fish under the wave
    let waveY = getWaveHeight(fishX);

    if (fishY < waveY + 20) {
        fishY = waveY + 20;
    }

    // calculate angle to mouse
    let angle = atan2(mouseY - fishY, mouseX - fishX);

    push();
    translate(fishX, fishY);
    rotate(angle);

    drawFish();

    pop();

    for (let i = fishBubbles.length - 1; i >= 0; i--) {

        fishBubbles[i].update();
        fishBubbles[i].display();

        let waveY = getWaveHeight(fishBubbles[i].x);

        // remove bubble when it reaches water surface
        if (fishBubbles[i].y < waveY) {
            fishBubbles.splice(i, 1);
        }
    }

            
        if (seabinX > width + 60) {
            seabinX = -50;
        }

        // get wave height at seabin position
        let seabinY = getWaveHeight(seabinX) + sin(frameCount * 0.05) * 3;

        // draw seabin floating
        push();
        imageMode(CENTER);
        translate(seabinX, seabinY - 10); // slightly above the wave
        image(seabinImg, 0, 0, 120, 120);
        pop();
}

function mousePressed() {

    if (gameState === "menu") {
        menuMousePressed();
    }
    else if (gameState === "instructions") {
        gameState = "menu";  // go back to menu
    }

}

function drawFish() {

  fill('#f6f5f5ff')
  stroke(255);

  // body
  ellipse(10, 0, 70, 28);

  // head
  ellipse(35, 0, 28, 20);

  // tail base
  triangle(-20, 0, -35, -8, -35, 8);

  // forked tail
  triangle(-35, -8, -55, -18, -45, -2);
  triangle(-35, 8, -55, 18, -45, 2);

  // top fin
  triangle(5, -14, 18, -30, 28, -12);

  // bottom fin
  triangle(5, 14, 18, 30, 28, 12);
}

// keeps canvas full screen if window resizes
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function getWaveHeight(x) {

    x = constrain(x, 0, width);

    let xPos = map(x, 0, width, 0, width * 0.05);

    let y = map(noise(xPos, yPos), 1, 10, height * 0.15, height * 0.6);

    return y;
}

class Trash {

    constructor() {

        this.img = random(trashImages);

        if (!this.img) {
            this.img = trashImages[0];
        }

        this.size = random(40, 80);

        this.side = random(["left","right"]);

        if (this.side === "left") {
            this.x = -50;
            this.speed = random(0.5, 1.5);
        } else {
            this.x = width + 50;
            this.speed = -random(0.5, 1.5);
        }

        this.y = random(height * 0.3, height * 0.8);

        this.wobbleOffset = random(1000);

        this.angle = random(TWO_PI);
        this.rotationSpeed = random(-0.01,0.01);
    }

    update() {

        this.x += this.speed;   

        this.x = constrain(this.x, -100, width + 100);

        this.y += sin(frameCount * 0.05 + this.wobbleOffset) * 0.5;

        this.angle += this.rotationSpeed;

    }

    display() {

        push();

        translate(this.x, this.y);
        rotate(this.angle);

        imageMode(CENTER);
        image(this.img, 0, 0, this.size, this.size);

        pop();
    }

}