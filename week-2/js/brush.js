// some processing-esque global niceties
var mouseX = 0, // cursor position on the context
		mouseY = 0,
		mouseDown = false, // whether mouse is pressed in context
		pmouseX = 0,
		pmouseY = 0;

$(document).ready( function (){
	// set up the canvas
	var canvas = document.getElementById("canvas");
	canvas.width = 960;
	canvas.height = 540;
	canvas.onmousemove = updateCursor;
	canvas.onmousedown = function (){ mouseDown=true; };
	canvas.onmouseup = canvas.onmouseout = function (){ mouseDown=false; };
	context = canvas.getContext("2d");
	
	var brush = new PhotoBrush(context);
	
	// this gets the mouse coordinates
	function updateCursor(e){
		pmouseX = mouseX;
		pmouseY = mouseY;
		mouseX = e.pageX - $(canvas).offset().left;
		mouseY = e.pageY - $(canvas).offset().top;
	}
	// this makes us redraw every frame (allowing for animation/interaction)
	function loop(){
		brush.draw(); // draw with our brush
		requestAnimationFrame( loop );
	}
	
	requestAnimationFrame( loop );
});

function PhotoBrush(drawingContext){
	var context = drawingContext,
			brush = document.createElement("canvas"),
			img = new Image(),
			w = 96,
			h = 96,
			r = 0,
			dr = 0.02;

	img.onload = function(){
		brush.width = img.width;
		brush.height = img.height;
		var ctx = brush.getContext("2d");
		pattern = ctx.createPattern(img, 'no-repeat');
		
		ctx.beginPath();
		ctx.arc( img.width/2, img.height/2, img.width/2, 0, Math.PI*2 );
		ctx.fillStyle = pattern;
		ctx.fill();
	}
	img.src = "img/solarized-trees.jpg";
	
	this.draw = function (){
		context.save();
		context.translate( mouseX, mouseY);
		context.rotate(r);
		context.drawImage(brush, -w/2, -h/2, w, h);
		context.restore();
		r = r + dr; // rotate further
	}
}