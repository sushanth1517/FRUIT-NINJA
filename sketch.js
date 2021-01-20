
var sword, swordImg, fruitGroup, enemyGroup, appleFruit, pearFruit, enemy1, enemy2, randomDisplay, orangeFruit, bananaFruit;

var orangeImg, appleImg,pearImg, bananaImg, enemy1Img, enemy2Img;

var score = 0, gameOver, gameOverImg;


//gamestate variables are assigned here
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  //All the images will be loaded here
  swordImg= loadAnimation("sword.png");
  
  orangeImg = loadAnimation("fruit1.png");
  
  appleImg = loadAnimation("fruit2.png");
  
  pearImg = loadAnimation("fruit3.png");
  
  bananaImg = loadAnimation("fruit4.png");
  
  enemy1Img = loadAnimation("alien1.png");
  
  enemy2Img = loadAnimation("alien2.png");
  
  gameOverImg = loadAnimation("gameover.png");                          
}

function setup(){
  
  createCanvas (400,400);
  
  //groups are created
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  //sword is created
  sword = createSprite(200,100,10,10);
  sword.setCollider("rectangle", 25,-30, 50,50, 35);
  sword.scale = 0.5;
  sword.addAnimation("sword", swordImg);

  
}

function draw(){
  background("peru");
  //sword.debug = true;
  
  if(gameState === PLAY){ // gamestate is put into use
    sword.y = mouseY;//sword is given mouse controls
    sword.x = mouseX;
    fruit(); //all the functions are called
    enemies();
    
    if (sword.isTouching(fruitGroup)){
      score ++; //score is incrementated when sword touches fruit
      fruitGroup.destroyEach();
    }
    
    if (sword.isTouching(enemyGroup)){
      gameState = END; //the gamestate is END and the computer will move on to other if                            statement  
      
    }
    
  }
  
  if (gameState === END){
    fruitGroup.destroyEach(); //the sprites are destroyed
    enemyGroup.destroyEach();
    gameOver = createSprite(200,200,20,20); //gameover message is displayed
    gameOver.addAnimation("over", gameOverImg);
      
  }
  
  drawSprites();
  
  fill("gold");
  stroke("black");
  textSize(20);
  text("Score: " + score, 300, 20);  //the score is displayed
  
  randomDisplay = Math.round(random(30,370));
  var position = Math.round(random(1,2));
  
  function orange(){ //orange is created and properties are given to it (all the other                          moving sprites will work similarly)

    orangeFruit = createSprite(randomDisplay,420,100,2);
    orangeFruit.scale = 0.2;
    orangeFruit.velocityY = -8;
    orangeFruit.addAnimation("orange", orangeImg); //orange is given animation
  
    orangeFruit.lifetime = 220; //lifetime: avoids memory leak
    
    if (position === 1){
      orangeFruit.x = 400;
      orangeFruit.velocityY = -(7+score/4);
    }
    
    fruitGroup.add(orangeFruit); //the orange is added to fruitGroup 
   
  }
  
  function apple(){ //apple is created and properties are given to it 
 
    appleFruit = createSprite(randomDisplay,420,10,10);
    appleFruit.scale = 0.2;
    appleFruit.addAnimation("apple", appleImg);
    appleFruit.velocityY = -8;
    appleFruit.lifetime = 220;
    fruitGroup.add(appleFruit);
    
  }
  
  function pear(){ //pear is created and properties are given to it
   
    pearFruit = createSprite(randomDisplay,420,10,10);
    pearFruit.scale = 0.2;
    pearFruit.addAnimation("pear", pearImg);
    pearFruit.velocityY = -8;
    pearFruit.lifetime = 220;
    fruitGroup.add(pearFruit);
    
  }
  
  function banana(){ //banana is created and properties are given to it

    bananaFruit = createSprite(randomDisplay,420,10,10);
    bananaFruit.scale = 0.18;
    bananaFruit.addAnimation("banana", bananaImg);
    bananaFruit.velocityY = -8;
    bananaFruit.lifetime = 220;
    fruitGroup.add(bananaFruit);
    
  }
  
  function enemy_1(){ //enemy1 is created and properties are given to it (enemy2 works                           similarly)
    enemy1 = createSprite(randomDisplay,420,10,10);
    enemy1.addAnimation("enemy1", enemy1Img);
    enemy1.velocityY = -8;
    enemy1.lifetime = 220;
    enemyGroup.add(enemy1); //added
    
  }
  
  function enemy_2(){ //enemy2 is created and properties are given to it

    enemy2 = createSprite(randomDisplay,420,10,10);
    enemy2.addAnimation("enemy2", enemy2Img);
    enemy2.velocityY = -8;
    enemy2.lifetime = 220;
    enemyGroup.add(enemy2);
    
  }
  
  function fruit(){ // this is to make sure fruits spawn at a random order
    if (frameCount % 40 ===0){
      var select_fruit = Math.round(random(1,4));
      switch(select_fruit){
        case 1: orange();
                break;
        case 2: apple()
                break;
        case 3: pear();
                break;
        case 4: banana();
                break;
        default: break;
        
      }
    
    }
     
  }
  
  function enemies(){ // this is to make sure enemies spawn at a random order
    if (frameCount%100 === 0){
      var select_enemy = Math.round(random(1,2));
      switch(select_enemy){
        case 1: enemy_1();
                break;
        case 2: enemy_2();
                break;
        default: break;
        
      }
                
    }
    
  }
    
}