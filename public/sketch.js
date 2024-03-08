let firstClickX, firstClickY; // 첫 클릭 위치를 저장할 변수
let currentAngle = 0; // 현재 회전 각도를 저장할 변수
let clicked = false; // 클릭 여부를 확인하는 플래그
let fadeOutDuration = 5000; // 사라지는 데 걸리는 시간 (5초)
let fading = false; // 사라지는 중인지를 나타내는 플래그
let alpha = 255; // 사각형의 투명도
let lastPressedTime = 0; // 마지막으로 클릭한 시간을 저장하는 변수

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  if (clicked) {
    // 마우스가 클릭되었으면 각도를 업데이트
    currentAngle = atan2(mouseY - firstClickY, mouseX - firstClickX);
    
    // 사라지는 애니메이션 처리
    if (fading) {
      let elapsedTime = millis() - lastPressedTime;
      alpha = map(elapsedTime, 0, fadeOutDuration, 255, 0);
      alpha = max(alpha, 0); // 투명도가 음수가 되지 않도록 함
    }
  }

  if (clicked || (fading && millis() - lastPressedTime <= fadeOutDuration)) {
    push(); // 새로운 드로잉 상태 시작
    translate(firstClickX, firstClickY); // 첫 클릭 위치로 이동
    rotate(currentAngle); // 현재 계산된 각도로 회전
    fill(255, alpha); // 사각형의 채우기 색상과 투명도 설정
    rect(-26, -26, 52, 52); // 사각형 그리기
    pop(); // 이전 드로잉 상태로 복귀
  }
}

function mousePressed() {
  // 첫 클릭 시에 위치 저장하고 클릭 플래그 설정
  if (!clicked) {
    firstClickX = mouseX;
    firstClickY = mouseY;
    clicked = true;
    fading = true;
    lastPressedTime = millis(); // 마지막 클릭 시간 업데이트
  }
}
