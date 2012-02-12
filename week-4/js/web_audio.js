// make global for console hacking
var audioContext;
var birdBuffer;
var birdSource;

$(document).ready(function(){
	try{
		// eventually, this should just be AudioContext
		if( typeof(AudioContext) === 'function' ){
			console.log("AudioContext worked!");
			audioContext = new AudioContext();
		}
		// for now, Chrome is a webkit browser and uses the webkit prefix
		else if( typeof(webkitAudioContext) === 'function' ){
			console.log("webkitAudioContext");
			audioContext = new webkitAudioContext();
		}
		// there aren't any other ones to check
		else {
			$("#info").html("No web Audio support in this browser. Sorry!");
		}
	} catch (e) {
		$("#info").html("No web Audio support in this browser. Sorry!");
	}

	if(audioContext){
		requestAudio("media/nightingale.mp3");
	}
});

// creates a sound source from a buffer
function playSound(buffer){
	// audio source receives a buffer
	var source = audioContext.createBufferSource();
	source.buffer = buffer;
	// source outputs sound buffer to the context output
	source.connect( audioContext.destination );
	// start playing the source now
	source.noteOn(0);
	// stop playing the source in 5 seconds
	source.noteOff(5);
	birdSource = source;
	birdBuffer = buffer;
	$("#info").html("Playing sound");
}

// available from console
function requestAudio(url){
	$("#info").html("Requesting " + url);
	// create a request to load the audio
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';
	
	request.onload = function(){
		audioContext.decodeAudioData( request.response,
																	playSound,
																	function(err){
																		$("#info").html("Error requesting audio.");
																	});
	}
	request.send();
}