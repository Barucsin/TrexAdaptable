var trex,trex_c,trex_dead;
var piso,piso_i;
var piso_invisible;
var cloud,cloud_i;
var obs1,obs1_i;
var obs2,obs2_i;
var obs3,obs3_i;
var obs4,obs4_i;
var obs5,obs5_i;
var obs6,obs6_i;
var azar;
var obs;
var frecuencia2
var score = 0000
var grupoobs;
var gruponubes;
const PLAY = 1; 
const END = 0;
var gameState= PLAY;
var gameover,gameover_i;
var restart,restart_i;
var checkPoint, checkPoint_s
var die,die_s
var jump, jump_s
var invisible

function preload (){
  trex_c=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_dead = loadAnimation("trex_collided.png");
  piso_i=loadImage("ground2.png");
  cloud_i=loadImage("cloud.png");
  obs1_i=loadImage("obstacle1.png");
  obs2_i=loadImage("obstacle2.png");
  obs3_i=loadImage("obstacle3.png");
  obs4_i=loadImage("obstacle4.png");
  obs5_i=loadImage("obstacle5.png");
  obs6_i=loadImage("obstacle6.png");
  gameover_i=loadImage("gameOver.png");
  restart_i=loadImage("restart.png");
  checkPoint_s=loadSound("checkPoint.mp3")
  die_s=loadSound("die.mp3");
  jump_s=loadSound("jump.mp3");

}

  
function setup() {
  createCanvas(windowWidth, windowHeight);
  trex = createSprite (50,150,20,70);
  trex.setCollider("rectangle",20,5,50,100);
  trex.shapeColor = "lightblue"
  piso = createSprite (300,height-30,700,30);
  piso_invisible = createSprite (300,height-10,700,10);
  piso_invisible.visible=false;
  piso.shapeColor = "lightgreen"
  trex.addAnimation("running",trex_c);
  trex.addAnimation("collided" , trex_dead)
  trex.scale=0.5;
  piso.addImage("pisoa",piso_i);
  piso.x=piso.width/2;
  salto=createSprite(50,height-10,30,30);
  salto.visible=false
  azar = round (random (1,100));
  console.log(piso.depth);
  grupoobs=new Group ();
  gruponubes=new Group ();
  gameover=createSprite(width/2,height/2,30,30);
  gameover.addImage (gameover_i)
  gameover.scale=0.5;
  restart=createSprite(width/2,height/2+40,20,20);
  restart.addImage(restart_i);
  restart.scale=0.5
  trex.debug=true//área de colición 

}


function draw() {
  

  if (gameState===PLAY){
    if (keyWentDown("space") && trex.isTouching(salto)) {
      trex.velocityY = -16;
      jump_s.play();
    }
    if (piso.x<0){
      piso.x=piso.width/2;
    }
    if (grupoobs.isTouching(trex)){
     gameState=END
     die_s.play();
    }

    trex.velocityY = trex.velocityY+1;
    piso.velocityX=-(4+3* score/100)
    if(frameCount %100 === 0){
      checkPoint_s.play();
    }
    
    score=score+Math.round(frameCount/250);
    crearNubes();
    crearobs();
    gameover.visible=false
    restart.visible=false



  } else if (gameState===END){
    piso.velocityX=0
    gruponubes.setVelocityXEach(0);
    grupoobs.setVelocityXEach(0);
    gameover.visible=true
    restart.visible=true
    grupoobs.setLifetimeEach(-1)
    gruponubes.setLifetimeEach(-1)
    trex.changeAnimation("collided" , trex_dead)
    trex.velocityY=0;
    trex.velocityX=0;
    if (mousePressedOver(restart)){
    gruponubes.destroyEach();
    grupoobs.destroyEach();
    score=0;
    gameState=PLAY;
    trex.changeAnimation("running",trex_c);
    }

  }
  
  background("black");
  drawSprites();
  createEdgeSprites();
   
  text (mouseX+"-"+mouseY,mouseX,mouseY);
  trex.collide(piso_invisible);

  


  textSize(15);
  fill("white");
  text ("score:  "+ score,width-100,16);

  

}

function crearNubes(){

 
  var altura = round (random(10,60));
  var tamano = (random(0.5,1));
  var velocidad = (random(-1,-5));
  var frecuencia = round (random(80,110));

  if (frameCount %frecuencia === 0){
    var cloud =createSprite (width,altura,50,20);
    cloud.velocityX=velocidad;
    cloud.addImage ("nubea",cloud_i);
    cloud.scale = tamano;
    cloud.lifetime=500;
    gruponubes.add(cloud);
    trex.depth=cloud.depth;
    trex.depth=trex.depth+1;
  }
}


function crearobs(){
var cactusanimg = round (random (1,6));

  if (frameCount % 100 === 0){
    var obs1 = createSprite (width,height-45,20,70)
    obs1.velocityX = -(6+score/100)
    switch(cactusanimg){
      case 1:
        obs1.addImage (obs1_i);
        obs1.scale = 0.15
      break;
      case 2:
        obs1.addImage (obs2_i);
        obs1.scale = 0.15
      break;
      case 3:
        obs1.addImage (obs3_i);
        obs1.scale = 0.15
      break;
      case 4:
        obs1.addImage (obs4_i);
        obs1.scale = 0.06
      break;
      case 5:
        obs1.addImage (obs5_i);
        obs1.scale = 0.06
      break;
       case 6:
       obs1.addImage (obs6_i);
       obs1.scale = 0.06
      break;
    }
    obs1.scale= 0.6
    obs1.lifetime=500;
    grupoobs.add(obs1);
  }



}
