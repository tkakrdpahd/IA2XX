const socket = io();

let value = 0;
let shaken = false;
let count = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(155);
	socket.on("connections", (data)=>{
		// console.log(data);
		positions = {};
		shakes = {};
		for(let i = 0; i < data.length; i++){
			positions[data[i].id] = {x:0, y:0, ax: 0};
			shakes[data[i].id] = {shakeVal:0};
		}
		// console.log(connections);
	})
	socket.on("serverPos", receivedPosition);
	socket.on("serverShake", receivedShake)
	frameRate(20)
}

function draw(){
	background(155);
	textAlign(CENTER, CENTER);
	textSize(50);
	text("Move Your Phone!", width / 2, height / 2);	
	if(touches.length > 0){
		const data = {
			id: socket.id,
			x: float(touches[0].x) / width,
			y: float(touches[0].y) / height

		}
		socket.emit("clientPos", data);
	}

	const data = {
			id: socket.id,
			ax: float(accelerationX),
			ay: float(accelerationY),
			az: float(accelerationZ),
			rx: float(rotationX),
			ry: float(rotationY),
			rz: float(rotationZ)
	}
	socket.emit("clientMovement", data);	

	if(shaken){
		text("Shaken!", 200, 25);
		count++;
		if(count > 60){
			count = 0;
			shaken = false;
		}
	}
	else{
		text("Not Shaken!", 200, 25);
	}
}

function deviceShaken(){
  value = value + 5;
  if (value > 255) {
    value = 0;
  }
  const data = {
  	id: socket.id,
  	val: value
  }

  socket.emit("clientShake", data);
  shaken = true;
}

function receivedPosition(data){
	positions[data.id] = {
		x: data.x, 
		y: data.y,
		ax: data.ax
	};
	console.log(data.ax);
}

function receivedShake(data){
	shakes[data.id] = {
		shakeVal: data.value
	}
	shaken = true;
}

function touchStarted(){
	DeviceOrientationEvent.requestPermission();
	DeviceMotionEvent.requestPermission();
}



