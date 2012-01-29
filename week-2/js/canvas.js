// some processing-esque global niceties
var context, // drawing context for hacking
		mouseX = 0, // cursor position on the context
		mouseY = 0,
		mouseDown = false, // whether mouse is pressed in context
		pmouseX = 0,
		pmouseY = 0;

$(document).ready( function (){
	// create any of your own variables here
	// make our canvas available
	var canvas = document.getElementById("canvas");
	var cv = $(canvas);
	canvas.onmousemove = updateCursor;
	canvas.onmousedown = function (){ mouseDown=true; };
	canvas.onmouseup = canvas.onmouseout = function (){ mouseDown=false; };
	context = canvas.getContext("2d");
	
	// this gets the mouse coordinates
	function updateCursor(e){
		pmouseX = mouseX;
		pmouseY = mouseY;
		mouseX = e.pageX - cv.offset().left;
		mouseY = e.pageY - cv.offset().top;
	}
	// this makes us redraw every frame (allowing for animation/interaction)
	function loop(){
		draw();
		requestAnimationFrame( loop );
	}

	// your drawing/updating code goes in draw()
	function draw(){
		drawMethod();	// allows us to use preset drawing methods
	}
	
	requestAnimationFrame( loop );
});

// some default drawing functions
function drawMethod(){}	// does nothing

// fun drawing style
function billow(){
	var speed = Math.sqrt((mouseX-pmouseX)*(mouseX-pmouseX) + (mouseY-pmouseY)*(mouseY-pmouseY));
	speed = clamp( speed, 0, 45 );
	var color = lerp(speed,0,45,0,255);
	color = Math.floor(color); // make it an integer
	color = color.toString(16); // make hexadecimal
	context.fillStyle = color + color + color;
	context.strokeStyle = "#999";

	context.beginPath();
	context.arc( mouseX, mouseY, 24, 0, Math.PI*2 );
	context.fill();
	context.stroke();
}

// using an image
var picturePen = function (){
	var brush = document.createElement("canvas"),
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
	
	function draw(){
		context.save();
		context.translate( mouseX, mouseY);
		context.rotate(r);
		context.drawImage(brush, -w/2, -h/2, w, h);
		context.restore();
		r = r + dr; // rotate further
	}
	return draw;
}();

// (interactive) bouncy ball
var bounce = function (){
	var x = 0;
	var y = 0;
	var px = -5;
	var py = 0;
	var radius = 48;
	var friction = 0.725;
	var gravity = 0.65;
	var groundLevel = 400;
	var grabbed = false;
	
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
	
	function draw(){
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

			if(y > groundLevel - radius){
				y = groundLevel - radius;
				dy *= -friction; // reverse energy
				dx *= friction; // reduce energy
			}
			if( x > 640 - radius ){
				x = 640 - radius;
				dx *= -1; // reverse energy
			} else if( x < -radius ){
				x = -radius;
				dx *= -1;
			}
			// store previous positions
			py = y - dy;
			px = x - dx;
		}
		
		context.clearRect(0,0,640,480);
		
		context.strokeStyle = "rgb(0,0,0)";
		context.beginPath();
		context.moveTo(0, groundLevel);
		context.lineTo(640, groundLevel);
		context.stroke();
		
		context.fillStyle = "rgb(0,180,180)";
		context.beginPath();
		context.arc(x, y, radius, 0, Math.PI*2);
		context.fill();
	}
	
	return draw;
}();
