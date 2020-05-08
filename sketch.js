// creating 2 points that move accross the the screen using 'perlin' random number,
// and create a line between both the random points
// the speed in which 'randomness' is drawn is based on x values


let xOffset1 = [0, 1000, 30, 2000];
let xOffset2 = [0, 800, 60, 1500];
let currentColor = 0;
let currentLineWeight = 0.25;
let colorPallete1 = ["#025159", "#03A696", "#08B9F4", "#FFFFFF"]; // Olive, Bluish, Grey, Pale
let colorPallete2 = ["#F20505", "#F25D27", "##F28705", "#260101"]; // Olive, Bluish, Grey, Pale

function setup() {
  createCanvas(800, 800);
  background(225);
}

function draw() {

  createPerlinEntity(colorPallete1, xOffset1);
  createPerlinEntity(colorPallete2, xOffset2);

  createRandomEntity();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    currentColor--;
  } else if (keyCode === RIGHT_ARROW) {
    currentColor++;
    console.log("Current Color" + currentColor);
  } else if (keyCode === UP_ARROW) {
    console.log('Arrow Up pressed');
  }
}

// Takes ColorPallete,x value offset as params
function createPerlinEntity(pallete, Offset) {
  isInsideArray();   // Check to see if valid color
  let x1 = map(noise(Offset[0]), 0, 1, 0, width); // Perlin Noise returns values from 0 - 1, X sets spot on x axis
  let y1 = map(noise(Offset[1]), 0, 1, 0, height);
  let x2 = map(noise(Offset[2]), 0, 1, 0, width);
  let y2 = map(noise(Offset[3]), 0, 1, 0, height);
  let velocity = mouseX / 100000; // velocity must be small bc perlin values move
  // Choose color of current line
  if (mouseIsPressed == true) {
    if (currentColor == 4 || currentColor > 4) {
      currentColor == 1;
    }
    //Move
    //As velocity increases the space between 2 lines direcly increases
    Offset[0] += velocity;
    Offset[1] += velocity;
    Offset[2] += velocity;
    Offset[3] += velocity;

    //Set Color
    stroke(pallete[currentColor]);
    strokeWeight(currentLineWeight);

    //Draw line
    line(x1, y1, x2, y2);
  }
}

// Random entity looks at a random numbers instead of perlin
let numRandomDrawn = 0;
function createRandomEntity() {
  
  if(numRandomDrawn < 1500){
    let x1 = Math.random() * 800;
    let y1 = Math.random() * 800;
  
    let x2 = Math.random() * 800;
    let y2 = Math.random() * 800;
  
    stroke('#7676');
    strokeWeight(currentLineWeight-0.05);
  
    line(x1, y1, x2, y2); // Create 2 random numbers not related to each other and connect the points
    ++numRandomDrawn;
  }
}

//check if the current color hasn't gone out of bounds
function isInsideArray() {
  if (currentColor >= colorPallete1.length || currentColor <= -1) {
    currentColor = 0;
    console.log("Current Color now " + currentColor);
  } else return;
}
