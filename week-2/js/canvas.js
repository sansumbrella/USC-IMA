var context, // a globally-available drawing context for hacking
		mouseX = 0,
		mouseY = 0,
		pmouseX = 0,
		pmouseY = 0;

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

function parseHex(str, radix){
	var parts = str.split(".");
	if( parts.length > 1 ){
		return parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix,parts[1].length);
	}
	return parseInt(parts[0], radix);
};

$(document).ready( function (){
	// make our canvas available
	var canvas = document.getElementById("canvas");
	var cv = $(canvas);
	canvas.onmousemove = updateCursor;
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
		// context.clearRect( 0, 0, 640, 480 );
		var speed = Math.sqrt((mouseX-pmouseX)*(mouseX-pmouseX) + (mouseY-pmouseY)*(mouseY-pmouseY));
		var color = speed * 0.6;
		if( color > 255 ){
			color = 255;
		}
		color = Math.floor(color); // make it an integer
		color = color.toString(16); // make hexadecimal
		context.fillStyle = color + color + color;
		context.fillRect( mouseX - 12, mouseY - 12, 24, 24 );
	}
	
	requestAnimationFrame( loop );
});