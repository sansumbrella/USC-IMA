

// set up sound manager
soundManager.url = "js/";
soundManager.flashVersion = 9;
// soundManager.flash9Options.useWaveformData = true;
// soundManager.flash9Options.useEQData = true;

// our application
function createApplication(){
	var that = {};
	
	that.run = function (){
		// setup stuff
		// start looping
		loop();
	}
	function loop(){
		requestAnimationFrame( loop );
	}
	return that;
}

// basic mouse interaction, and animation loop
$(document).ready( function (){
	var app = createApplication();
	createCanvas({width:960,
								height:540});
	soundManager.onready( app.run );
});