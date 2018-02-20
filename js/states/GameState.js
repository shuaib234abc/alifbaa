var GameState = {

  //initiate game settings
  init: function() {
    
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 300;

    this.RUN_SPEED = 100;
    this.JUMP_SPEED = 270;
    this.BARREL_SPEED = 120;


  },

  //load the game assets before the game starts
  preload: function() {
    
  },
  //executed after everything is loaded
  create: function() {    

    this.background = this.game.add.sprite(0, 0, 'home_screen_bg');

    this.ground = this.add.sprite(0, 2900, 'ground');

    this.allLevelData = null;
    this.allLevelData = JSON.parse( this.game.cache.getText('levelData') );


    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
     
    for(var i = 0; i < this.allLevelData.allPlatformData.length; i++){
      var platform = this.platforms.create( this.allLevelData.allPlatformData[i].x, this.allLevelData.allPlatformData[i].y, "platform" );
    }

    this.platforms.setAll('body.allowGravity', false);
    this.platforms.setAll('body.immovable', true);   



    this.alphabetBoxes = this.game.add.group();
    this.alphabetBoxes.enableBody = true;
     
    for(var i = 0; i < this.allLevelData.alphabets.length; i++){

      var alphabetBox = null;
      if(this.allLevelData.allPlatformData[i].x < 0){
        alphabetBox = this.alphabetBoxes.create( this.allLevelData.allPlatformData[i].x + 30, this.allLevelData.alphabets[i].y, this.allLevelData.alphabets[i].image );
      }
      else{
        alphabetBox = this.alphabetBoxes.create( this.allLevelData.allPlatformData[i].x - 30, this.allLevelData.alphabets[i].y, this.allLevelData.alphabets[i].image );
      }
       
    }

    //this.alphabetBoxes.setAll('body.allowGravity', false);
    //this.alphabetBoxes.setAll('body.immovable', true);   



    for(var i = 0; i < this.allLevelData.alphabets.length; i++){

      console.log("alphabet : " + this.allLevelData.alphabets[i].name + " -> " + this.allLevelData.alphabets[i].x, "," + this.allLevelData.alphabets[i].y + " -> " + this.allLevelData.allPlatformData[i].x, "," + this.allLevelData.allPlatformData[i].y);
    }


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
     
    //barrels
    this.barrels = this.game.add.group();
    this.barrels.enableBody = true;

    var barrelsFrequency = this.allLevelData.barrelsFrequency;

    this.barrelGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * barrelsFrequency, this.generateNewBarrel, this);

    this.createOnscreenControls();    

  },
  generateNewBarrel: function(){

    var barrel = this.barrels.getFirstExists(false);

    if(!barrel){
      console.log("here 123" + " S: " + this.BARREL_SPEED);
      barrel = this.barrels.create(0, 0, 'barrel');
      barrel.body.collideWorldBounds = true;
      barrel.body.bounce.set(1, 0);
    }

    barrel.reset(this.allLevelData.barrelSpawn.x, this.allLevelData.barrelSpawn.y);
    barrel.body.velocity.x = this.BARREL_SPEED;

  },
  createOnscreenControls: function(){
    this.leftArrow= this.game.add.button(20, 535, 'leftArrowButton');
    this.rightArrow= this.game.add.button(120, 535, 'rightArrowButton');    

    this.jumpButton = this.game.add.button(280, 535, 'actionButton');

    this.leftArrow.alpha = 0.7; this.rightArrow.alpha = 0.7; this.jumpButton.alpha = 0.7;
  
    this.leftArrow.events.onInputDown.add(function(){
      this.player.customParams.willWalkLeft = true;
    }, this);
    this.rightArrow.events.onInputDown.add(function(){
      this.player.customParams.willWalkRight = true;
    }, this);
    this.jumpButton.events.onInputDown.add(function(){
      this.player.customParams.willJump = true;      
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

    this.leftArrow.events.onInputUp.add(function(){
      this.player.customParams.willWalkLeft = false;
    }, this);
    this.rightArrow.events.onInputUp.add(function(){
      this.player.customParams.willWalkRight = false;
    }, this);
    this.jumpButton.events.onInputUp.add(function(){
      this.player.customParams.willJump = false;      
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

    this.leftArrow.fixedToCamera = true;
    this.rightArrow.fixedToCamera = true;
    this.jumpButton.fixedToCamera = true;    
    this.background.fixedToCamera = true;       

  },
  update: function() {

    //this.player.scale.setTo(-0.2, 0.2);

    this.game.physics.arcade.collide(this.platforms, this.barrels, this.collisionDetect);
    this.game.physics.arcade.collide(this.ground, this.barrels, this.collisionDetect);
    this.game.physics.arcade.collide(this.player, this.platforms, this.collisionDetect);
    this.game.physics.arcade.collide(this.player, this.ground, this.collisionDetect);   
    //this.game.physics.arcade.collide(this.player, this.barrels, this.gameOver); 
    this.game.physics.arcade.collide(this.player, this.alphabetBoxes, this.collisionDetect);   
    this.game.physics.arcade.collide(this.platforms, this.alphabetBoxes, this.collisionDetect);   

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
    else{
      this.player.animations.stop();
      this.player.body.velocity.x = 0;
      //this.player.body.velocity.y = 0;
      //this.player.frame = 17;
      this.player.frame = 0;
    }

    if(this.barrels && this.barrels.length > 0){
      this.barrels.forEach(function(elem){

        if((elem.position.x < 5 || elem.position.x > 355 ) && elem.position.y > 600 )
        {
          elem.kill();
        }

      });

      /*for(var x = 0; x < this.barrels.length; x++){
        
      }*/
    }
  },
  collisionDetect: function(obj1, obj2){
    //console.log("collision");
  },
  gameOver: function(obj1, obj2){
    game.state.start('GameState');
  }

  
};