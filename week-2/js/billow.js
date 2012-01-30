// some processing-esque global niceties
var context, // drawing context
		mouseX = 0, // cursor position on the context
		mouseY = 0,
		mouseDown = false, // whether mouse is pressed in context
		pmouseX = 0,
		pmouseY = 0;

function draw(){
	// get the distance we moved since last frame
	var speed = Math.sqrt((mouseX-pmouseX)*(mouseX-pmouseX) + (mouseY-pmouseY)*(mouseY-pmouseY));
	var maxSpeed = 64;
	// limit speed to something that feels good
	speed = clamp( speed, 0, maxSpeed );
	// remap speed to color value
	var color = Math.round(lerp(speed,0,maxSpeed,0,255));
	// make color something the context can understand
	context.fillStyle = colorString(color, color, color);
	context.strokeStyle = "#999";

	context.beginPath();
	context.arc( mouseX, mouseY, 24, 0, Math.PI*2 );
	context.fill();
	context.stroke();
}

$(document).ready( function (){
	// create any of your own variables here
	// make our canvas available
	var canvas = document.getElementById("canvas");
	canvas.width = 960;
	canvas.height = 540
	canvas.onmousemove = updateCursor;
	canvas.onmousedown = function (){ mouseDown=true; };
	canvas.onmouseup = canvas.onmouseout = function (){ mouseDown=false; };
	context = canvas.getContext("2d");
	
	// this gets the mouse coordinates
	function updateCursor(e){
		pmouseX = mouseX;
		pmouseY = mouseY;
		mouseX = e.pageX - $(canvas).offset().left;
		mouseY = e.pageY - $(canvas).offset().top;
	}
	// this makes us redraw every frame (allowing for animation/interaction)
	function loop(){
		draw();
		requestAnimationFrame( loop );
	}
	
	requestAnimationFrame( loop );
});