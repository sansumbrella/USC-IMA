// some processing-esque global niceties
var mouseX = 0, // cursor position on the context
		mouseY = 0,
		mouseDown = false, // whether mouse is pressed in context
		pmouseX = 0,
		pmouseY = 0;

$(document).ready( function (){
	// create any of your own variables here
	// make our canvas available
	var canvas = document.getElementById("canvas");
	canvas.width = 960;
	canvas.height = 540;
	var context = canvas.getContext("2d");
	canvas.onmousemove = updateCursor;
	canvas.onmousedown = function (){ mouseDown=true; };
	canvas.onmouseup = canvas.onmouseout = function (){ mouseDown=false; };
	
	var sim = new BouncyBall(context);
	
	// this gets the mouse coordinates
	function updateCursor(e){
		pmouseX = mouseX;
		pmouseY = mouseY;
		mouseX = e.pageX - $(canvas).offset().left;
		mouseY = e.pageY - $(canvas).offset().top;
	}
	// runs our simulation
	function loop(){
		sim.draw();
		requestAnimationFrame( loop );
	}
	// start animating
	requestAnimationFrame( loop );
});

function BouncyBall(drawingContext){
	// public properties
	this.context = drawingContext;
	this.groundLevel = this.context.canvas.height - 80;
	this.rightEdge = this.context.canvas.width;
	// private variables
	var x = 0,
		  y = 0,
		  px = -12,
		  py = 0,
		  radius = 48,
		  friction = 0.725,
		  gravity = 0.65,
		  grabbed = false;
	
	// check if the mouse should hold the ball
	// once grabbed, will hold on until mouse is released
	function checkGrabbing(){
		if( mouseDown ){
			if(((mouseX-x)*(mouseX-x) + (mouseY-y)*(mouseY-y)) < (radius * radius)){
				grabbed = true;
			}
		} else {
			grabbed = false;
		}
		return grabbed;
	}
	
	// public method
	this.draw = function (){
		checkGrabbing();
		if( grabbed ){
			// user controlled
			px = pmouseX;
			py = pmouseY;
			x = mouseX;
			y = mouseY;
		} else {
			// do physics
			var dx = x - px;
			var dy = (y + gravity) - py;
			x = x + dx * friction;
			y = y + dy * friction;
			// bounce off the ground
			if(y > this.groundLevel - radius){
				y = this.groundLevel - radius;
				dy *= -friction; // reverse energy
				dx *= friction; // reduce energy
			}
			// bounce off left/right walls
			if( x > this.rightEdge - radius ){
				x = this.rightEdge - radius;
				dx *= -1; // reverse energy
			} else if( x < -radius ){
				x = -radius;
				dx *= -1;
			}
			// store previous positions
			py = y - dy;
			px = x - dx;
		}
		var w = this.context.canvas.width;
		var h = this.context.canvas.height;
		// clear the background
		this.context.clearRect(0,0,w,h);
		// draw the ground plane
		this.context.strokeStyle = "rgb(0,0,0)";
		this.context.beginPath();
		this.context.moveTo(0, this.groundLevel);
		this.context.lineTo(w, this.groundLevel);
		this.context.stroke();
		// draw the ball
		this.context.fillStyle = "rgb(0,180,180)";
		this.context.beginPath();
		this.context.arc(x, y, radius, 0, Math.PI*2);
		this.context.fill();
	}
}
