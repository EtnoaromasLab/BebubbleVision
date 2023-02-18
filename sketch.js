
import ml5
from ml5 import image_classifier
from ml5 import flip_image
from ml5 import get_audio_context

imageModelURL = 'https://teachablemachine.withgoogle.com/models/7zMLTbqSz/'
video = None
flippedVideo = None
label = ""
BRUTSound, BRUT_NATURESound, ROSESound, SEMI_SECSound, BRUT_RESERVASound = None, None, None, None, None
audioContext = None

# flags to prevent overlapping sounds
BRUTPlaying = False
BRUT_NATUREPlaying = False
ROSEPlaying = False
SEMI_SECPlaying = False
BRUT_RESERVAPlaying = False

def preload():
  global classifier, BRUTSound, BRUT_NATURESound, ROSESound, SEMI_SECSound, BRUT_RESERVASound

  classifier = image_classifier.load_model(imageModelURL + 'model.json')
  BRUTSound = ml5.load_sound('audios/gran_baron.ogg')
  BRUT_NATURESound = ml5.load_sound('audios/gran_baron1.ogg')
  ROSESound = ml5.load_sound('audios/gran_baron2.ogg')
  SEMI_SECSound = ml5.load_sound('audios/gran_baron3.ogg')
  BRUT_RESERVASound = ml5.load_sound('audios/gran_baron4.ogg')

def setup():
  global video, flippedVideo, audioContext

  size(windowWidth, windowHeight)
  video = ml5.create_video()
  video.size(width, height)
  video.hide()
  flippedVideo = flip_image(video)
  classify_video()
  audioContext = get_audio_context()

def draw():
  global label

  background(0)
  image(flippedVideo, 0, 0, width, height)
  fill(255)
  textSize(40)
  textAlign(CENTER)
  text(label, width / 2, height - 50)

def classify_video():
  global flippedVideo

  flippedVideo = flip_image(video)
  classifier.classify(flippedVideo, got_result)
  flippedVideo.remove()

def got_result(error, results):
  global label, BRUTPlaying, BRUT_NATUREPlaying, ROSEPlaying, SEMI_SECPlaying, BRUT_RESERVAPlaying

  if error:
    print(error)
    return
  
  if results[0]['confidence'] > 0.9:
    label = results[0]['label']
    # pause all sounds
    BRUTSound.pause()
    BRUT_NATURESound.pause()
    ROSESound.pause()
   
if results[0]['confidence'] > 0.9:
    label = results[0]['label']
    # pause all sounds
    BRUTSound.pause()
    BRUT_NATURESound.pause()
    ROSESound.pause()
    SEMI_SECSound.pause()
    BRUT_RESERVASound.pause()

    # check the label and play the corresponding sound
    if label == "BRUT":
      if not BRUTPlaying:
        BRUTSound.play()
        BRUTPlaying = True
    elif label == "BRUT_NATURE":
      if not BRUT_NATUREPlaying:
        BRUT_NATURESound.play()
        BRUT_NATUREPlaying = True
    elif label == "ROSÉ":
      if not ROSEPlaying:
        ROSESound.play()
        ROSEPlaying = True
    elif label == "SEMI-SEC":
      if not SEMI_SECPlaying:
        SEMI_SECSound.play()
        SEMI_SECPlaying = True
    elif label == "BRUT_RESERVA":
      if not BRUT_RESERVAPlaying:
        BRUT_RESERVASound.play()
        BRUT_RESERVAPlaying = True

  classify_video()

