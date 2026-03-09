let canvasW, canvasH;
let yPos = 0.0; // Perlin noise (controls animation over time)
let gameState = "menu";
let fishX, fishY;

let fishBubbles = [];


function setup() {
    canvasW = windowWidth;
    canvasH = windowHeight;
    createCanvas(canvasW, canvasH);
    fishX = width/2;
    fishY = height/2;
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

        let y = map(noise(xPos, yPos),1, 10,height * 0.15,height * 0.6);

        vertex(x, y);
        xPos += 0.05;
    }

    yPos += 0.01;

    vertex(width, height);
    vertex(0, height);

    endShape(CLOSE);

    // move fish toward mouse
    fishX = lerp(fishX, mouseX, 0.05);
    fishY = lerp(fishY, mouseY, 0.05);

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

        // remove menuBubbles when they leave the screen
        if (fishBubbles[i].y < -50) {
            fishBubbles.splice(i, 1);
        }
    }
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

    let xPos = map(x, 0, width, 0, width * 0.05);

    let y = map( noise(xPos, yPos),0, 10,height * 0.15,height * 0.6);

    return y;
}