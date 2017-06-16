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
	
};

MyGame.GameState.prototype.create = function() {
	"use strict"; 

	// Add events to check for swipe
	this.game.input.onDown.add(this.start_swipe, this);
	this.game.input.onUp.add(this.end_swipe, this);

};

MyGame.GameState.prototype.start_swipe = function (pointer) {
    "use strict";
    this.start_swipe_point = new Phaser.Point(pointer.x, pointer.y);
};

MyGame.GameState.prototype.end_swipe = function (pointer) {
        "use strict";
    var swipe_length, cut_style, cut;
    this.end_swipe_point = new Phaser.Point(pointer.x, pointer.y);
    swipe_length = Phaser.Point.distance(this.end_swipe_point, this.start_swipe_point);

    console.log(swipe_length);
    // if the swipe length is greater than the minimum, a swipe is detected
    if (swipe_length >= this.MINIMUM_SWIPE_LENGTH) {
        // create a new line as the swipe and check for collisions
        console.log("DRAW LINE");
        // cut_style = {line_width: 5, color: 0xE82C0C, alpha: 1}
        // cut = new MyGame.Cut(this, "cut", {x: 0, y: 0}, {start: this.start_swipe_point, end: this.end_swipe_point, duration: 0.3, style: cut_style});
        // this.swipe = new Phaser.Line(this.start_swipe_point.x, this.start_swipe_point.y, this.end_swipe_point.x, this.end_swipe_point.y);
    }
};