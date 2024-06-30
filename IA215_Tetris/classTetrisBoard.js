class TetrisBoard {
    constructor(dataSheet) {
      this.dataSheet = dataSheet;
      
      //assign the data
      this.height = dataSheet.properties.height;
      this.width = dataSheet.properties.width;
      this.longestLine = dataSheet.properties.longestLine;
      this.widthOfOutline = dataSheet.properties.widthOfOutline;
      this.heightOfOutline = dataSheet.properties.heightOfOutline;
      this.gridSize = dataSheet.properties.gridSize;
      this.startX = dataSheet.properties.startX;
      this.startY = dataSheet.properties.startY;
    }
  
    createOutline() {
      noFill();
      quad(
        int(this.startX), int(this.startY),
        this.widthOfOutline, int(this.startY),
        this.widthOfOutline, int(this.heightOfOutline * 0.95),
        int(this.startX), int(this.heightOfOutline * 0.95)
      );
    }
  
    show() {
      let gridQueue = this.dataSheet.gridQueue;
      stroke(color(140));
      
      for (let j = 0; j < this.height; j++) {
        for (let i = 0; i < this.width; i ++) {
            let x = gridQueue[j][i][1]; //row number j, box number i, x
            let y = gridQueue[j][i][2]; //row number j, box number i, y
            if (gridQueue[j][i][0] == 1) {
          fill(255); // White for filled cells
          } else {
            fill(0); // Black for empty cells
            }
          square(x, y, this.gridSize);
        }
      }
    }
  }
  