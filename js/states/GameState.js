var GameState = {

  //initiate game settings
  init: function(message) {
    
    this.message = message;
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 300;

    this.RUN_SPEED = 100;
    this.JUMP_SPEED = 110;

    this.uiBlocked = false;

    this.score = 0;

    if(this.message != null && this.message != ""){
      this.score = parseInt(this.message);
    }
  },

  //load the game assets before the game starts
  preload: function() {
    
  },
  deleteInArray : function(array, item){
    var index = -1;
    for(var x = 0; x < array.length; x++){
      if(array[x] == item){
        index = x;
        break;
      }
    }

    array.splice(index, 1);
    return array;

  },
  //executed after everything is loaded
  create: function() {    

    this.background = this.game.add.sprite(0, 0, 'home_screen_bg');

    this.ground = this.add.sprite(0, 555, 'ground');

    this.allLevelData = null;
    this.allLevelData = JSON.parse( this.game.cache.getText('levelData') );

    this.scoreText = this.game.add.text(10, 10, "Score :" + this.score);

    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
     
    for(var i = 0; i < this.allLevelData.allPlatformData.length; i++){
      var platform = this.platforms.create( this.allLevelData.allPlatformData[i].x, this.allLevelData.allPlatformData[i].y, "platform" );
    }

    this.platforms.setAll('body.allowGravity', false);
    this.platforms.setAll('body.immovable', true);   


    this.ladders = this.game.add.group();
    this.ladders.enableBody = true;
     
    for(var i = 0; i < this.allLevelData.ladders.length; i++){
      var l = this.ladders.create( this.allLevelData.ladders[i].x, this.allLevelData.ladders[i].y, "ladder" );
      l.anchor.setTo(0.5);
    }

    this.ladders.setAll('body.allowGravity', false);
    this.ladders.setAll('body.immovable', true);   


    var arrayOfNumbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];

    var pick1 = game.rnd.pick(arrayOfNumbers);
    arrayOfNumbers = this.deleteInArray(arrayOfNumbers, pick1);
    
    var pick2 = game.rnd.pick(arrayOfNumbers);
    arrayOfNumbers = this.deleteInArray(arrayOfNumbers, pick2);
    
    var pick3 = game.rnd.pick(arrayOfNumbers);
    arrayOfNumbers = this.deleteInArray(arrayOfNumbers, pick3);
    
    var pick4 = game.rnd.pick(arrayOfNumbers);
    arrayOfNumbers = this.deleteInArray(arrayOfNumbers, pick4);  
    
    //console.log(arrayOfNumbers);

    //console.log("picks: " + pick1 + ", " + pick2 + ", " + pick3 + ", " + pick4 + ". ");

    var picks = [
      pick1,
      pick2,
      pick3,
      pick4
    ];

    var pickForQuestion =  game.rnd.pick(picks);

    console.log(pickForQuestion);
    console.log(picks);

    this.alphabetBoxes = this.game.add.group();
    this.alphabetBoxes.enableBody = true;
     
    for(var i = 0; i < picks.length; i++){

      var xposition = -500;
      var yposition = -500;      

      switch(i){
        case 0:
          xposition = 160;
          yposition = 125;
          break;
        case 1:
          xposition = 160;
          yposition = 225;
          break;
        case 2:
          xposition = 160;
          yposition = 325;
          break;
        case 3:
          xposition = 160;
          yposition = 425;
          break;                              
      }

      alphabetBox = this.alphabetBoxes.create( xposition, yposition, this.allLevelData.alphabets[picks[i]].image );
      alphabetBox.anchor.setTo(0.5);
    }

    this.alphabetBoxes.setAll('body.allowGravity', false);
    this.alphabetBoxes.setAll('body.immovable', true);   


    this.alphaBetForQuestion = this.add.sprite(40, 463, this.allLevelData.alphabets[pickForQuestion].image);
    this.alphaBetForQuestion.anchor.setTo(0.5);
    this.alphaBetForQuestion.scale.setTo(0.7);
    this.game.physics.arcade.enable(this.alphaBetForQuestion);
    this.alphaBetForQuestion.body.immovable = true; 
    this.alphaBetForQuestion.body.allowGravity = false; 


    /*for(var i = 0; i < this.allLevelData.alphabets.length; i++){

      console.log("alphabet : " + this.allLevelData.alphabets[i].name + " -> " + this.allLevelData.alphabets[i].x, "," + this.allLevelData.alphabets[i].y + " -> " + this.allLevelData.allPlatformData[i].x, "," + this.allLevelData.allPlatformData[i].y);
    }*/


    //this.platform = this.add.sprite(0, 300, 'platform');
    //this.game.physics.arcade.enable(this.platform);
     //this.platform.body.allowGravity = false;     
     //this.platform.body.immovable = true;  

    //create player
    this.player = this.add.sprite(this.allLevelData.playerStart.x, this.allLevelData.playerStart.y, 'player', 3);
    this.player.anchor.setTo(0.5);
    //this.player.animations.add('walking left', [0, 1, 2, 3, 2, 1, 0], 6, true);
    this.player.animations.add('walking left', [2, 3, 4, 3], 6, true);
    this.player.customParams = {};
    this.player.scale.setTo(0.9, 0.9);
    this.game.camera.follow(this.player);

    //this.player.play('walking');

    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;    
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    this.game.physics.arcade.enable(this.ground);
    this.ground.body.allowGravity = false;   
    this.ground.body.immovable = true;
     
    
    this.createOnscreenControls();    

  },
  refreshScoreText: function(){
    this.scoreText.setText("Score: " + this.score);
  },
  createOnscreenControls: function(){
    this.leftArrow= this.game.add.button(20, 535, 'leftArrowButton');
    this.rightArrow= this.game.add.button(110, 535, 'rightArrowButton');    

    this.jumpButton = this.game.add.button(200, 535, 'actionButton');
    this.moveDownButton = this.game.add.button(290, 535, 'actionButtonDown');

    this.leftArrow.alpha = 0.7; this.rightArrow.alpha = 0.7; this.jumpButton.alpha = 0.7; this.moveDownButton.alpha = 0.7;
  
    this.leftArrow.events.onInputDown.add(function(){
      this.player.customParams.willWalkLeft = true;
    }, this);
    this.rightArrow.events.onInputDown.add(function(){
      this.player.customParams.willWalkRight = true;
    }, this);
    this.jumpButton.events.onInputDown.add(function(){
      this.player.customParams.willJump = true;      
    }, this);
    this.moveDownButton.events.onInputDown.add(function(){
      this.player.customParams.willMoveDown = true;      
    }, this);

    this.leftArrow.events.onInputOver.add(function(){
      this.player.customParams.willWalkLeft = true;
    }, this);
    this.rightArrow.events.onInputOver.add(function(){
      this.player.customParams.willWalkRight = true;
    }, this);
    this.jumpButton.events.onInputOver.add(function(){
      this.player.customParams.willJump = true;      
    }, this);
    this.moveDownButton.events.onInputOver.add(function(){
      this.player.customParams.willMoveDown = true;      
    }, this);

    this.leftArrow.events.onInputUp.add(function(){
      this.player.customParams.willWalkLeft = false;
    }, this);
    this.rightArrow.events.onInputUp.add(function(){
      this.player.customParams.willWalkRight = false;
    }, this);
    this.jumpButton.events.onInputUp.add(function(){
      this.player.customParams.willJump = false;      
    }, this);   
    this.moveDownButton.events.onInputUp.add(function(){
      this.player.customParams.willMoveDown = false;      
    }, this);            

    this.leftArrow.events.onInputOut.add(function(){
      this.player.customParams.willWalkLeft = false;
    }, this);
    this.rightArrow.events.onInputOut.add(function(){
      this.player.customParams.willWalkRight = false;
    }, this);
    this.jumpButton.events.onInputOut.add(function(){
      this.player.customParams.willJump = false;      
    }, this);    
    this.moveDownButton.events.onInputOut.add(function(){
      this.player.customParams.willMoveDown = false;      
    }, this);     

    this.leftArrow.fixedToCamera = true;
    this.rightArrow.fixedToCamera = true;
    this.jumpButton.fixedToCamera = true;    
    this.moveDownButton.fixedToCamera = true;
    this.background.fixedToCamera = true;       

  },
  update: function() {

    //this.player.scale.setTo(-0.2, 0.2);

    this.game.physics.arcade.collide(this.player, this.platforms, this.collisionDetect);
    this.game.physics.arcade.collide(this.player, this.ground, this.collisionDetect);  
    this.game.physics.arcade.collide(this.alphaBetForQuestion, this.ground);  
    this.game.physics.arcade.collide(this.alphaBetForQuestion, this.platforms);   
    this.game.physics.arcade.collide(this.player, this.alphabetBoxes, this.winOrLose, null, this);   
    this.game.physics.arcade.collide(this.player, this.alphaBetForQuestion);
    this.game.physics.arcade.collide(this.platforms, this.alphabetBoxes, this.collisionDetect);   

    this.game.physics.arcade.overlap(this.ladders, this.player, this.moveAlongLadder, null, this);   

    if(this.cursors.left.isDown || this.player.customParams.willWalkLeft){
      this.player.body.velocity.x = -1 * this.RUN_SPEED;
      this.player.scale.setTo(-0.9, 0.9);
      this.player.animations.play('walking left');
    }
    else if(this.cursors.right.isDown || this.player.customParams.willWalkRight){
      this.player.body.velocity.x = this.RUN_SPEED;
      this.player.scale.setTo(0.9, 0.9);
      this.player.animations.play('walking left');
    }
    else if((this.cursors.up.isDown || this.player.customParams.willJump) && this.player.body.touching.down){
      this.player.body.velocity.y = - 1 * this.JUMP_SPEED;
    }
    else if(this.uiBlocked){
      this.player.animations.stop();
      this.player.body.velocity.x = 0;
      //this.player.body.velocity.y = 0;
      //this.player.frame = 17;
      this.player.frame = 1;
    }
    else{
      this.player.animations.stop();
      this.player.body.velocity.x = 0;
      //this.player.body.velocity.y = 0;
      //this.player.frame = 17;
      this.player.frame = 0;
    }

    
  },
  winOrLose: function(obj1, obj2){

    if(!this.uiBlocked)
    {
      if(obj2.key === this.alphaBetForQuestion.key){
        this.uiBlocked = true;
        this.score += 10;
        this.refreshScoreText();
        this.game.time.events.add(2000, this.restartForAnotherAlphabet, this);
      }
      else{
        this.uiBlocked = true;
        this.score -= 10;
        if(this.score <= 0) this.score = 0;
        this.refreshScoreText();
        this.game.time.events.add(2000, this.restartForAnotherAlphabet, this);                
      }    
    }

    
  },
  restartForAnotherAlphabet: function(){
    this.game.state.start('GameState', true, false, this.score);
  },
  moveAlongLadder: function(obj1, obj2){
      
      //console.log("  Y: " + obj1.y + ", " + obj2.y);

      if(obj1.x - obj2.x >= -17 && obj1.x - obj2.x <= 17 && obj1.y > obj2.y){
        //console.log("X: " + obj1.x + ", " + obj2.x + "  Y: " + obj1.y + ", " + obj2.y);
        if((this.cursors.up.isDown || obj1.customParams.willJump) && !this.uiBlocked && obj1.body.touching.down){
          
          this.uiBlocked = true;this.player.frame = 1;

          var ladderMoveUpTween = this.game.add.tween(obj1);
          ladderMoveUpTween.to({
            y : obj1.y - 105
          }, 700);
          ladderMoveUpTween.start();
          ladderMoveUpTween.onComplete.add(function(){
            this.uiBlocked = false;
            this.player.frame = 0;
          }, this);

          //this.player.body.velocity.y = - 1 * this.JUMP_SPEED;
        }
      }

      if(obj1.x - obj2.x >= -17 && obj1.x - obj2.x <= 17 && obj1.y < obj2.y){
        //console.log("X: " + obj1.x + ", " + obj2.x + "  Y: " + obj1.y + ", " + obj2.y);
        if((this.cursors.down.isDown || obj1.customParams.willMoveDown) && !this.uiBlocked && obj1.body.touching.down){
          
          this.uiBlocked = true;this.player.frame = 1;

          var ladderMoveDownTween = this.game.add.tween(obj1);
          ladderMoveDownTween.to({
            y : obj1.y + 91
          }, 700);
          ladderMoveDownTween.start();
          ladderMoveDownTween.onComplete.add(function(){
            this.uiBlocked = false;
            this.player.frame = 0;
          }, this);
        }
      }
  },
  collisionDetect: function(obj1, obj2){
    //console.log("collision");
  },
  gameOver: function(obj1, obj2){
    game.state.start('GameState');
  }

  
};