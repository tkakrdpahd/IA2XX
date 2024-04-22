let img;
let json;
let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
let vwr, vhr;

async function preload() {
    img = loadImage('img/Home.png');

    // setWindowRatio
    if (windowWidth > windowHeight) {
        vwr = (4*windowHeight)/3;
        vhr = windowHeight;
    } else {
        vwr = windowWidth;
        vhr = (3*windowWidth)/4;
    }

    json = await getJson();
    console.log(json);
}

function setup() {
    createCanvas(vwr, vhr);
    // this is boundary
    walls.push(new Boundary(-1, -1, width, -1));
    walls.push(new Boundary(width, -1, width, height));
    walls.push(new Boundary(width, height, -1, height));
    walls.push(new Boundary(-1, height, -1, -1));

    for (let i = 0; i < json.length; i += 1) {
        walls.push(new Boundary(json[i][0]*vwr, json[i][1]*height, json[i][2]*vwr, json[i][3]*height));
        walls.push(new Boundary(json[i][2]*vwr, json[i][3]*height, json[i][4]*vwr, json[i][5]*height));
        walls.push(new Boundary(json[i][4]*vwr, json[i][5]*height, json[i][6]*vwr, json[i][7]*height));
        walls.push(new Boundary(json[i][6]*vwr, json[i][7]*height, json[i][0]*vwr, json[i][1]*height));
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

    console.log(mouseLocation());
}

function mouseLocation() {
    let normalizedX = mouseX / vwr;
    let normalizedY = mouseY / vhr;
    if (mouseIsPressed === true) {
        return [normalizedX, normalizedY];
    }
}

async function getJson() {
    const response = await fetch("walls.json");
    const data = await response.json();
    return data;
}