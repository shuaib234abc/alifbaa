var LearnState = {

  //initiate game settings
  init: function(message) {
    
    this.message = message;
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.world.setBounds(0, 0, 360, 1600);

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

    this.home_link = this.game.add.button(320, 40, 'home_link');
    this.home_link.anchor.setTo(0.5);
    this.home_link.scale.setTo(0.65);
    this.home_link.events.onInputDown.add(function(){
      this.game.state.start('HomeState');
    }, this);
    this.home_link.events.onInputOver.add(function(){
      this.game.state.start('HomeState');
    }, this);

    this.ground = this.add.sprite(0, 1550, 'ground');

    this.allLearnLevelData = null;
    this.allLearnLevelData = JSON.parse( this.game.cache.getText('learnLevelData') );

    var style = {
      font: "14pt Arial",
      backgroundColor: "#212121",
      fill: "#ffffff"
    }
    this.scoreText = this.game.add.text(10, 10, this.score + " out of 28 found", style);
    this.scoreText.alpha = 0.9;

    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
     
    for(var i = 0; i < this.allLearnLevelData.allPlatformData.length; i++){
      var platform = this.platforms.create( this.allLearnLevelData.allPlatformData[i].x, this.allLearnLevelData.allPlatformData[i].y, "platform" );
    }

    this.platforms.setAll('body.allowGravity', false);
    this.platforms.setAll('body.immovable', true);   


    this.ladders = this.game.add.group();
    this.ladders.enableBody = true;
     
    for(var i = 0; i < this.allLearnLevelData.ladders.length; i++){
      var l = this.ladders.create( this.allLearnLevelData.ladders[i].x, this.allLearnLevelData.ladders[i].y, "ladder" );
      l.anchor.setTo(0.5);
    }

    this.ladders.setAll('body.allowGravity', false);
    this.ladders.setAll('body.immovable', true);   


    this.alphabetBoxes = this.game.add.group();
    this.alphabetBoxes.enableBody = true;

    var positions = ['right','left','left','right'];
    var positionIndex = 0;

    for(var i = 0; i < this.allLearnLevelData.allPlatformData.length; i++){
        var index = 27 - i;

        var tmp = "";
        var xposition = -500;
        var yposition = -500;
        var positionToConsider = "";
        positionToConsider = positions[positionIndex];

        tmp ="";
        tmp = this.allLearnLevelData.alphabets[index].image;
        if(positionToConsider === "right") xposition = 240;
        else xposition = 120;

        yposition = this.allLearnLevelData.allPlatformData[i].y - 25;

        positionIndex++;
        if(positionIndex >= 4) positionIndex = 0;

        var alphabetToPlace = null;
        if(this.allLearnLevelData.allPlatformData[i].x === -10){
          alphabetToPlace = this.alphabetBoxes.create( xposition, yposition, tmp );
        }
        else if(this.allLearnLevelData.allPlatformData[i].x === 260){
          alphabetToPlace = this.alphabetBoxes.create( xposition, yposition, tmp );
        }  

        alphabetToPlace.customParams = {};
        tmp = tmp.replace("box_", "sound_");
        alphabetToPlace.customParams.sound = this.game.add.audio( tmp );
        alphabetToPlace.anchor.setTo(0.5);
    }     


    this.alphabetBoxes.setAll('body.allowGravity', false);
    this.alphabetBoxes.setAll('body.immovable', true);   


    


    /*for(var i = 0; i < this.allLearnLevelData.alphabets.length; i++){

      console.log("alphabet : " + this.allLearnLevelData.alphabets[i].name + " -> " + this.allLearnLevelData.alphabets[i].x, "," + this.allLearnLevelData.alphabets[i].y + " -> " + this.allLearnLevelData.allPlatformData[i].x, "," + this.allLearnLevelData.allPlatformData[i].y);
    }*/


    //this.platform = this.add.sprite(0, 300, 'platform');
    //this.game.physics.arcade.enable(this.platform);
     //this.platform.body.allowGravity = false;     
     //this.platform.body.immovable = true;  

    //create player
    this.player = this.add.sprite(this.allLearnLevelData.playerStart.x, this.allLearnLevelData.playerStart.y, 'player', 3);
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
    this.scoreText.setText(this.score + " out of 28 found");
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
    this.home_link.fixedToCamera = true;      
    this.game.world.bringToTop(this.home_link);
    this.scoreText.fixedToCamera = true;
    this.game.world.bringToTop(this.scoreText);

  },
  update: function() {

    //this.player.scale.setTo(-0.2, 0.2);

    this.game.physics.arcade.collide(this.player, this.platforms, this.collisionDetect);
    this.game.physics.arcade.collide(this.player, this.ground, this.collisionDetect);  
    this.game.physics.arcade.collide(this.player, this.alphabetBoxes, this.updateScore, null, this);   
    this.game.physics.arcade.collide(this.platforms, this.alphabetBoxes, this.collisionDetect);   

    this.game.physics.arcade.overlap(this.ladders, this.player, this.moveAlongLadder, null, this);   

    if(!this.uiBlocked && (this.cursors.left.isDown || this.player.customParams.willWalkLeft)){
      this.player.body.velocity.x = -1 * this.RUN_SPEED;
      this.player.scale.setTo(-0.9, 0.9);
      this.player.animations.play('walking left');
    }
    else if(!this.uiBlocked && (this.cursors.right.isDown || this.player.customParams.willWalkRight)){
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
  updateScore: function(obj1, obj2){

    if(!this.uiBlocked)
    {
        this.uiBlocked = true;
        this.score += 1;
        this.refreshScoreText();
        obj2.customParams.sound.play();

        var alphabetChangeTween = this.game.add.tween(obj2);
        alphabetChangeTween.to({
                y : +10
        }, 700);
        alphabetChangeTween.start();
        alphabetChangeTween.onComplete.add(function(){
            obj2.kill();
            this.uiBlocked = false;
        }, this);

        
        //this.game.time.events.add(2000, this.playAnotherTween(obj2), this);  
        //this.game.time.events.add(2000, this.restartForAnotherAlphabet, this);   
    }

    
  },
  playAnotherTween: function(obj2){

    obj2.kill();
    this.uiBlocked = false;

    /*var alphabetChangeTween = this.game.add.tween(this.alphaBetForQuestion);
    alphabetChangeTween.to({
            angle : +720
    }, 700);
    alphabetChangeTween.start();
    alphabetChangeTween.onComplete.add(function(){
        this.restartForAnotherAlphabet();
    }, this);*/
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