const socket = io();

let spinner;

function setup() {
  // this is socket.io setting
  socket.on("connections", (data)=>{
  //this data is id
  console.log(data);

  positions = {};
	shakes = {};
	for(let i = 0; i < data.length; i++){
		positions[data[i].id] = {x:0, y:0, ax: 0};
		shakes[data[i].id] = {shakeVal:0};
	}
	});
  // This is P5.JS class setting
  createCanvas(windowWidth, windowHeight);
  spinner = new FidgetSpinner();

}

function draw() {
  background(220);
  spinner.condition();
}

class FidgetSpinner {
  constructor() {
    this.firstClickX;
    this.firstClickY;
    this.currentAngle = 0;
    this.firstClickDetected = false;
    this.fadeOutDuration = 5000; // 사라지는 데 걸리는 시간 (5초)
    this.alpha = 255; // 사각형의 투명도
    this.lastUpdateTime = 0; // 마지막으로 갱신된 시간
    this.fading = false; // 사라지는 중인지 확인하는 플래그
  }

  condition() {
    if (mouseIsPressed && !this.firstClickDetected) {
      this.firstClickX = mouseX / windowWidth;
      this.firstClickY = mouseY / windowHeight;
      this.firstClickDetected = true;
      this.fading = true;
      this.lastUpdateTime = millis(); // 마지막 업데이트 시간을 현재로 설정
    }
  
    if (this.firstClickDetected) {
      this.currentAngle = atan2(mouseY - this.firstClickY * windowHeight, mouseX - this.firstClickX * windowWidth);
  
      // This is fading setting
      if (this.fading) {
        let elapsedTime = millis() - this.lastUpdateTime;
        this.alpha = map(elapsedTime, 0, this.fadeOutDuration, 255, 0);
        this.alpha = max(this.alpha, 0);
  
        if (this.alpha === 0) {
          this.fading = false;
          this.firstClickDetected = false;
        }
      }
      this.draw();
    }
  }

  draw() {
    push();
    translate(this.firstClickX * windowWidth, this.firstClickY * windowHeight);
    rotate(this.currentAngle);
    fill(255, this.alpha);
    rect(-26, -26, 52, 52);
    pop();
  }
}

class clientData {
  constructor(data) {
  }
}