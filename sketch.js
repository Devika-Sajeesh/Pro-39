var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var plrs, plr1, plr2;

var track, plr1_img, plr2_img;
var ground,groundImg;

function preload(){
  //track = loadImage("../images/track.jpg");
  plr1_img = loadAnimation("ammu1.png","ammu2.png","ammu3.png");
  //plr2_img = loadImage("../images/ammu2.png");
  plr2_img = loadAnimation("athlete-0.png","athlete-2.png","athlete-3.png","athlete-4.png","athlete-5.png");
  
  groundImg = loadImage("ground.png.png");
}

function setup(){
  canvas = createCanvas(displayWidth-20,displayHeight-200);
  database = firebase.database();

  //ground = createSprite(displayWidth/2+610,displayHeight/2-100);
  
  
  game = new Game();
  game.getState();
  game.start();

}


function draw(){

  if (groundImg.x < 0){
    groundImg.x = groundImg.width/2;
  }

  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){

    clear();
    game.play();

  }
  
  if(gameState === 2){
    game.end();
    textSize(15);
    text("You won",200,200);
    plr1.visible = false;
    plr2.visible = false;
  }
}
