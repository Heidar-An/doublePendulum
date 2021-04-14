//variable declaration used in the program
let length = 100;
let g = 2;
let mOne = 40;
let mTwo = 40;

let angleOne;
let angleOneV = 0;
let angleOneA = 0;

let angleTwo;
let angleTwoV = 0;
let angleTwoA = 0;
let endPointOne;
let endPointTwo;
let points = []
let pointsTwo = []
function setup() {
  
  createCanvas(600, 600);
  angleOne = PI / 2;
  angleTwo = PI / 2;
  endPointOne = createVector();
  endPointTwo = createVector();
}

function draw() {
  background(220);
  strokeWeight(4);
  //distance of the lines
  let lengthOneC = cos(angleOne) * length;
  let lengthOneS = sin(angleOne) * length;
  let lengthTwoC = cos(angleTwo) * length;
  let lengthTwoS = sin(angleTwo) * length;
  
  //add on the width / 2 for the first pendulum to make it at the center, add on the length of the second pendulum plus the distance of the first so they are "connected"
  endPointOne.x = lengthOneS + width / 2;
  endPointOne.y = lengthOneC;
  endPointTwo.x = lengthTwoS + endPointOne.x;
  endPointTwo.y = lengthTwoC + endPointOne.y;
  
  //angle acceleration adds onto angle velocity which adds onto angle
  angleOneA = pendulumOne();
  angleOneV += angleOneA;
  angleOne += angleOneV;
  
  //angle acceleration adds onto angle velocity which adds onto angle
  angleTwoA = pendulumTwo();
  angleTwoV += angleTwoA;
  angleTwo += angleTwoV;
  
  //damping to make it lose speed over time
  angleOneV *= 0.99;
  angleTwoV *= 0.99;
  
  trace(endPointTwo.x, endPointTwo.y)
  traceTwo(endPointOne.x, endPointOne.y)
  strokeWeight(4)
  line(width / 2, 0, endPointOne.x, endPointOne.y)
  line (endPointOne.x, endPointOne.y, endPointTwo.x, endPointTwo.y)
  circle(endPointOne.x, endPointOne.y, 40)
  circle(endPointTwo.x, endPointTwo.y, 40)
}

//formula for the first pendulum split into multiple parts
function pendulumOne(){
  let firstPart = -g * (2 * mOne + mTwo) * sin(angleOne);
  let secondPart = -mTwo * g * sin(angleOne - 2 * angleTwo);
  let thirdPart = -2 * sin(angleOne - angleTwo) * mTwo 
  let fourthPart = (angleTwoV * angleTwoV * length) + (angleOneV * angleOneV * length * cos(angleOne - angleTwo))
  
  let newTopLine = firstPart + secondPart + thirdPart * fourthPart
  
  let bottomLine = length*(2 * mOne + mTwo - mTwo * cos(2 * angleOne - 2 * angleTwo))
  
  return newTopLine / bottomLine;
}

//formula for the second pendulum split into multiple parts
function pendulumTwo(){
  let firstPart = 2 * sin(angleOne - angleTwo)
  let otherPart = angleOneV * angleOneV * length * (mOne + mTwo)
  
  let secondPart = g * (mOne + mTwo) * cos(angleOne)
  let thirdPart = angleTwoV * angleTwoV * length * mTwo * cos(angleOne - angleTwo)
  
  let newTopLine = firstPart * (otherPart + secondPart + thirdPart);
  
  
  let bottomLine = length * ((2 * mOne) + mTwo - (mTwo * cos((2 * angleOne) - (2 * angleTwo))))
  
  return newTopLine / bottomLine;
}

//create a trace for the path of the first pendulum
function trace(xCor, yCor){
  points.push([xCor, yCor])
  for (let i = 0; i < points.length - 1; i++){
    strokeWeight(2);
    stroke(51);
    line(points[i][0], points[i][1], points[i+1][0], points[i+1][1])
  }
}
//create a trace for the path of the second pendulum
function traceTwo(xCor, yCor){
  pointsTwo.push([xCor, yCor])
  for (let i = 0; i < points.length - 1; i++){
    strokeWeight(2);
    stroke(51);
    line(pointsTwo[i][0], pointsTwo[i][1], pointsTwo[i+1][0], pointsTwo[i+1][1])
  }
}
