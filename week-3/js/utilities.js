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
	var id = spec.id || "canvas",
			fullscreen = spec.fullscreen || false,
			callback = spec.onResize || function (){},
			width = spec.width || 960,
			height = spec.height || 540;
	canvas = document.getElementById(id);
	canvas.width = width;
	canvas.height = height;
	context = canvas.getContext("2d");
	// get cursor coordinates
	canvas.onmousedown = function (){ mouseDown=true; };
	canvas.onmouseup   = canvas.onmouseout = function (){ mouseDown=false; };
	canvas.onmousemove = function(e){
		pmouseX           = mouseX;
		pmouseY           = mouseY;
		mouseX            = e.pageX - $(canvas).offset().left;
		mouseY            = e.pageY - $(canvas).offset().top;
	}
	// handle window resizing
	if(fullscreen){
		$(canvas).addClass("fullscreen");
		function adjustSize(e){
			canvas.width = $(document).width();
			canvas.height = $(document).height();
			callback();
		};
		$(window).resize( adjustSize );
		adjustSize();
	}
}
