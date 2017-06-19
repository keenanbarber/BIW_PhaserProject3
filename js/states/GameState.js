// Creates the game groups and prefabs

var MyGame = MyGame || {}; // Creates namespace if haven't already. 

MyGame.GameState = function() {
	"use strict"; 
	Phaser.State.call(this);
};

MyGame.GameState.prototype = Object.create(Phaser.State.prototype);
MyGame.GameState.prototype.constructor = MyGame.GameState;

MyGame.GameState.prototype.init = function(game_details_data) {
	"use strict";
	this.game_details_data = game_details_data;
	this.MINIMUM_SWIPE_LENGTH = 50;
	
	window.addEventListener('resize', this.onResize);
	window.addEventListener("deviceorientation", this.handleAccelerometer, true);  // Accelerometer
};

MyGame.GameState.prototype.onResize = function() { // TESTING
	console.log("Resized");

	if(device === "MOBILE") {
		if(window.innerWidth > window.innerHeight) {
			deviceOrientation = "LANDSCAPE";
		}
		else {
			deviceOrientation = "PORTRAIT";
		}
	}
	else {
		deviceOrientation = "LANDSCAPE";
	}


	console.log(deviceOrientation);
	game.scale.refresh();

};

MyGame.GameState.prototype.create = function() {
	"use strict"; 

	// Add events to check for swipe
	this.game.input.onDown.add(this.start_swipe, this);
	this.game.input.onUp.add(this.end_swipe, this);

	this.makeText("0100 ", { font: "40px Arial", fill: "#ffffff", align: "center" });
};

MyGame.GameState.prototype.start_swipe = function (pointer) {
    "use strict";
    this.start_swipe_point = new Phaser.Point(pointer.x, pointer.y);

	console.log("Press down.");
};

MyGame.GameState.prototype.end_swipe = function (pointer) {
    "use strict";	
    if(this.start_swipe_point != null && this.end_swipe_point == null) {

	    var swipe_length
	    this.end_swipe_point = new Phaser.Point(pointer.x, pointer.y);
	    swipe_length = Phaser.Point.distance(this.end_swipe_point, this.start_swipe_point);

	    console.log(swipe_length);
	    // if the swipe length is greater than the minimum, a swipe is detected
	    if (swipe_length >= this.MINIMUM_SWIPE_LENGTH) {
	        let calculatedSwipeDirectionVector = new Phaser.Point(this.end_swipe_point.x - this.start_swipe_point.x, this.end_swipe_point.y - this.start_swipe_point.y).normalize();
		    
		    this.findDirectionOfSwipe(calculatedSwipeDirectionVector);
	    }
	    console.log("Press up.");

	}

    this.end_swipe_point = null;
    this.start_swipe_point = null;
};

MyGame.GameState.prototype.findDirectionOfSwipe = function(d) {
	/* Could be made more efficient, but it works for now. */

	let bestVector = null;
	let bestDist = 0;
	let currentVector = null;
	let dist = 0;

	currentVector = new Phaser.Point(-1, 0); // Up
	bestDist = d.distance(currentVector);
	bestVector = currentVector;

	currentVector = new Phaser.Point(1, 0); // Down
	dist = d.distance(currentVector);
	if(dist < bestDist) {
		bestDist = dist;
		bestVector = currentVector;
	}

	currentVector = new Phaser.Point(0, -1); // Left
	dist = d.distance(currentVector);
	if(dist < bestDist) {
		bestDist = dist;
		bestVector = currentVector;
	}

	currentVector = new Phaser.Point(0, 1); // Right
	dist = d.distance(currentVector);
	if(dist < bestDist) {
		bestDist = dist;
		bestVector = currentVector;
	}

	console.log("Best Vector: " + bestVector);
	return bestVector;
};

MyGame.GameState.prototype.handleAccelerometer = function(e) {
    var z = e.alpha;
    var y = e.beta;
    var x = e.gamma;
    console.log("Orientation: x=" + x + ", y=" + y + ", z=" + z);
};

MyGame.GameState.prototype.makeText = function(t, style) {
	let text = game.add.text(game.world.centerX, game.world.centerY, t, style);
    text.anchor.set(0.5);
    this.colorText(text, 1, 4, "#ffff00", "#ffffff")
    return text;
};

MyGame.GameState.prototype.colorText = function(t, x1, x2, newColor, originalColor) {
	t.addColor(newColor, x1);
    t.addColor(originalColor, x2);
};
















