let sound, visualizer;
let playButton;
let smoothingSlider;

function preload() {
  sound = loadSound('pain.mp3');
}

function setup() {
  createCanvas(window.innerWidth, 400);
  
  visualizer = new SoundVisualizer(3); 
  visualizer.loadSound(sound);
  
  playButton = createButton('Play');
  playButton.position(10, height + 10);
  playButton.mousePressed(togglePlay);

  smoothingSlider = createSlider(1, 10, 3);
  smoothingSlider.position(100, height + 10);
  smoothingSlider.style('width', '200px');
}

function draw() {
  background(0);
  
  let smoothingWindow = smoothingSlider.value();
  visualizer.setSmoothingWindow(smoothingWindow); 
  visualizer.visualize(); 

  let smoothSpeed = visualizer.getSmoothSpeed();
  fill(255);
  textSize(20);
  text(`Speed: ${nf(smoothSpeed, 1, 0)}`, 10, 30);

  fill(255);
  textSize(10);
  text(`Smoothing Window: ${smoothingWindow}`, 10, 50 ,120,120);
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
    playButton.html('Play');
  } else {
    sound.play();
    playButton.html('Pause');
  }
}