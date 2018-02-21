var PreloadState = {

  init: function() {

  },
  preload: function() {
    
	this.logo = this.game.add.sprite(this.game.world.centerX, 280, "logo");
  	this.logo.anchor.setTo(0.5);

  	this.logotext = this.game.add.sprite(this.game.world.centerX, 100, "logotext");
  	this.logotext.anchor.setTo(0.5);

  	this.loadingBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 130, "loading");
  	this.loadingBar.anchor.setTo(0.5);

  	this.load.setPreloadSprite(this.loadingBar);

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


      this.load.audio('sound_alif', ['assets/sounds/mp3_alif.mp3', 'assets/sounds/ogg_alif.ogg']);
      this.load.audio('sound_ayn', ['assets/sounds/mp3_ayn.mp3', 'assets/sounds/ogg_ayn.ogg']);      
    this.load.audio('sound_baa', ['assets/sounds/mp3_baa.mp3', 'assets/sounds/ogg_baa.ogg']);    
      this.load.audio('sound_dad', ['assets/sounds/mp3_dad.mp3', 'assets/sounds/ogg_dad.ogg']);
      this.load.audio('sound_dal', ['assets/sounds/mp3_dal.mp3', 'assets/sounds/ogg_dal.ogg']);
      this.load.audio('sound_dhal', ['assets/sounds/mp3_dhal.mp3', 'assets/sounds/ogg_dhal.ogg']);
      this.load.audio('sound_fa', ['assets/sounds/mp3_fa.mp3', 'assets/sounds/ogg_fa.ogg']);
      this.load.audio('sound_ghain', ['assets/sounds/mp3_ghain.mp3', 'assets/sounds/ogg_ghain.ogg']);
      this.load.audio('sound_ha', ['assets/sounds/mp3_ha.mp3', 'assets/sounds/ogg_ha.ogg']);      
      this.load.audio('sound_hah', ['assets/sounds/mp3_hah.mp3', 'assets/sounds/ogg_hah.ogg']);
      this.load.audio('sound_jim', ['assets/sounds/mp3_jim.mp3', 'assets/sounds/ogg_jim.ogg']);  
    this.load.audio('sound_kaf', ['assets/sounds/mp3_kaf.mp3', 'assets/sounds/ogg_kaf.ogg']);
          this.load.audio('sound_kha', ['assets/sounds/mp3_kha.mp3', 'assets/sounds/ogg_kha.ogg']);
          this.load.audio('sound_lam', ['assets/sounds/mp3_lam.mp3', 'assets/sounds/ogg_lam.ogg']);
          this.load.audio('sound_mim', ['assets/sounds/mp3_mim.mp3', 'assets/sounds/ogg_mim.ogg']);
          this.load.audio('sound_nun', ['assets/sounds/mp3_nun.mp3', 'assets/sounds/ogg_nun.ogg']);
          this.load.audio('sound_qaf', ['assets/sounds/mp3_qaf.mp3', 'assets/sounds/ogg_qaf.ogg']);
          this.load.audio('sound_ra', ['assets/sounds/mp3_ra.mp3', 'assets/sounds/ogg_ra.ogg']);
          this.load.audio('sound_sad', ['assets/sounds/mp3_sad.mp3', 'assets/sounds/ogg_sad.ogg']);
      this.load.audio('sound_shin', ['assets/sounds/mp3_shin.mp3', 'assets/sounds/ogg_shin.ogg']); 
       this.load.audio('sound_sin', ['assets/sounds/mp3_sin.mp3', 'assets/sounds/ogg_sin.ogg']);
      this.load.audio('sound_ta', ['assets/sounds/mp3_ta.mp3', 'assets/sounds/ogg_ta.ogg']);
       this.load.audio('sound_taa', ['assets/sounds/mp3_taa.mp3', 'assets/sounds/ogg_taa.ogg']); 
      this.load.audio('sound_thaa', ['assets/sounds/mp3_thaa.mp3', 'assets/sounds/ogg_thaa.ogg']); 
      this.load.audio('sound_waw', ['assets/sounds/mp3_waw.mp3', 'assets/sounds/ogg_waw.ogg']);  
      this.load.audio('sound_yaa', ['assets/sounds/mp3_yaa.mp3', 'assets/sounds/ogg_yaa.ogg']);
      this.load.audio('sound_za', ['assets/sounds/mp3_za.mp3', 'assets/sounds/ogg_za.ogg']);  
      this.load.audio('sound_zayin', ['assets/sounds/mp3_zayin.mp3', 'assets/sounds/ogg_zayin.ogg']);  

      this.load.audio('wrong_answer', ['assets/sounds/wrong-answer.mp3', 'assets/sounds/wrong-answer.ogg']);  

      this.load.image('home_screen_bg', 'assets/images/background-clipart-2.jpg');
    this.load.image('btn_play', 'assets/images/play.png');
    this.load.image('btn_learn', 'assets/images/learn.png');
    this.load.image('btn_bonus', 'assets/images/bonus.png');            
  this.load.image('ground', 'assets/images/ground.png');    
    this.load.image('platform', 'assets/images/platform.png');    
    this.load.image('leftArrowButton', 'assets/images/arrow-left.png');
    this.load.image('rightArrowButton', 'assets/images/arrow-right.png');    
    this.load.image('actionButton', 'assets/images/arrow-up.png')
    this.load.image('actionButtonDown', 'assets/images/arrow-down.png'); 
    this.load.image('ladder', 'assets/images/rope_ladder_alt.png');    
    this.load.image('barrel', 'assets/images/barrel.png');    
      
    this.load.image('home_link', 'assets/images/home_icon.png');

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