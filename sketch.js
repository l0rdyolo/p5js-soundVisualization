 
 let sound, visualizer;
 
 function preload() {
     sound = loadSound('pain.mp3');
 }
 
 function setup() {
     createCanvas(800, 400);
     visualizer = new SoundVisualizer(3);
     visualizer.loadSound(sound);
     sound.play();
 }
 
 function draw() {
     background(0);
     visualizer.visualize();
 
     let smoothSpeed = visualizer.getSmoothSpeed();
 
     fill(255);
     textSize(20);
     text(`Speed: ${nf(smoothSpeed, 1, 0)} units`, 10, 30);
 }
 