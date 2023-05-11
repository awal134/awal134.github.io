
let color;


function setup() {
  createCanvas(500, 300);
  background(225);
}

function draw() {
  if(mouseX >20) {
    if(mouseIsPressed == true){
    
    strokeWeight(2);
    line(mouseX,mouseY,pmouseX,pmouseY);
    stroke(color);
    }  
  } 
  fill(255,0,0)
  square(0,50,20);
  fill(255,165,0);
  square(0,73,20);
  fill(255,255,0);
  square(0,96,20);
  fill(0,255,0);
  square(0,119,20);
  fill(0,255,255);
  square(0,142,20);
  fill(0,0,255);
  square(0,165,20);
  fill(255,0,255);
  square(0,188,20);
  fill(150,75,0);
  square(0,211,20);
  fill(255,255,255);
  square(0,234,20);
  fill(0,0,0);
  square(0,257,20);
}
function mousePressed(){
  if(mouseX <= 20){
    color = get(mouseX, mouseY);
  }
}