class Data {
    constructor(resolution) {
      if (resolution <= 0) {
        throw new Error("Resolution must be greater than zero.");
      }
  
      this.height = resolution * 2;
      this.width = resolution;
      this.longestLine = Math.max(windowWidth, windowHeight);
      this.widthOfOutline = this.longestLine / 2;
      this.heightOfOutline = this.longestLine;
      this.gridSize = this.widthOfOutline * 0.09;
      this.startX = this.widthOfOutline * 0.1;
      this.startY = this.heightOfOutline * 0.05;
      this._gridQueue = Array.from({ length: this.height }, () => 
        Array.from({ length: this.width }, () => null));
    }
  
    enqueue(element) {
      if (this._isFull()) {
        this._gridQueue.shift();
      }
      if (!Array.isArray(element) || element.length !== this.width) {
        throw new Error(`Element must be an array of length ${this.width}.`);
      }
      this._gridQueue.push(element);
    }
  
    dequeue() {
      if (this._isEmpty()) {
        throw new Error("Queue is empty.");
      }
      return this._gridQueue.shift();
    }
  
    _isFull() {
      return this._gridQueue.length >= this.height;
    }
  
    _isEmpty() {
      return this._gridQueue.length === 0;
    }
    // Removes a specific line from the grid
    dequeueLine(lineIndex) {
      this.gridQueue.splice(lineIndex, 1); // Remove the specified line
      this.gridQueue.unshift(Array.from({ length: this.width }, () => [0,0,0])); // Add an empty line at the top with coordinate data
    }
    // Adds an empty row to the end of the grid
    enqueueEmpty() {
      if (!this.isFull()) {
        this.gridQueue.push(Array.from({ length: this.width }, () => [0,0,0]));
      }
    }
    
    tracking(currentXLocation, currentYLocation) {
      // Implement tracking logic here
      this._gridQueue[currentYLocation][currentXLocation][0] = 1;
    }
  
    gridQueueData() {
        for (let j = 0; j < this.height; j++) {
          let temp = [];
          for (let i = 0; i < this.width; i++) {
            let x = this.startX + this.gridSize * i;
            let y = this.startY + this.gridSize * j;
            temp.push([0, x, y]);
        }
          //console.log(temp);
          if (this._isFull()) {
            this.dequeue();
          }
          this.enqueue(temp);
      }
    }
  
    getDataSheet() {
      return {
        properties: {
          height: this.height,
          width: this.width,
          longestLine: this.longestLine,
          widthOfOutline: this.widthOfOutline,
          heightOfOutline: this.heightOfOutline,
          gridSize: this.gridSize,
          startX: this.startX,
          startY: this.startY
        },
        gridQueue: this._gridQueue
      };
    }
  }
  