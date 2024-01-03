let resolution = 10; //default resolution
let tetrisBoard;
let block;
let data;
let dataSheet;

function keyPressed() {
  if (key === 'f' || key === 'F') {
    fullscreen(!fullscreen());
  } else if (keyCode === LEFT_ARROW) {
    block.moveLeft();
  } else if (keyCode === RIGHT_ARROW) {
    block.moveRight();
  } else if (keyCode === UP_ARROW) {
    block.rotateR();
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  
  //call classData
  data = new Data(resolution);
  data.gridQueueData();
  //create dataSheet
  dataSheet = data.getDataSheet();
  
  //call classTetrisBoard
  tetrisBoard = new TetrisBoard(dataSheet);
  
  tetrisBoard.createOutline();
  
  //call classBlock
  block = new Block(dataSheet);
}

function draw() {
  frameRate(1);
  tetrisBoard.show();
  block.gravity(dataSheet.gridQueue);
  block.show(dataSheet.gridQueue);
  data.getDataSheet();
}