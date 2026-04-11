let instructionsImg;

function drawInstructions() {
    background('#76aaceff');

    if (instructionsImg) {
       imageMode(CENTER);
       image(instructionsImg, width/2, height/2, 1600,900);
    }
}