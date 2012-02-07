function rect(spec){
	if(!spec){ spec = {}; }
	var	that = {},
			x = spec.x || 0,
			y = spec.y || canvas.height,
			w = spec.w || canvas.width/2,
			h = spec.h || 0,
			baseHeight = spec.baseHeight || h,
			th = spec.th || h; // how tall we'd like to be

	that.seek = function (target){
		th = target;
	}
	function draw(pattern){
		var ease = th > h ? 0.4 : 0.05;
		h += (th - h)*ease;
		context.fillRect( x, y, w, -h );
	}
	
	that.draw = draw;
	return that;
}


function createApplication(){
	var that = {},
			rectangles = [],
			pattern;
	
	function draw(){
		context.clearRect(0,0,canvas.width,canvas.height);
		context.fillStyle = pattern;
		for(var i = 0; i < rectangles.length; ++i){
			rectangles[i].draw();
		}
	}
	function loop(){
		draw();
		requestAnimationFrame(loop);
	}
	
	function updateRectangles(){
		var data = this.eqData; // 'this' is the caller
		var numRectangles = rectangles.length;
		var skip = Math.floor(data.length/numRectangles);
		if( skip < 1 ){ skip = 1; }
		for(var i = 0; i < numRectangles; ++i){
			var index = i * skip;
			var target = data[index] * canvas.height;
			rectangles[i].seek(target);
		}
	}
	
	that.run = function (){
		// create rectangles
		var numRectangles = 64;
		var rectWidth = canvas.width / numRectangles;
		for( var i = 0; i < numRectangles; ++i ){
			var spec = {	x: i * rectWidth,
										w: rectWidth };
			rectangles.push( rect(spec) );
		}
		// create pattern from video
		var patternSource = document.getElementById("pattern");
		pattern = context.createPattern(patternSource,"repeat");
		// load any sounds you want
		// audio from freesound.org: http://www.freesound.org/people/reinsamba/sounds/17185/
		var birdsong = soundManager.createSound({	id:"music", 
																						url:"media/nightingale.mp3",
																						whileplaying: updateRectangles });
		var toggle = true;
		$(canvas).click( function(){
			if(toggle){ birdsong.play({from:50}); }
			else{ birdsong.stop(); }
			toggle = !toggle;
		});
		// start looping
		loop();
	}

	return that;
}

// set up sound manager
soundManager.url = "js/";
soundManager.flashVersion = 9;
// soundManager.flash9Options.useWaveformData = true;
soundManager.flash9Options.useEQData = true;

$(document).ready(function(){
	createCanvas( { fullscreen: false,
									width: 960,
									height: 540 } );
	var app = createApplication();
	soundManager.onready(app.run);
})