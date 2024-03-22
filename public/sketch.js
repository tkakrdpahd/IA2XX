const socket = io();

let spinner;
let positions = {}; // 전역 변수로 선언

function setup() {
  createCanvas(windowWidth, windowHeight);
  spinner = new FidgetSpinner();

  socket.on("connections", (data) => {
    positions = {};
    for (let i = 0; i < data.length; i++) {
      positions[data[i].id] = { x: 0, y: 0, ax: 0 };
    }
  });

  socket.on("serverPos", (receivedPosition) => {
    console.log(receivedPosition);
    // 서버에서 받은 위치 정보로 그리기
    //background(220);
    spinner.draw(receivedPosition.x * windowWidth, receivedPosition.y * windowHeight, receivedPosition.r, true);
  });
}

function draw() {
  //background(220);
  spinner.condition();
}

class FidgetSpinner {
  constructor() {
    this.firstClickX = 0; // 초기화
    this.firstClickY = 0; // 초기화
    this.currentAngle = 0;
    this.firstClickDetected = false;
    this.fadeOutDuration = 5000;
    this.alpha = 255;
    this.lastUpdateTime = 0;
    this.fading = false;
  }

  condition() {
    if (mouseIsPressed && !this.firstClickDetected) {
      this.firstClickX = mouseX;
      this.firstClickY = mouseY;
      this.firstClickDetected = true;
      this.fading = true;
      this.lastUpdateTime = millis();
    }

    if (this.firstClickDetected) {
      let dx = mouseX - this.firstClickX;
      let dy = mouseY - this.firstClickY;
      this.currentAngle = atan2(dy, dx);

      if (this.fading) {
        let elapsedTime = millis() - this.lastUpdateTime;
        this.alpha = map(elapsedTime, 0, this.fadeOutDuration, 255, 0);
        this.alpha = max(this.alpha, 0);

        if (this.alpha === 0) {
          this.reset();
        }
      }

      const data = {
        id: socket.id,
        x: this.firstClickX / windowWidth,
        y: this.firstClickY / windowHeight,
        r: this.currentAngle
      };

      socket.emit("clientPos", data);
      // 사용자의 클릭 위치로 그리기
      this.draw(this.firstClickX, this.firstClickY, this.currentAngle, false);
    }
  }

  draw(x, y, r, fromServer) {
    push();
    
    translate(x, y);
    rotate(r);
    fill(255, this.alpha);
    rect(-26, -26, 52, 52);
    pop();
  }

  reset() {
    this.fading = false;
    this.firstClickDetected = false;
    this.alpha = 255;
  }
}
