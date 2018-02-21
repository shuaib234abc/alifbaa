var HomeState = {

  init: function() {
    
  },
  preload: function() {
    
  },
  create: function() {    

    this.background = this.game.add.sprite(0, 0, 'home_screen_bg');
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(this.startGame, this);

    var style = {
      font: 'bold 30pt Arial',
      fill: '#000000',
      align: 'center'
    };

    this.btn_play= this.game.add.button(this.game.world.centerX, 140, 'btn_play');
    this.btn_play.anchor.setTo("0.5");
    this.btn_play.events.onInputOver.add(this.startGame, this);
    this.btn_play.events.onInputDown.add(this.startGame, this);    
    
    this.btn_learn= this.game.add.button(this.game.world.centerX, 270, 'btn_learn');
    this.btn_learn.anchor.setTo("0.5");
    this.btn_learn.events.onInputOver.add(this.startLearnState, this);
    this.btn_learn.events.onInputDown.add(this.startLearnState, this);   

    /*this.btn_bonus= this.game.add.button(this.game.world.centerX, 360, 'btn_bonus');
    this.btn_bonus.anchor.setTo("0.5");
    this.btn_bonus.events.onInputOver.add(this.startBonusState, this);
    this.btn_bonus.events.onInputDown.add(this.startBonusState, this);*/   

  },
  startGame: function(){
    this.game.state.start('GameState');
  },
  startLearnState: function(){
    this.game.state.start('LearnState');
  },
  startBonusState: function(){
    window.location.href = "bonus.html";
  }
};