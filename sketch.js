var towerImage;
var tower;
var door;
var doorImage;
var doorGroup;
var climberImage,climberGroup,climber;
var ghost,ghostImage;
var PLAY=1;
var END=0;
var invisibleBlock,invisibleBlockGroup;
var gameState=PLAY;




function preload(){
towerImage=loadImage("tower.png");
doorImage=loadImage("door.png");
climberImage=loadImage("climber.png")
ghostImage=loadImage("ghost-standing.png")
  

}
function setup(){
  createCanvas(600,600);
  tower= createSprite(300,300);
  tower.addImage("t",towerImage);
  tower.velocityY=1;
  ghost=createSprite(200,200,50,50);
  ghost.addImage("g",ghostImage);
  ghost.scale=0.3;
   
  
  doorGroup= new Group();
  climberGroup=new Group();
  invisibleBlockGroup=new Group();
  
}
function draw(){
 background(0);
  if(gameState===PLAY){

  
  if(tower.y>400){
    tower.y=300;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
    
  }
  ghost.velocityY=ghost.velocityY+0.1;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
    
    
  }
  
  
  if(ghost.y<600){
    ghost.y=300;
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState=END;
    
    
  }
  spawnDoors();
  
  
  drawSprites();
  }
  if(gameState===END){
    stroke("yellow");
    fill("yellow");
    textSize(32);
    text("Game Over",300,300);
    
  }
}
function spawnDoors(){
  if(frameCount % 240===0){
     
    door=createSprite(200,-50);
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=800;
    door.addImage("d",doorImage);
    door.scale=0.9;
    doorGroup.add(door);
    climber=createSprite(200,10);
    climber.addImage("c",climberImage);
    climber.y=door.y+60;
    climber.scale=0.9;
    climber.x=door.x;
    climber.velocityY=door.velocityY
    ghost.depth=door.depth;
    ghost.depth+=1;
    climber.lifetime=800;
    climberGroup.add(climber);
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
   
    
  }
   

 

}