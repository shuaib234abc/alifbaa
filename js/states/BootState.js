var BootState = {

  init: function() {
    //adapt to screen size, fit all the game
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    
    this.game.stage.backgroundColor = "#fff";
  },
  preload: function() {

  	this.load.image('loading', 'assets/images/bar.png');
  	this.load.image('logo', 'assets/images/logo.png');  
  	this.load.image('logotext', 'assets/images/logo-text.png');  	
    
  },
  create: function() {    
  	this.game.state.start('PreloadState');
  }
};