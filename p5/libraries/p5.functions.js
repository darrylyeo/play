p5.on = function(events, func){
	events.split(" ").forEach(function(event){
		var q = p5[event]._queue;
		q.push(func);
		window[event] = function(){
			// Works even if q.length changes, that is, the queue is being added to while it's being run due to similar nested functions.
			for(var i = 0; i < q.length; i++){
				q[i]();
			}
		}
	})
};

[
	"deviceMoved", "deviceTurned", "deviceShaken",
	"keyPressed", "keyReleased", "keyTyped", "keyIsDown", 
	"mouseMoved", "mouseDragged", "mousePressed", "mouseReleased", "mouseClicked", "mouseWheel",
	"preload", "setup", "draw", "remove", "noLoop", "loop", "push", "pop", "redraw",
	"windowResized",
	
	// Custom
	"mouseIn", "mouseOut"
].forEach(function(functionName){
	window[functionName] = function(){};
	p5[functionName] = function(func){
		p5.on(functionName, func);
	}
	p5[functionName]._queue = [];
})

p5.setup(function(){
	angleMode(DEGREES);
});