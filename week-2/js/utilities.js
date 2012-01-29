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