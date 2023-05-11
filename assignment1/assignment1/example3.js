let redGhost;
let pacman;

function preload() {
  redGhost = loadImage("assets/redGhost.png")
  pacman = loadImage("assets/pacman.png")
}
function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(0); 
  image(pacman,30,25,0.12 * pacman.width,0.12 * pacman.height)
  image(redGhost, 220,25, 0.20 * redGhost.width, 0.20 * redGhost.height)
}
