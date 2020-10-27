var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0, survivalTime ;
var ground, invisibleGround
var gameOver, gameoverImage
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameoverImage = loadImage("GAMEOVER.png")
}



function setup() {

  monkey = createSprite(50, 350, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;
invisibleGround=createSprite(20,360,800,10)
  ground = createSprite(20, 390, 800, 10);
  FoodGroup = new Group();
  obstacleGroup = new Group();
  gameOver = createSprite(200, 200, 10, 10)
  gameOver.addImage(gameoverImage)
  monkey.setCollider("circle", 0, 0,100)
  
  survivalTime=0
}


function draw() {
  background(0);


  console.log(ground.x)
invisibleGround.visible=false
  monkey.collide(invisibleGround);
  if (gameState === PLAY) {
survivalTime = Math.round(frameCount / getFrameRate())
    ground.velocityX = -4
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && monkey.y >= 330) {
      monkey.velocityY = -14;
    }
    monkey.velocityY = monkey.velocityY + 0.5;
    if (monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach();
      score = score + 1;
    }
    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
    gameOver.visible = false
    
    spawnBananas();
    spawnObstacles();

  }
  if (gameState === END) {
ground.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    gameOver.visible = true
    if (mousePressedOver(gameOver)) {

      reset();
    }
    frameCount=0
  }



  stroke("white");
  textSize(20)
  fill("white")
  text("Survival Time : " + survivalTime, 220, 50)
  stroke("white");
  textSize(20)
  fill("white")
  text("SCORE : " + score, 270, 20)

  drawSprites();
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, 20, 10, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.scale = 0.1;
    banana.lifetime = 80;
    FoodGroup.add(banana);
  }
}

function reset() {
  survivalTime = 0;
  gameState = PLAY;
  gameOver.visible = false;

  score = 0;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();



}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400, 370, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.scale = 0.15;
    obstacle.lifetime = 65
    obstacleGroup.add(obstacle);



  }


}