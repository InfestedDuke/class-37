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
      var playerCountref=await database.ref('playerCount').once('value');
      if(playerCountref.exists()){
        playerCount=playerCountref.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }
  play(){
    form.hide();
    Player.getplayerInfo();
    if(allplayers!==undefined){
      var pos =130
      for(var p in allplayers){
        if(p==='player'+player.index){
          fill('red');
        }
        else{
          fill('black');
        }
        pos=pos+30;
        text(allplayers[p].name+': '+allplayers[p].distance,120,pos);
      }
    }
    if(keyIsDown(UP_ARROW)){
      player.distance=player.distance+50;
      player.update();
    }
  }
}
