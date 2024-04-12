let img;

function preload() {
    img = loadImage('img/Home.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(220);

    let targetWidth = windowWidth * 0.75;
    let targetHeight = windowHeight * 0.75;

    let imgAspectRatio = img.width / img.height;

    let drawWidth, drawHeight;

    if (targetWidth / targetHeight > imgAspectRatio) {
        // 타겟 크기가 이미지보다 가로로 넓은 경우: 이미지의 높이를 타겟 높이에 맞추고, 가로 길이를 비율에 맞게 조정
        drawHeight = targetHeight;
        drawWidth = img.width * (targetHeight / img.height);
    } else {
        // 타겟 크기가 이미지보다 세로로 긴 경우: 이미지의 너비를 타겟 너비에 맞추고, 세로 길이를 비율에 맞게 조정
        drawWidth = targetWidth;
        drawHeight = img.height * (targetWidth / img.width);
    }

    let startX = (windowWidth - drawWidth) / 2;
    let startY = (windowHeight - drawHeight) / 2;

    image(img, startX, startY, drawWidth, drawHeight);

    mouseLocation();
}

function mouseLocation() {
    let normalizedX = mouseX / windowWidth;
    let normalizedY = mouseY / windowHeight;
    if (mouseIsPressed === true) {
        console.log(normalizedX, normalizedY);
    }
}