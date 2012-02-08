
function createRectangle(spec){
	var that = {},
			x = spec.x || 0,
			y = spec.y || 0,
			w = spec.w || 480,
			h = spec.h || 200,
			th = spec.th || 100;

	function draw(){
		th = mouseY;
		h += (th - h) * 0.1;
		context.fillStyle = "rgb(255,0,255)";
		context.fillRect(x, y, w, h);
	}
	that.draw = draw;
	return that;
}

// set up sound manager
soundManager.url = "js/";
soundManager.flashVersion = 9;
// soundManager.flash9Options.useWaveformData = true;
// soundManager.flash9Options.useEQData = true;

// our application
function createApplication(){
	var that = {};
	var rectangles = [];
	
	that.run = function (){
		// setup stuff		
		for( var i = 0; i < 20; ++i ){
			var spec = {};
			spec.x = i * 20;
			spec.w = 20;
			spec.y = Math.random() * canvas.height;
			var rect = createRectangle(spec);
			rectangles.push( rect );
		}
		// start looping
		loop();
	}
	function loop(){
		context.clearRect( 0, 0, canvas.width, canvas.height );
		
		for( var i = 0; i < rectangles.length; ++i ){
			rectangles[i].draw();
		}
		requestAnimationFrame( loop );
	}
	return that;
}

function startDoingStuff (){
	createCanvas({width:960,
								height:540});
	var app = createApplication();
	app.run();
	//soundManager.onready( app.run );
}

// starts the application
$(document).ready( startDoingStuff );