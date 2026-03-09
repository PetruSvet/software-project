let startButton = {
    x: 0,
    y: 0,
    w: 200,
    h: 60
};

let instructionsButton = {
    x: 0,
    y: 0,
    w: 200,
    h: 60
};

let bubbles = [];

class Bubble {
    constructor() {
        this.x = random(width);
        this.y = height + random(50); // start below screen
        this.size = random(10, 40);
        this.speed = random(0.5, 2);
    }

    update() {
        this.y -= this.speed;
        this.x += sin(frameCount * 0.05) * 0.5;
    }

    display() {
        noFill();
        stroke(255, 180);
        strokeWeight(2);
        ellipse(this.x, this.y, this.size);
    }
}


function drawMenu() {

     background('#76aace'); 

    if (random(1) < 0.05) {
        bubbles.push(new Bubble());
    }

    for (let i = bubbles.length - 1; i >= 0; i--) {

        bubbles[i].update();
        bubbles[i].display();

        // remove bubbles when they leave the screen
        if (bubbles[i].y < -50) {
            bubbles.splice(i, 1);
        }
    }

    fill(255);
    textAlign(CENTER, CENTER);
    textFont("Averia Sans Libre");

    textSize(100);
    text("Ocean Simulation", width / 2, height / 2 - 300);

    textSize(30);
    text(
        "This project is inspired by SDG 14: 'Life Below Water'.\n\n" +
        "Through this interactive ocean simulation, my aim is to raise awareness about marine pollution and its impact on sea life.\n\n" +
        "Explore the waves and discover how our actions affect the ocean.",
        width / 2,
        height / 2 - 50
    );

    // Set button position
    startButton.x = width / 2 - 90;
    startButton.y = height / 2 + 150;

    instructionsButton.x = width / 2 + 150;
    instructionsButton.y = height /2 + 150;

    // Draw button
    fill(255);
    rectMode(CENTER);
    rect(startButton.x, startButton.y, startButton.w, startButton.h, 10);

    fill(0);
    textSize(25);
    text("Start", startButton.x, startButton.y);

    // Draw Instructions button
    fill(255);
    rect(instructionsButton.x, instructionsButton.y, instructionsButton.w, instructionsButton.h, 10);

    fill(0);
    text("Instructions", instructionsButton.x, instructionsButton.y);
    }

function menuMousePressed() {
    if (
        mouseX > startButton.x - startButton.w / 2 &&
        mouseX < startButton.x + startButton.w / 2 &&
        mouseY > startButton.y - startButton.h / 2 &&
        mouseY < startButton.y + startButton.h / 2
    ) {
        gameState = "simulation";
    }

    if (
        mouseX > instructionsButton.x - instructionsButton.w / 2 &&
        mouseX < instructionsButton.x + instructionsButton.w / 2 &&
        mouseY > instructionsButton.y - instructionsButton.h / 2 &&
        mouseY < instructionsButton.y + instructionsButton.h / 2
    ) {
        gameState = "instructions";
    }

}
