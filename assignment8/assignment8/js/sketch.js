let SpriteSheet;
let chronoSheet;

let walkingAnimation;
let walkingAnimation2;
let chronoAnimation

let spriteSheetFilenames = ["Bug.png"]
let spriteSheets = [];
let animations = [];

const gameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver"
};

let game = {score : 0, maxScore: 0, maxTime: 30, elapsedTime: 0, totalSprites: 15, state: gameState.Start  };

let sounds = new Tone.Players( {
  "squish" : "media/squish.mp3",
  "gameOver" : "media/gameOver.mp3"
})

let synthMel = new Tone.PluckSynth().toDestination();
let synthBass = new Tone.PolySynth().toDestination();
let melody = new Tone.Sequence((time,note) => {
  synthMel.triggerAttackRelease(note, '8n', time);
}, ['G2','Eb2', 'F2', 'Eb2', 'Ab2', 'Eb2', 'G2', 'Eb2',"G2", 'Eb2', 'C2', 'Eb2', 'F2', 'Eb2', 'D2', 'Eb2']);
let bass = new Tone.Sequence((time,note) => {
  synthBass.triggerAttackRelease(note, '16n', time);
}, ['C2']);

function preload() {
  for(let i =0; i < spriteSheetFilenames.length; i++){
    spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
  }
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES);
  for(let i =0; i< game.totalSprites; i++){
    animations[i] = new WalkingAnimation(random(spriteSheets), 80,80,random(100,300),random(100,300),6, random(1,5),6, random([0,1]));
  }
  
  
}
function reset() {
  game.elapsedTime =0;
  game.score = 0;
  animations = [];
  for(let i =0; i< game.totalSprites; i++){
    animations[i] = new WalkingAnimation(random(spriteSheets), 80,80,random(100,300),random(100,300),6, random(1,5),6, random([0,1]));
  }
  
}

function draw() {
  switch(game.state) {
    case gameState.Playing:
      background(220);
      Tone.start();
      melody.start();
      bass.start(); 
      Tone.Transport.start();
      for(let i =0; i < animations.length; i++){
       animations[i].draw();
      }
      textSize(40);
      text(game.score, 20,40);
      let currentTime = game.maxTime - game.elapsedTime;
      text(ceil(currentTime), 300, 40);
      game.elapsedTime += deltaTime/1000;

      if(currentTime <0) {
       game.state = gameState.GameOver;
       melody.stop();
       bass.stop();
       sounds.player("gameOver").start();
      }
      
      break;
  
    case gameState.GameOver:
      game.maxScore = max(game.score, game.maxScore);
      background(0);
      fill(255);
      textSize(40);
      textAlign(CENTER);
      text("Game Over!",200,200);
      textSize(35);
      text("Score: " + game.score,200,270);
      text("Max Score : " + game.maxScore,200,320);
      break;
    case gameState.Start :
      background(0);
      fill(255);
      textSize(50);
      textAlign(CENTER);
      text("Bug Squish",200,200);
      textSize(30);
      text("Press any key to start", 200,300);
      break;
    } 
}
function keyPressed(){
  switch(game.state){
    case gameState.Start:
      game.state = gameState.Playing;
      break;
    case gameState.GameOver:
      reset();
      game.state = gameState.Playing;
      break;
  }
}

function mousePressed() {
  switch(game.state) {
    case gameState.Playing:
      for(let i =0; i < animations.length; i++) {
      let contains = animations[i].contains(mouseX, mouseY);
      if(contains) {
        if(animations[i].moving != 0){
          animations[i].stop();
          game.score += 1; 
          Tone.start();
          sounds.toDestination();
          sounds.player("squish").start();
        } 
    }
  }
    break;
} 
  
}

class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength,speed, framerate, vertical = false, offsetX = 0, offsetY = 0,){
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.speed = speed;
    this.framerate = framerate* speed;
    this.vertical = vertical;
  }

  draw() {
    this.speed = game.score/3 + random(1,5);
    if(this.moving != 0){
      this.u = this.currentFrame % this.animationLength;
    } else {
      this.u;
    }
    push();
    translate(this.dx,this.dy);
    if(!this.vertical){
      rotate(90);
      if(this.xDirection < 0) {
        rotate(180);
      }
    }
    if(this.xDirection > 0 && this.vertical) {
      rotate(180);
    }
    scale(this.xDirection,1);
    image(this.spritesheet,0,0,this.sw,this.sh,this.u*this.sw,this.v*this.sh,this.sw,this.sh);
    pop();
    let proportionalFramerate = round(frameRate() /this.framerate);
    if(frameCount % proportionalFramerate == 0){
      this.currentFrame++  
    }
      if(this.vertical){
        this.dy += this.moving *this.speed;
        this.move(this.dy, this.sw/3, height - this.sw/3);
      } else {
        this.dx += this.moving *this.speed;
        this.move(this.dx, this.sw/3, width - this.sw/3);
      }
      
  }

  move(position, lowerBounds, upperBounds){
    if(position > upperBounds) {
        this.moveLeft();
      } else if(position < lowerBounds) {
        this.moveRight() 
      }
  }
  moveRight(){
    this.moving = 1;
    this.xDirection = 1;
  }
  moveLeft (){
    this.moving = -1;
    this.xDirection = -1;
  }
  contains(x,y) {
    let insideX = x >= this.dx - 26 && x <= this.dx + 50;
    let insideY = y >= this.dy - 35 && y <= this.dy + 35;
    return insideX && insideY;
  }
  stop() {
    this.moving = 0;
    this.u = 7;
    this.v = 0; 
  }
}