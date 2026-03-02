let canvasW, canvasH;
let yPos = 0.0; // Perlin noise (controls animation over time)
let gameState = "menu";


function setup() {
    canvasW = windowWidth;
    canvasH = windowHeight;
    createCanvas(canvasW, canvasH);
}

function draw() {

    if (gameState === "menu") {
        drawMenu();
    } 
    else if (gameState === "simulation") {
        drawSimulation();
    }
}

function drawMenu() {
    background('#76aace');

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    textFont("Averia Sans Libre");
    text("Ocean Simulation", width / 2, height / 2 - 50);

    textSize(25);
    text("this", width/2, height/2 + 20);

    // Start button
    fill(255);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 100, 200, 60, 10);

    fill(0);
    textSize(25);
    text("Start", width / 2, height / 2 + 100);
}


function drawSimulation() {
    background('#f6f5f5ff');

    fill('#76aace');
    noStroke();
    beginShape();

    let xPos = 0;

    for (let x = 0; x <= width; x += 10) {

        let y = map(
            noise(xPos, yPos),
            1, 10,   // FIXED noise range
            height * 0.15,
            height * 0.6
        );

        vertex(x, y);
        xPos += 0.05;
    }

    yPos += 0.01;

    vertex(width, height);
    vertex(0, height);

    endShape(CLOSE);
}

function mousePressed() {

    if (gameState === "menu") {

        // Check if mouse is inside Start button
        if (
            mouseX > width / 2 - 100 &&
            mouseX < width / 2 + 100 &&
            mouseY > height / 2 + 20 &&
            mouseY < height / 2 + 80
        ) {
            gameState = "simulation";
        }

    }
}

// keeps canvas full screen if window resizes
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}