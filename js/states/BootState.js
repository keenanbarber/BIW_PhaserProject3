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

	
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


	// Determines if mobile or desktop.
	if (game.device.desktop) {  
		console.log("This is not running on a mobile device. 1");
		game.scale.minWidth = 400;  
		game.scale.minHeight = 300;  
		game.scale.maxWidth = 800;
		game.scale.maxHeight = 600;
		device = "DESKTOP";
	}
	else {  
		console.log("This is running on a mobile device. 1");
		device = "MOBILE";
	}

	game.scale.pageAlignVertically = true; 
	game.scale.pageAlignHorizontally = true; 
	//this.scale.forceLandscape = true;
	
	game.scale.refresh();

	// Determines if mobile or desktop.
	if (/Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
	    console.log("This is running on a mobile device. 2");
	    device = "MOBILE";
	}
	else {
		console.log("This is not running on a mobile device. 2");
		device = "DESKTOP";
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