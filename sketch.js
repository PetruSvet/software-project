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
        menuMousePressed();
    }
    else if (gameState === "instructions") {
        gameState = "menu";  // go back to menu
    }

}

// keeps canvas full screen if window resizes
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}