class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    /*car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img); 
    cars = [car1, car2, car3, car4]; */ 

    plr1 = createSprite(200,450);
    plr1.addAnimation("plr1",plr1_img);
    plr1.scale=0.5;
    plr2 = createSprite(200,450);
    plr2.addAnimation("plr2",plr2_img);
    plr2.scale=1;
    plrs = [plr1,plr2]; 
  }

  play(){

    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
    //  background("powderblue");
      image(groundImg, -displayWidth/2-200*2,0,displayWidth+910*6,displayHeight-150);
      //image(groundImg, 0,0,displayWidth+610*6,displayHeight-150);
      
      
      var display_position = -3550;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x; 
      var y = 450;
    

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
       // x = x + 200;
        //use data form the database to display the cars in y direction
        x = displayWidth - allPlayers[plr].distance;
        plrs[index-1].x = x;
        plrs[index-1].y = y;

        if (index === player.index){
          plrs[index - 1].shapeColor = "red";
          camera.position.x = plrs[index-1].x;
          camera.position.y = displayHeight/2;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }

    if(player.distance < -3550){
     gameState = 2;
    }
   //3860
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
