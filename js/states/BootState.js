// Boot State loads a json file with the level information and starts the Loading State.

var MyGame = MyGame || {}; /* <---- This is used to create a namespace, or a named object
												under which functions and variables can be created
												without polluting the global object. More info: (https://stackoverflow.com/questions/6439579/what-does-var-foo-foo-assign-a-variable-or-an-empty-object-to-that-va) */

MyGame.BootState = function() {
	"use strict"; /* <-------- Defines that JavaScript code should be executed in "strict mode".
								It turns previously accepted "bad syntax" into real errors. */
	Phaser.State.call(this);
}; 

MyGame.prototype = Object.create(Phaser.State.prototype);
MyGame.prototype.constructor = MyGame.BootState;

MyGame.BootState.prototype.init = function(game_details) {
	"use strict";
	this.game_details = game_details;


	//Test for scaling?
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	if (game.device.desktop) {  
		game.scale.maxWidth = 640;  
		game.scale.maxHeight = 790;  
	}
	else {  
		game.scale.maxWidth = 1080;  
		game.scale.maxHeight = 1920;
	}
};

MyGame.BootState.prototype.preload = function() {
	"use strict"; 
	this.load.text("game_details", this.game_details);
};

MyGame.BootState.prototype.create = function() {
	"use strict"; 
	var game_details_text, game_details_data; 
	game_details_text = this.game.cache.getText("game_details");
	game_details_data = JSON.parse(game_details_text);

	this.game.state.start("LoadingState", true, false, game_details_data);
	// this.game.state.start(stateToStart, clearGameWorld, clearCache, passedToTargetStatesInitFunction);
}