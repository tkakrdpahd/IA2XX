class Block {
    constructor(dataSheet) {
      this.dataSheet = dataSheet;
      
      this.longestLine = dataSheet.properties.longestLine;
      this.widthOfOutline = dataSheet.properties.widthOfOutline;
      this.heightOfOutline = dataSheet.properties.heightOfOutline;
      this.gridSize = dataSheet.properties.gridSize;
      this.startX = dataSheet.properties.startX;
      this.startY = dataSheet.properties.startY;
      
      this.blockType = [];
      this.blockLocation = [0, 0]; // [x, y]
      this.t = 0; // Horizontal position tracker
      this.limit = 6;
      this.r = false;
    }
    pooling() {
      // pool for block type
      /*    
      switch(this.blockTypeIndicator) {
        default:
          // Type I
          this.blockType = [[0, 0, 0, 0], [1, 1, 1, 1]];
          this.limit = 6;
          break;
        case '2':
          // Type O
          this.blockType = [[1, 1, 0, 0], [1, 1, 0, 0]];
          this.limit = 8;
          break;
        case '3':
          // Type Z
          this.blockType = [[1, 1, 0, 0], [0, 1, 1, 0]];
          this.limit = 7;
          break;
        case '4':
          // Type S
          this.blockType = [[0, 1, 1, 0], [1, 1, 0, 0]];
          this.limit = 7;
          break;
        case '5':
          // Type L
          this.blockType = [[0, 0, 1, 0], [1, 1, 1, 0]];
          this.limit = 7;
          break;
          */
    }
    
    // Move block left
    moveLeft() {
      if (this.t < 9) {
        this.blockLocation[0] --;
        this.show();
        this.t --;
      }
    }
  
    // Move block right
    moveRight() {
      if (this.t < 9) {
        this.blockLocation[0] ++;
        this.show();
        this.t ++;
      }
    }
    
    rotateR() {
      this.isRotated = !this.isRotated;
    }
  
    gravity() { //move to classData
      let gridQueue = this.dataSheet.gridQueue;
      
      this.x = gridQueue[0][this.blockLocation[0]][1];
      
      if (this.blockLocation[1] < 19) {
        if (gridQueue[this.blockLocation[1]++],[0],[0] == 0) { //check under location value
  
          this.y = gridQueue[this.blockLocation[1]][0][2];
          
          let tempBlockLocation = this.blockLocation[1];
          
          this.blockLocation[1] == tempBlockLocation + 1; // y location update to next
        } else {
          //update grid queue value
          console.log("called");
          this.collision();
        }
      }
    }
    
    // Render block
    show() {
      //call classData data.gravity();
      
      let gridQueue = this.dataSheet.gridQueue;
      let maxPoint = gridQueue[19][9][2];
  
      if (this.y < maxPoint) { //Horizontal line check
        stroke(color(140));
        fill(color(255));
        square(this.x, this.y, this.gridSize, 5);
      } else if(this.y == maxPoint) {
          stroke(color(140));
          fill(color(255));
          square(this.x, this.y, this.gridSize, 5);
        
          this.collision();
        
      }
    }
  
    // Check for collision
    collision() {
      data.tracking(this.blockLocation[0], this.blockLocation[1]);
      this.blockLocation = [0, 0];
    }
  }
  