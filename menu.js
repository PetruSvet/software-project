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

function drawMenu() {
    background('#76aace');

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

