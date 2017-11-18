class Game {
  constructor() {
    this.canvas = document.getElementById('mainCanvas');
    this.ctx = this.canvas.getContext('2d');
    //this.background = new Image();
    //this.drawBackground();
    this.sprtieSheet = new Image();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = 'white';
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    this.tileMap = [
      [0,0,0,0,0,0,0],
      [1,5,2,6,3,10,1],
      [0,1,7,5,6,3,4],
      [0,0,4,0,6,3,4],
      [1,6,4,0,2,3,4],
      [6,1,0,8,2,0,4],
      [1,0,4,2,1,3,0],
      [1,6,4,5,2,3,4],
      [1,9,0,0,6,0,0],
    ];
  }

  draw(){
    for(let i=0;i<this.tileMap.length;i++){
      let row = this.tileMap[i];
      for(let j=0;j<7;j++){
        let index =  row[j];
        switch (index){
          case 1:
            this.obstacle = new Obstacle(this.ctx,i,j);
            this.obstacle.drawRectangle();
            break;
          case 2:
            this.obstacle = new Obstacle(this.ctx,i,j);
            this.obstacle.drawTriangle1();
            break;
          case 3:
            this.obstacle = new Obstacle(this.ctx,i,j);
            this.obstacle.drawTriangle2();
            break;
          case 4:
            this.obstacle = new Obstacle(this.ctx,i,j);
            this.obstacle.drawTriangle3();
            break;
          case 5:
            this.obstacle = new Obstacle(this.ctx,i,j);
            this.obstacle.drawTriangle4();
            break;
          case 6:
            this.powerUps = new PowerUps(this.ctx,i,j,this.sprtieSheet,0); //type 0 for coin
            this.powerUps.drawCoin();
            break;
          case 7:
            this.powerUps = new PowerUps(this.ctx,i,j,this.sprtieSheet,1); //type 1 for plus
            this.powerUps.drawPlus();
            break;
          case 8:
            this.powerUps = new PowerUps(this.ctx,i,j,this.sprtieSheet,2); //type 2 for power horizontal
            this.powerUps.drawPowerHorizontal();
            break;
          case 9:
            this.powerUps = new PowerUps(this.ctx,i,j,this.sprtieSheet,3); //type 3 for power vertical
            this.powerUps.drawPowerVertical();
            break;
          case 10:
            this.powerUps = new PowerUps(this.ctx,i,j,this.sprtieSheet,4); //type 4 for power split
            this.powerUps.drawPowerSplit();
            break;
          default:
            console.log("do nothing");
            //do nothing
        }
      }
    }
  }
}

let game = new Game();
game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
game.sprtieSheet.onload = () => {
  game.draw();
}
game.sprtieSheet.src = 'images/sprite-sheet.png';




/*
  drawBackground() {
    this.ctx.clearRect( 0,0,this.canvas.width,this.canvas.height );
    this.background.onload = () => {
      this.ctx.drawImage(this.background,0,0,this.canvas.width,this.canvas.height);
    }
    this.background.src = 'images/menu-bg.png';
  }

  drawObstacle() {
    for(let i=0; i<7; i++){
      this.obstacle = new Obstacle(this.ctx);
      this.obstacle.draw(i);
    }
  }
}

//main program for starting the GAME------------------------------------------------------------------
let game = new Game();
*/