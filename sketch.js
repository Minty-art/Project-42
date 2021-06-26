
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground, invisible_ground

var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  
  ground = createSprite(200,390,600,30);
  invisible_ground = createSprite(200,400,600,20);
  
  FoodGroup = createGroup();
  ObstacleGroup = createGroup();
  monkey = createSprite(50,350,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.112
    
  monkey.setCollider("rectangle",0,0,400, monkey.height);

  score = 0;
}


function draw() {
  background("skyblue")
  
  textSize(12)
  text("score:"+ score, 350,15)
  
  if (FoodGroup.isTouching(monkey)) {
    score = score + 20
    FoodGroup.destroyEach();
  }
  
 monkey.collide(invisible_ground);
  if(keyDown("space") && monkey.y > 250){
     monkey.velocityY = -12;
     }
  monkey.velocityY = monkey.velocityY + 0.69
  if(ObstacleGroup.isTouching(monkey)){
      monkey.velocityY = 0
      ObstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      ObstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
    }
  spawnbanana();
  FoodGroup.velocityX = -6
   spawnObstacles();
 drawSprites();
}
function spawnbanana(){
  if (frameCount % 80 === 0 ){
    banana = createSprite(450,300,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.11
    banana.lifetime = 65
    banana.velocityX = -6
    banana.y = Math.round(random(150,240))
    FoodGroup.add(banana)
    }
 
}
function spawnObstacles(){
  if (frameCount % 60 === 0 ){
    obstacle = createSprite(450,360,20,20)
  obstacle.addImage(obstacleImage)
  obstacle.scale = 0.225
  obstacle.velocityX = -6
  obstacle.lifetime = 133
  obstacle.setCollider("rectangle",0,0,340,obstacle.height - 60);
  ObstacleGroup.add(obstacle);
  }
  
}
