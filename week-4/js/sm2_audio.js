
function useData(){
	var data = this.eqData;
	var scale = 500;
	var index = $("[name=index]").val();
	$("#info").html( data[index] );
	$("#bar").css( { width: 1 + data[index] * scale } );
}

function start(){	
	var birdsong = soundManager.createSound({	id:"music", 
																					url:"media/nightingale.mp3",
																					whileplaying: useData });
	birdsong.play();
}

// set up sound manager
soundManager.url = "js/lib/";
soundManager.flashVersion = 9;
// soundManager.flash9Options.useWaveformData = true;
soundManager.flash9Options.useEQData = true;
soundManager.onready(start);
