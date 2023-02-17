<script src="libraries/p5.js"></script>
<script src="libraries/ml5.min.js"></script>
<script src="libraries/p5.dom.min.js"></script>
<script src="libraries/p5.sound.min.js"></script>
<script src="libraries/ml5.min.js"></script>
<script src="libraries/ml5.min.js" type="text/javascript"></script>

let imageModelURL = 'https://teachablemachine.withgoogle.com/models/I_02OOZ7-/';
let video;
let flippedVideo;
let label = "";
let BRUTSound, BRUT_NATURESound, ROSESound, SEMI_SECSound, BRUT_RESERVASound;
let audioContext;

// flags to prevent overlapping sounds
let BRUTPlaying = false;
let BRUT_NATUREPlaying = false;
let ROSEPlaying = false;
let SEMI_SECPlaying = false;
let BRUT_RESERVAPlaying = false;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  BRUTSound = loadSound('audios/gran_baron.ogg');
  BRUT_NATURESound = loadSound('audios/gran_baron1.ogg');
  ROSESound = loadSound('audios/gran_baron2.ogg');
  SEMI_SECSound = loadSound('audios/gran_baron3.ogg');
  BRUT_RESERVASound = loadSound('audios/gran_baron4.ogg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  flippedVideo = ml5.flipImage(video);
  classifyVideo();
  audioContext = getAudioContext();
}

function draw() {
  background(0);
  image(flippedVideo, 0, 0, width, height);
  fill(255);
  textSize(40);
  textAlign(CENTER);
  text(label, width / 2, height - 50);
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  if (results[0].confidence > 0.9) {
    label = results[0].label;
    // pause all sounds
    BRUTSound.pause();
    BRUT_NATURESound.pause();
    ROSESound.pause();
    SEMI_SECSound.pause();
    BRUT_RESERVASound.pause();
    // set flags to false
    BRUTPlaying = false;
    BRUT_NATUREPlaying = false;
    ROSEPlaying = false;
    SEMI_SECPlaying = false;
    BRUT_RESERVAPlaying = false;
    // check which sound to play
    if (label === "BRUT") {
      if (!BRUTPlaying) {
        BRUTPlaying = true;
        BRUTSound.play(0, 1, 1);
      }
    } else if (label === "BRUT_NATURE") {
      if (!BRUT_NATUREPlaying) {
        BRUT_NATUREPlaying = true;
        BRUT_NATURESound.play(0, 1, 1);
      }
    } else if (label === "ROSE") {
      if (!ROSEPlaying) {
        ROSEPlaying = true;
        ROSESound.play(0, 1, 1);
      }
    } else if (label === "SEMI_SEC") {
      if (!SEMI_SECPlaying) {
        SEMI_SECPlaying = true;
        SEMI_SECSound.play(0, 1, 1);
      }
    } else {
      if (!BRUT_RESERVAPlaying) {
        BRUT_RESERVAPlaying = true;
        BRUT_RESERVASound.play(0, 1, 1);
      }
    }
  }
  classifyVideo();
}
