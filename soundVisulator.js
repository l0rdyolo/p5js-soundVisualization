class SoundVisualizer {
     constructor(smoothingWindow = 5) {
         this.peaks = [];
         this.smoothedPeaks = [];
         this.smoothingWindow = smoothingWindow;
         this.speed = 1;
     }
 
     loadSound(sound) {
         this.sound = sound;
         this.sound.amp(0.5);
         this.peaks = this.sound.getPeaks(width * 2);
         this.smoothedPeaks = this.smoothPeaks(this.peaks);
     }
 
     smoothPeaks(peaks) {
         let smoothed = [];
         for (let i = 0; i < peaks.length; i++) {
             let windowStart = max(0, i - this.smoothingWindow);
             let windowEnd = min(peaks.length - 1, i + this.smoothingWindow);
             let sum = 0;
             for (let j = windowStart; j <= windowEnd; j++) {
                 sum += peaks[j];
             }
             smoothed.push(sum / (windowEnd - windowStart + 1));
         }
         return smoothed;
     }
 
     visualize() {
         let currentTime = this.sound.currentTime();
         let duration = this.sound.duration();
         let progress = currentTime / duration;
 
         noFill();
         stroke(255);
 
         beginShape();
         for (let i = 0; i < this.peaks.length; i++) {
             let x = map(i, 0, this.peaks.length, 0, width);
             let y = map(this.peaks[i], -1, 1, height, 0);
             stroke(255, 0, 0);
             vertex(x, y);
         }
         endShape();
 
         beginShape();
         for (let i = 0; i < this.smoothedPeaks.length; i++) {
             let x = map(i, 0, this.smoothedPeaks.length, 0, width);
             let y = map(this.smoothedPeaks[i], -1, 1, height, 0);
             stroke(0, 255, 0);
             vertex(x, y);
         }
         endShape();
 
         stroke(255);
         let progressX = map(progress, 0, 1, 0, width);
         line(progressX, 0, progressX, height);
     }
 
     getCurrentSpeed() {
         let currentTime = this.sound.currentTime();
         let progress = currentTime / this.sound.duration();
         let index = floor(progress * this.smoothedPeaks.length);
         return map(this.smoothedPeaks[index], -1, 1, 1, 20);
     }
 
     getSmoothSpeed() {
         let currentTime = this.sound.currentTime();
         let progress = currentTime / this.sound.duration();
         let index = floor(progress * this.smoothedPeaks.length);
         let targetSpeed = map(this.smoothedPeaks[index], -1, 1, 1, 20);
         this.speed = lerp(this.speed, targetSpeed, 0.1);
         return this.speed;
     }
 
     getSensitiveSpeed() {
         let currentTime = this.sound.currentTime();
         let progress = currentTime / this.sound.duration();
         let index = floor(progress * this.smoothedPeaks.length);
         return map(this.smoothedPeaks[index], -0.5, 0.5, 1, 20);
     }
 }
