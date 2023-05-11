let slider;
const synth = new Tone.MonoSynth();

const reverb = new Tone.JCReverb(0.4);
synth.connect(reverb);

let notes =  {
  'a' : 'C4',
  's' : 'D4',
  'd' : 'E4',
  'f' : 'F4',
  'g' : 'G4',
  'h' : 'A4',
  'j' : 'B4',
  'k' : 'C5',
}

function setup() {
  createCanvas(400, 400);
  slider = new Nexus.Slider("#slider");
  reverb.toDestination();
  synth.release = 2;
  synth.resonance = 0.98;
  slider.on('change', (v) => {
    reverb.roomSize.value = v;
  })
  
}

function draw() {
  background(220);
  text("slider adjusts room size of JCReverb", 0, 10);
  text("notes C4-C5 on keys a-k", 0,30 );
}

function keyPressed(){
    let whatNote = notes[key];
    console.log(whatNote);
    synth.triggerAttackRelease(whatNote,0.3);
}