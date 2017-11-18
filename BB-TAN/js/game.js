class Game {
  constructor() {
    this.canvas = document.getElementById('mainCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.level = 1;
    this.raf;
    //this.background = new Image();
    //this.drawBackground();
    this.sprtieSheet = new Image();
    this.tileMap = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
    ];
  }

  draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(let i=0;i<this.tileMap.length;i++){
      let row = this.tileMap[i];
      for(let j=0;j<TILE_WIDTH;j++){
        let index =  row[j];
        switch (index){
          case SQUARE:
            this.obstacle = new ObsSquare(this.ctx,i,j);
            this.obstacle.drawSquare(this.level);
            break;
          case TRIANGLE1:
            this.obstacle = new ObsTriangle1(this.ctx,i,j);
            this.obstacle.drawTriangle1(this.level);
            break;
          case TRIANGLE2:
            this.obstacle = new ObsTriangle2(this.ctx,i,j);
            this.obstacle.drawTriangle2(this.level);
            break;
          case TRIANGLE3:
            this.obstacle = new ObsTriangle3(this.ctx,i,j);
            this.obstacle.drawTriangle3(this.level);
            break;
          case TRIANGLE4:
            this.obstacle = new ObsTriangle4(this.ctx,i,j);
            this.obstacle.drawTriangle4(this.level);
            break;
          case COIN:
            this.powerUps = new PowerUps(this.ctx,i,j,this.sprtieSheet,0); //type 0 for coin
            this.powerUps.drawCoin();
            break;
          case PLUS_BALL:
            this.powerUps = new PowerUps(this.ctx,i,j,this.sprtieSheet,1); //type 1 for plus
            this.powerUps.drawPlus();
            break;
          case POWER_HORZ:
            this.powerUps = new PowerUps(this.ctx,i,j,this.sprtieSheet,2); //type 2 for power horizontal
            this.powerUps.drawPowerHorizontal();
            break;
          case POWER_VERT:
            this.powerUps = new PowerUps(this.ctx,i,j,this.sprtieSheet,3); //type 3 for power vertical
            this.powerUps.drawPowerVertical();
            break;
          case POWER_SPLIT:
            this.powerUps = new PowerUps(this.ctx,i,j,this.sprtieSheet,4); //type 4 for power split
            this.powerUps.drawPowerSplit();
            break;
          default:
            //do nothing
        }
      }
    }
  }

  //tile-row generator logic------------------------------------------------------------------------------------------
  generateNewTile() {
    let addBallPosition = getRandomNumber(TILE_COLUMNS-1,0); //position for the +1 ball powerUP
    let newTile = [];
    let randomValue;
    for (let i=0;i<TILE_COLUMNS;i++) {
      if( addBallPosition == i){
        newTile.push(PLUS_BALL);
      } else {
        randomValue = getRandomNumber(8,0);
        if (randomValue>=0 && randomValue<=5) {
          newTile.push(SQUARE);
        } else if (randomValue == 6) {
          this.randomTriangle(newTile);
        } else if (randomValue == 7) {
          this.randomPowerUp(newTile);
        } else {
          newTile.push(BLANK);
        }
      }
    }
    return newTile;
  }

  //random triangle selector-------------------------------------------------------------------------------------------
  randomTriangle(newTile) {
    let randomValue1 = getRandomNumber(3,0);
    switch (randomValue1) {
      case 0:
        newTile.push(TRIANGLE1);
        break;
      case 1:
        newTile.push(TRIANGLE2);
        break;
      case 2:
        newTile.push(TRIANGLE3);
        break;
      default:
        newTile.push(TRIANGLE4);
    }
  }

  //randomPowerUP selector--------------------------------------------------------------------------------------------
  randomPowerUp(newTile) {
    let randomValue2 = getRandomNumber(3,0);
    switch (randomValue2) {
      case 0:
        newTile.push(COIN);
        break;
      case 1:
        newTile.push(POWER_HORZ);
        break;
      case 2:
        newTile.push(POWER_VERT);
        break;
      default:
        newTile.push(POWER_SPLIT);
    }
  }

  //updating TILE MAP ------------------------------------------------------------------------------------------------
  updateTileMap() {
    let tempTileMap = this.tileMap.slice();
    for(let i=2;i<tempTileMap.length;i++){
      this.tileMap[i] = tempTileMap[i-1];
    }
    this.tileMap[1] = this.generateNewTile();
  }
}

let raf;
let game = new Game();
game.sprtieSheet.onload = () => {
    this.level++;
    game.tileMap[1] = game.generateNewTile();
    game.draw();
};
game.sprtieSheet.src = 'images/sprite-sheet.png';
game.canvas.addEventListener('mouseover',()=>{
  raf = window.requestAnimationFrame(() => {
    game.level++;
    game.updateTileMap();
    game.draw();
  });
});

game.canvas.addEventListener('mouseout',()=>{
  window.cancelAnimationFrame(raf);
})




