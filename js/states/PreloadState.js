var PreloadState = {

  init: function() {

  },
  preload: function() {
    
	this.logo = this.game.add.sprite(this.game.world.centerX, 280, "logo");
  	this.logo.anchor.setTo(0.5);

  	this.logotext = this.game.add.sprite(this.game.world.centerX, 100, "logotext");
  	this.logotext.anchor.setTo(0.5);

  	this.loadingBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 60, "loading");
  	this.loadingBar.anchor.setTo(0.5);

  	this.load.setPreloadSprite(this.loadingBar);

  	this.load.image('home_screen_bg', 'assets/images/background-clipart-2.jpg');
  	this.load.image('btn_play', 'assets/images/play.png');
  	this.load.image('btn_learn', 'assets/images/learn.png');
  	this.load.image('btn_bonus', 'assets/images/bonus.png');  	  	  	
	this.load.image('ground', 'assets/images/ground.png');    
    this.load.image('platform', 'assets/images/platform.png');    
    this.load.image('leftArrowButton', 'assets/images/arrow-left.png');
    this.load.image('rightArrowButton', 'assets/images/arrow-right.png');    
    this.load.image('actionButton', 'assets/images/arrow-up.png');    
    this.load.image('barrel', 'assets/images/barrel.png');    
    this.load.image('box_alif', 'assets/images/alphabets/box_alif.png');
      this.load.image('box_ayn', 'assets/images/alphabets/box_ayn.png');      
    this.load.image('box_baa', 'assets/images/alphabets/box_baa.png');    
      this.load.image('box_dad', 'assets/images/alphabets/box_dad.png');
      this.load.image('box_dal', 'assets/images/alphabets/box_dal.png');
      this.load.image('box_dhal', 'assets/images/alphabets/box_dhal.png');
      this.load.image('box_fa', 'assets/images/alphabets/box_fa.png');
      this.load.image('box_ghain', 'assets/images/alphabets/box_ghain.png');
      this.load.image('box_ha', 'assets/images/alphabets/box_ha.png');      
      this.load.image('box_hah', 'assets/images/alphabets/box_hah.png');
      this.load.image('box_jim', 'assets/images/alphabets/box_jim.png');  
    this.load.image('box_kaf', 'assets/images/alphabets/box_kaf.png');
          this.load.image('box_kha', 'assets/images/alphabets/box_kha.png');
          this.load.image('box_lam', 'assets/images/alphabets/box_lam.png');
          this.load.image('box_mim', 'assets/images/alphabets/box_mim.png');
          this.load.image('box_nun', 'assets/images/alphabets/box_nun.png');
          this.load.image('box_qaf', 'assets/images/alphabets/box_qaf.png');
          this.load.image('box_ra', 'assets/images/alphabets/box_ra.png');
          this.load.image('box_sad', 'assets/images/alphabets/box_sad.png');
      this.load.image('box_shin', 'assets/images/alphabets/box_shin.png'); 
       this.load.image('box_sin', 'assets/images/alphabets/box_sin.png');
      this.load.image('box_ta', 'assets/images/alphabets/box_ta.png');
       this.load.image('box_taa', 'assets/images/alphabets/box_taa.png'); 
      this.load.image('box_thaa', 'assets/images/alphabets/box_thaa.png'); 
      this.load.image('box_waw', 'assets/images/alphabets/box_waw.png');  
      this.load.image('box_yaa', 'assets/images/alphabets/box_yaa.png');
      this.load.image('box_za', 'assets/images/alphabets/box_za.png');  
      this.load.image('box_zayin', 'assets/images/alphabets/box_zayin.png');  
      
    //this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1);    
	//this.load.spritesheet('player', 'assets/images/boys.png', 128, 163, 22, 3, 3);        
	this.load.spritesheet('player', 'assets/images/boys2.png', 48, 56);        	
    
    this.load.text('levelData', 'assets/data/level1.json');

  },
  create: function() {    
  	this.game.time.events.add(3000, this.startGame, this);
	//this.game.state.start('HomeState');
  },
  startGame: function(){
  	this.game.state.start('HomeState');
  }
};