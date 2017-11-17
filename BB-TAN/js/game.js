class Game {
  constructor() {
    this.canvas = document.getElementById('mainCanvas');
    this.ctx = this.canvas.getContext('2d');
    //this.background = new Image();
    //this.drawBackground();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = 'white';
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    this.tileMap = [
      [0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1]
    ];
  }

  draw(){
    for(let i=0;i<this.tileMap.length;i++){
      let row = this.tileMap[i];
      for(let j=0;j<7;j++){
        let index =  row[j];
        switch (index){
          case 1:
            this.obstacle = new Obstacle(this.ctx);
            this.obstacle.drawRectangle(i,j);
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
game.draw();



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