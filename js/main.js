var MyGame = MyGame || {};

var game = new Phaser.Game(640, 790, Phaser.AUTO, 'game_phaser');



game.state.add("BootState", new MyGame.BootState());
game.state.add("LoadingState", new MyGame.LoadingState());
game.state.add("GameState", new MyGame.GameState());
game.state.start("BootState", true, false, "assets/json/game_details.json", 'game_phaser');