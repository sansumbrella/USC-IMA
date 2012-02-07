window.requestAnimationFrame = (function(){
	return	window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					function( callback ){
						window.setTimeout( callback, 1000 / 60 );
					};
})();

function clamp(value, low, high){
	return Math.max(Math.min(value,high),low);
}
function lerp(value, begin, end, newBegin, newEnd){
	return value/(end-begin) * (newEnd-newBegin);
}
function colorString(r,g,b){
	return "rgb(" + r + "," + g + "," + b + ")";
}

// global drawing niceness
var mouseX = 0, // cursor position on the context
		mouseY = 0,
		mouseDown = false, // whether mouse is pressed in context
		pmouseX = 0,
		pmouseY = 0,
		canvas,
		context;

function createCanvas(spec){
	var fullscreen = spec.fullscreen || false,
			width = spec.width || 960,
			height = spec.height || 540;
	canvas = document.getElementById("canvas");
	canvas.width = width;
	canvas.height = height;
	context = canvas.getContext("2d")
	
	canvas.onmousedown = function (){ mouseDown=true; };
	canvas.onmouseup   = canvas.onmouseout = function (){ mouseDown=false; };
	canvas.onmousemove = function(e){
		pmouseX           = mouseX;
		pmouseY           = mouseY;
		mouseX            = e.pageX - $(canvas).offset().left;
		mouseY            = e.pageY - $(canvas).offset().top;
	}
	if(fullscreen){
		$(canvas).appendClass("fullscreen");
		canvas.width = document.width;
		canvas.height = document.height;
		$(window).resize( function(e){
			canvas.width = document.width;
			canvas.height = document.height;
		})
	}
}
