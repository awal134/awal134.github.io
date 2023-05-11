let sound1 = new Tone.Player("game.wav");

let sounds = new Tone.Players( {
  "note1" : "media/note1.mp3",
  "note2" : "media/note2.mp3",
  "note3" : "media/note3.mp3",
  "note4" : "media/note4.mp3"
})

const delay = new Tone.FeedbackDelay("8n", 0.5);
let soundNames = ["note1", "note2", "note3", "note4"];
let buttons = [];

let dSlider;
let fSlider;

function setup() {
  createCanvas(400, 400);
  sounds.connect(delay);
  delay.toDestination();
  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(index, index * 50);
    buttons[index].mousePressed(() => buttonSound(word));
  })

  dSlider = createSlider(0., 1., 0.5, 0.05);
    dSlider.mouseReleased(() => {
    delay.delayTime.value = dSlider.value();
    })

  fSlider = createSlider(0., 1., 0.5, 0.05);
    fSlider.mouseReleased(() => {
    delay.feedback.value = fSlider.value();
    })
}

function draw() {
  background(220,120,180);
  text('press the buttons for sound', 0, 200);
  text('Left slider for delay, Right Slider for feedback', 0, 250);
}

function buttonSound(whichSound){
    sounds.player(whichSound).start();
}