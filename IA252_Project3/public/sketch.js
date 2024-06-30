let img;
let json;
let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
let vwr, vhr;

async function preload() {
    img = loadImage('./img/Home.png');

    // setWindowRatio
    if (windowWidth > windowHeight) {
        vwr = (4*windowHeight)/3;
        vhr = windowHeight;
    } else {
        vwr = windowWidth;
        vhr = (3*windowWidth)/4;
    }

    json = await getJson();
}

function setup() {
    createCanvas(vwr, vhr);
    // this is boundary
    walls.push(new Boundary(-1, -1, width, -1));
    walls.push(new Boundary(width, -1, width, height));
    walls.push(new Boundary(width, height, -1, height));
    walls.push(new Boundary(-1, height, -1, -1));

    for (let i = 0; i < json.length; i += 1) {
        let type = json[i][0]; // 'c' 또는 'o'
        let points = json[i].slice(1); // 첫 번째 요소를 제외한 나머지는 점들의 좌표
    
        for (let j = 0; j < points.length - 2; j += 2) {
            walls.push(new Boundary(
                points[j] * vwr, points[j + 1] * vhr,  // 현재 점
                points[j + 2] * vwr, points[j + 3] * vhr // 다음 점
            ));
        }
    
        if (type === 'c' && points.length >= 4) {
            // 폐쇄형이면 마지막 점과 처음 점을 연결
            walls.push(new Boundary(
                points[points.length - 2] * vwr, points[points.length - 1] * vhr, // 마지막 점
                points[0] * vwr, points[1] * vhr // 처음 점
            ));
        }
    }    

    particle = new Particle(); // make particleN
}

function draw() {
    background(0);
    for (let wall of walls) {
    wall.show();
    }
    particle.update(mouseX, mouseY);
    particle.show();
    particle.look(walls);

    xoff += 0.01;
    yoff += 0.01;

    // This is call png
    image(img, 0, 0, vwr, vhr);

    mouseLocation();
}

function mouseLocation() {
    let normalizedX = mouseX / vwr;
    let normalizedY = mouseY / vhr;
    if (mouseIsPressed === true) {
        console.log(normalizedX, normalizedY);
    }
}

async function getJson() {
    const response = await fetch("walls.json");
    const data = await response.json();
    return data;
}