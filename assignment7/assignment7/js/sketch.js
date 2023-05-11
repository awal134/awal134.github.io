let initTone = true;

let rain;

let gain = new Tone.Gain().toDestination();
let noise = new Tone.Noise('white').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.6,
  decay: 2.0,
  sustain: 0.5,
  release: 2.0
}).connect(gain);

let noiseT = new Tone.Noise('white').start();
noiseTEnv = new Tone.AmplitudeEnvelope( {
  attack: 0.1,
  decay: 0.0,
  sustain: 0.5,
  release: 2.0
}).connect(gain);

let noiseTFilter = new Tone.Filter(400, "lowpass").connect(noiseTEnv);
noiseT.connect(noiseTFilter);

let noiseFilter = new Tone.Filter(1000, "highpass").connect(noiseEnv);
noise.connect(noiseFilter);

function preload() {
  rain = loadImage("assets/rain.jpg")
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  image(rain,0,0,400,400)
  fill(255);
  text('press space to initilize audio', 120, 390);
}

function keyPressed(){
  if(keyCode === 32 && initTone  === true) {
    Tone.start();
    initTone = false;
  }
}

function mousePressed() {
  console.log('pressed');
  noiseEnv.triggerAttackRelease(5.0);
  noiseTEnv.triggerAttackRelease(1.0, 2.5);
}