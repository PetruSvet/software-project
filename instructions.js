function drawInstructions() {
    background('#76aace');

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("Instructions", width / 2, height / 2 - 200);

    textSize(25);
    text(
        "Use your mouse to interact with the ocean.\n\n" +
        "Observe how pollution affects marine life.\n\n" +
        "Click anywhere to return to the menu.",
        width / 2,
        height / 2
    );
}