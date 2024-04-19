let img;
let walls = [];
let ray, particle;
let xoff = 0;
let yoff = 10000;

function preload() {
    img = loadImage('img/Home.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // this is raytracing setting
    for (let i = 0; i < 5; i++) {
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }
    particle = new Particle();
}

function draw() {
    background(0);
    for (let wall of walls) {
        wall.show();
    }
    particle.update(noise(xoff) * width, noise(yoff) * height);
    particle.show();
    particle.look(walls);

    xoff += 0.01;
    yoff += 0.01;

    // ray.show();
    // ray.lookAt(mouseX, mouseY);

    // let pt = ray.cast(wall);
    // console.log(pt);
    // if (pt) {
    //      fill(255);
    //      ellipse(pt.x, pt.y, 8, 8);
    // }

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

function mouseLocation() {
    let normalizedX = mouseX / windowWidth;
    let normalizedY = mouseY / windowHeight;
    if (mouseIsPressed === true) {
        console.log(normalizedX, normalizedY);
    }
}