let spriteSheet;

let walkingAnimation;
let walkingAnimation2;
let walkingAnimation3;
function preload() {
  spriteSheet = loadImage("assets/SpelunkyGuy.png");
  spriteSheet2 = loadImage("assets/Green.png");
  spriteSheet3 = loadImage("assets/Viking.png");
}
function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  walkingAnimation = new WalkingAnimation(spriteSheet,80,80,200,200,9);
  walkingAnimation2 = new WalkingAnimation(spriteSheet2,80,80, 100,100,9);
  walkingAnimation3 = new WalkingAnimation(spriteSheet3, 80,80, 100, 300,9)
}

function draw() {
  background(220);
  walkingAnimation.draw();
  walkingAnimation2.draw();
  walkingAnimation3.draw();
}

function keyPressed() {
  walkingAnimation.keyPressed();
  walkingAnimation2.keyPressed();
  walkingAnimation3.keyPressed();
}

function keyReleased() {
  walkingAnimation.keyReleased();
  walkingAnimation2.keyReleased();
  walkingAnimation3.keyReleased();
}

class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength){
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0;
    this.xDirection = 1;
  }

  draw() {
    if(this.moving != 0){
      this.u = this.currentFrame % this.animationLength;
    } else {
      this.u=0;
    }
    push();
    translate(this.dx,this.dy);
    scale(this.xDirection,1);
    image(this.spritesheet,0,0,this.sw,this.sh,this.u*this.sw,this.v*this.sh,this.sw,this.sh);
    pop();
    if(frameCount % 6 == 0){
      this.currentFrame++  
    }
      this.dx += this.moving;
  }
  keyPressed() {
      if(keyCode === RIGHT_ARROW){
        this.moving = 1;
        this.xDirection = 1;
        this.currentFrame = 1;
    } else if(keyCode === LEFT_ARROW) {
      this.moving = -1;
      this.xDirection = -1;
      this.currentFrame = 1;
    }
  }
  keyReleased() {
    if(keyCode === RIGHT_ARROW){
      this.moving = 0;
    } else if(keyCode === LEFT_ARROW) {
      this.moving = 0;
    }
  }
}