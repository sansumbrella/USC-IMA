// some processing-esque global niceties
var context, // drawing context for hacking
		mouseX = 0, // cursor position on the context
		mouseY = 0,
		mouseDown = false, // whether mouse is pressed in context
		pmouseX = 0,
		pmouseY = 0;
// you can add your own variables here

function draw(){
	// your drawing/updating code goes in here
}

// This handles the boilerplate for our drawing context,
// basic mouse interaction, and animation loop
$(document).ready( function (){
	// set up our canvas and get mouse events
	var canvas = document.getElementById("canvas");
	canvas.width = 960;
	canvas.height = 540;
	context = canvas.getContext("2d");
	canvas.onmousemove = updateCursor;
	canvas.onmousedown = function (){ mouseDown=true; };
	canvas.onmouseup = canvas.onmouseout = function (){ mouseDown=false; };
	
	// gets the mouse coordinates
	function updateCursor(e){
		pmouseX = mouseX;
		pmouseY = mouseY;
		mouseX = e.pageX - $(canvas).offset().left;
		mouseY = e.pageY - $(canvas).offset().top;
	}
	// calls draw at ~60fps
	function loop(){
		draw();
		requestAnimationFrame( loop );
	}
	// start our animation
	requestAnimationFrame( loop );
});