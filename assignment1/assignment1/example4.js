let redStar

function preload(){
  redStar = loadImage("assets/redStar.png")
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0,0,255);
  strokeWeight(4);
  stroke(255);
  fill(124,252,0)
  circle(200,200,300);
  image(redStar, 48, 48, 0.5 *redStar.width, 0.5 *redStar.height)
  
  
}
