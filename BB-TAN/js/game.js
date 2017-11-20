class Game {
  constructor() {
    this.canvas = document.getElementById('mainCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.level = 1;
    this.ballCount = 1;
    this.ball = new Ball(this.ctx);
    this.raf;
    //this.background = new Image();
    //this.drawBackground();
    this.sprtieSheet = new Image();
    this.obstacles = [];
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
    this.levelMap = [
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



  //tile-row generator logic------------------------------------------------------------------------------------------
  generateNewTile() {
    let addBallPosition = getRandomNumber(TILE_COLUMNS-1,0); //position for the +1 ball powerUP
    let newTile = [];
    let newLevel = [];
    let randomValue;
    for (let i=0;i<TILE_COLUMNS;i++) {
      if( addBallPosition == i){
        newTile.push(PLUS_BALL);
        newLevel.push(this.level);
      } else {
        randomValue = getRandomNumber(8,0);
        if (randomValue>=0 && randomValue<=5) {
          newTile.push(SQUARE);
          newLevel.push(this.level);
        } else if (randomValue == 6) {
          this.randomTriangle(newTile,newLevel);
        } else if (randomValue == 7) {
          this.randomPowerUp(newTile,newLevel);
        } else {
          newTile.push(BLANK);
          newLevel.push(this.level);
        }
      }
    }
    return [newTile,newLevel];
  }

  //random triangle selector-------------------------------------------------------------------------------------------
  randomTriangle(newTile,newLevel) {
    let randomValue1 = getRandomNumber(3,0);
    switch (randomValue1) {
      case 0:
        newTile.push(TRIANGLE1);
        newLevel.push(this.level);
        break;
      case 1:
        newTile.push(TRIANGLE2);
        newLevel.push(this.level);
        break;
      case 2:
        newTile.push(TRIANGLE3);
        newLevel.push(this.level);
        break;
      default:
        newTile.push(TRIANGLE4);
        newLevel.push(this.level);
    }
  }

  //randomPowerUP selector--------------------------------------------------------------------------------------------
  randomPowerUp(newTile,newLevel) {
    let randomValue2 = getRandomNumber(3,0);
    switch (randomValue2) {
      case 0:
        newTile.push(COIN);
        newLevel.push(this.level);
        break;
      case 1:
        newTile.push(POWER_HORZ);
        newLevel.push(this.level);
        break;
      case 2:
        newTile.push(POWER_VERT);
        newLevel.push(this.level);
        break;
      default:
        newTile.push(POWER_SPLIT);
        newLevel.push(this.level);
    }
  }

  //updating TILE MAP ------------------------------------------------------------------------------------------------
  updateTileMap() {
    let tempTileMap = this.tileMap.slice();
    let tempLevelMap = this.levelMap.slice();
    let tempValue ;
    for(let i=2;i<tempTileMap.length;i++){
      this.tileMap[i] = tempTileMap[i-1];
      this.levelMap[i] = tempLevelMap[i-1];
    }
    tempValue = this.generateNewTile();
    this.tileMap[1] = tempValue[0];
    this.levelMap[1] = tempValue[1];
  }

  //checking collision for all the obstacles according to their types------------------------------------------------
  checkCollision(ball) {
    for(let i=0;i<this.obstacles.length;i++){
      if(this.obstacles[i][0].checkCollision(ball)){
        ball.changeDirection(this.obstacles[i]);
        this.updateMaps(this.obstacles[i][0].row,this.obstacles[i][0].column);
      }
    }
  }

  //updating both maps after collision-------------------------------------------------------------------------------
  updateMaps(row,column){
    console.log(row, column);
    this.levelMap[row][column]--;
    if (this.levelMap[row][column] == 0) {
      this.tileMap[row][column] = 0;
    }
  }
}


//main game program-------------------------------------------------------------------------------------------------
let game = new Game();
game.sprtieSheet.onload = () => {
  this.level++;
  game.updateTileMap();
  draw();
};
game.sprtieSheet.src = 'images/sprite-sheet.png';

game.canvas.addEventListener('click',(evt)=>{
  game.ball = getMousePos(game.canvas, evt, game.ball);
});


//main draw for game---------------------------------------------------------------------------------------------------
function draw(){
  game.obstacles = [];
  let obstacle;
  let powerUp;
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
  game.ctx.strokeRect(0,0, GAME_WIDTH,GAME_HEIGHT);
  for(let i=0;i<game.tileMap.length;i++){
    let row = game.tileMap[i];
    for(let j=0;j<TILE_WIDTH;j++){
      let index =  row[j];
      switch (index){
        case SQUARE:
          obstacle = new ObsSquare(game.ctx,i,j);
          obstacle.drawSquare(game.levelMap[i][j]);
          game.obstacles.push([obstacle,SQUARE]);
          break;
        // case TRIANGLE1:
        //   obstacle = new ObsTriangleBotLeft(game.ctx,i,j);
        //   obstacle.drawTriangleBotLeft(game.levelMap[i][j]);
        //   break;
        // case TRIANGLE2:
        //   obstacle = new ObsTriangleBotRight(game.ctx,i,j);
        //   obstacle.drawTriangleBotRight(game.levelMap[i][j]);
        //   break;
        // case TRIANGLE3:
        //   obstacle = new ObsTriangleTopRight(game.ctx,i,j);
        //   obstacle.drawTriangleTopRight(game.levelMap[i][j]);
        //   break;
        // case TRIANGLE4:
        //   obstacle = new ObsTriangleTopLeft(game.ctx,i,j);
        //   obstacle.drawTriangleTopLeft(game.levelMap[i][j]);
        //   break;
        case COIN:
          powerUp = new PowerUps(game.ctx,i,j,game.sprtieSheet,0); //type 0 for coin
          powerUp.drawCoin();
          break;
        case PLUS_BALL:
          powerUp = new PowerUps(game.ctx,i,j,game.sprtieSheet,1); //type 1 for plus
          powerUp.drawPlus();
          break;
        case POWER_HORZ:
          powerUp = new PowerUps(game.ctx,i,j,game.sprtieSheet,2); //type 2 for power horizontal
          powerUp.drawPowerHorizontal();
          break;
        case POWER_VERT:
          powerUp = new PowerUps(game.ctx,i,j,game.sprtieSheet,3); //type 3 for power vertical
          powerUp.drawPowerVertical();
          break;
        case POWER_SPLIT:
          powerUp = new PowerUps(game.ctx,i,j,game.sprtieSheet,4); //type 4 for power split
          powerUp.drawPowerSplit();
          break;
        default:
        //do nothing
      }
    }
  }
  game.ball.updateBall(game);
  game.checkCollision(game.ball);
  game.ball.drawBall();
  window.requestAnimationFrame(draw);
}



