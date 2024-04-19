let img;
let wall, ray;

function preload() {
    img = loadImage('img/Home.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // this is raytracing setting
    wall = new Boundary(300, 100, 300, 300);
    ray = new Ray(100, 200);
}

function draw() {
    background(0);

    wall.show();
    ray.show();
    ray.lookAt(mouseX, mouseY);

    let pt = ray.cast(wall);
    console.log(pt);
    if (pt) {
         fill(255);
         ellipse(pt.x, pt.y, 8, 8);
    }

    /*
    // This is call png

    let targetWidth = windowWidth * 0.75;
    let targetHeight = windowHeight * 0.75;
    let imgAspectRatio = img.width / img.height;
    let drawWidth, drawHeight;

    if (targetWidth / targetHeight > imgAspectRatio) {
        drawHeight = targetHeight;
        drawWidth = img.width * (targetHeight / img.height);
    } else {
        drawWidth = targetWidth;
        drawHeight = img.height * (targetWidth / img.width);
    }

    let startX = (windowWidth - drawWidth) / 2;
    let startY = (windowHeight - drawHeight) / 2;

    image(img, startX, startY, drawWidth, drawHeight);

    mouseLocation();
    */
}

// function mouseLocation() {
//     let normalizedX = mouseX / windowWidth;
//     let normalizedY = mouseY / windowHeight;
//     if (mouseIsPressed === true) {
//         console.log(normalizedX, normalizedY);
//     }
// }