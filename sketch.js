//creating the variables for the sprites and their images
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;

//creating the variables for the groups
var foodGroup, obstacleGroup;

//creating the variable for the score
var score = 0;

//creating thhe variable for the ground and invisible ground;
var ground, invisible;

//creating the variables for the gameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload()
{
  //loading the animation for the monkey running
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  //loading the images
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");  
}

function setup()
{
  //creating the canvas
  createCanvas(400,400);
  
  //creating the groups
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  //creating the sprite for thhe monkey
  monkey = createSprites(70,370,50,50);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
  
  //creating the sprite for the ground
  ground = createSprites(250,405,1000,10);
  ground.x = ground.width/2;
  
  //creating the invisble ground
  invisible = createSprites(250,407,1000,10);
  invisible.x = invisible.width/2;
}

function draw()
{
  //drawing the background
  background("white");
  
  //creating the gameState PLAY
  if (gameState === PLAY)
    {
      if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (invisible.x < 0) {
      invisible.x = invisible.width / 2;
    }
    invisible.velocityX = -5;

    if (keyDown("space") && monkey.isTouching(ground)) {
      monkey.velocityY = -20;
    }
    
    score = Math.round(frameCount / 3);
    survivalTime = Math.ceil(frameCount / frameRate());
     ground.velocityX = -(5 + 2 * score / 100);
    
    if (monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
    }
  
   Food();
   Obstacle();


   if (monkey.isTouching(obstacleGroup)) {
      GameState = END;
    }
  
   if (GameState === END) {
    ground.velocityX = 0;
    invisible.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    
    
  //creating gravity
  monkey.velocityY = monkey.velocityY + 0.9;

  monkey.collide(invisible);

  stroke("black");
  textSize(20);
  fill("red");
  text("score:" + score, 400, 50);

  stroke("black");
  textSize(20);
  fill("black");
  text("survival Time:" + survivalTime, 100, 50);

    

  }
   
      
      
  //drawing the sprites
  drawSprites();
 }
}

function Food() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(500, 10, 10, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(5 + 2 * score / 100);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    foodGroup.add(banana);
    foodGroup.setLifetimeEach(100);
    banana.setCollider("rectangle", 0, 0, 400, 400);

  }

}

function Obstacle() {

  if (frameCount % 300 === 0) {
    var obstacle = createSprite(500, 365, 23, 32);
    obstacle.velocityX = -(5 + 2 * score / 100);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
    // obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 200)
  }
}

























