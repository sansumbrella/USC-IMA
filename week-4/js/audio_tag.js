// audio is globally-accessible
var audio;

// bind our action to happen when the document is ready
$(document).ready(function (){
	audio = $('audio').get(0); // get the first audio element using jQuery
	console.log("Hello, you can control the audio with javascript.");
	console.log("Try typing: audio.play()");
	// we can also play with: currentTime, duration, loop, src, currentSrc, pause
});