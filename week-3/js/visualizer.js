// some processing-esque global niceties
var mouseX = 0, // cursor position on the context
		mouseY = 0,
		mouseDown = false, // whether mouse is pressed in context
		pmouseX = 0,
		pmouseY = 0;

function square(){
	var that = {},
			x = 0,
			y = 0,
			w = 10,
			h = 40;
	function draw(){
		
	}
	
	return that;
}

// makes a visualizer
var visualizer = function (){
	var that = {},
			context;
	
	function updateCursor(e){
		pmouseX = mouseX;
		pmouseY = mouseY;
		mouseX = e.pageX - $(canvas).offset().left;
		mouseY = e.pageY - $(canvas).offset().top;
	}
	that.run = function (){		
		var canvas = document.getElementById("canvas");
		canvas.width = 960;
		canvas.height = 540;
		context = canvas.getContext("2d");
		
		// get mouse events
		canvas.onmousemove = updateCursor;
		canvas.onmousedown = function (){ mouseDown=true; };
		canvas.onmouseup = canvas.onmouseout = function (){ mouseDown=false; };
		
		var sound = soundManager.createSound({
			id:'air',
			url:'media/air.mp3'
		});
		sound.play({from:4000, to:6500});
	}
	that.draw = function (){
		
	}
	function loop(){
		that.draw();
		requestAnimationFrame(loop);
	}
	
	return that;
}
var app = visualizer();
// This handles the boilerplate for our drawing context,
// basic mouse interaction, and animation loop

var startAudio = function(){	
	// gets the mouse coordinates
	// calls draw at ~60fps
	function loop(){
		draw();
		requestAnimationFrame( loop );
	}
	// start our animation
	requestAnimationFrame( loop );
}

soundManager.url = "js/";
soundManager.flashVersion = 9;
soundManager.useFlashBlock = false;
$(document).ready(function(){
	soundManager.onready(app.run);
})