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
  console.log(game.ball.dx,game.ball.dy);
});


//main draw for game---------------------------------------------------------------------------------------------------
function draw(){
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
  game.ctx.strokeRect(0,0, GAME_WIDTH,GAME_HEIGHT);
  for(let i=0;i<game.tileMap.length;i++){
    let row = game.tileMap[i];
    for(let j=0;j<TILE_WIDTH;j++){
      let index =  row[j];
      switch (index){
        case SQUARE:
          game.obstacle = new ObsSquare(game.ctx,i,j);
          game.obstacle.drawSquare(game.levelMap[i][j]);
          break;
        case TRIANGLE1:
          game.obstacle = new ObsTriangle1(game.ctx,i,j);
          game.obstacle.drawTriangle1(game.levelMap[i][j]);
          break;
        case TRIANGLE2:
          game.obstacle = new ObsTriangle2(game.ctx,i,j);
          game.obstacle.drawTriangle2(game.levelMap[i][j]);
          break;
        case TRIANGLE3:
          game.obstacle = new ObsTriangle3(game.ctx,i,j);
          game.obstacle.drawTriangle3(game.levelMap[i][j]);
          break;
        case TRIANGLE4:
          game.obstacle = new ObsTriangle4(game.ctx,i,j);
          game.obstacle.drawTriangle4(game.levelMap[i][j]);
          break;
        case COIN:
          game.powerUps = new PowerUps(game.ctx,i,j,game.sprtieSheet,0); //type 0 for coin
          game.powerUps.drawCoin();
          break;
        case PLUS_BALL:
          game.powerUps = new PowerUps(game.ctx,i,j,game.sprtieSheet,1); //type 1 for plus
          game.powerUps.drawPlus();
          break;
        case POWER_HORZ:
          game.powerUps = new PowerUps(game.ctx,i,j,game.sprtieSheet,2); //type 2 for power horizontal
          game.powerUps.drawPowerHorizontal();
          break;
        case POWER_VERT:
          game.powerUps = new PowerUps(game.ctx,i,j,game.sprtieSheet,3); //type 3 for power vertical
          game.powerUps.drawPowerVertical();
          break;
        case POWER_SPLIT:
          game.powerUps = new PowerUps(game.ctx,i,j,game.sprtieSheet,4); //type 4 for power split
          game.powerUps.drawPowerSplit();
          break;
        default:
        //do nothing
      }
    }
  }
  game.ball.updateBall(game);
  checkCollision();
  game.ball.drawBall();
  window.requestAnimationFrame(draw);
}

//Checking collision for each obstacle--------------------------------------------------------------------------------
function checkCollision() {
  for (let i = 0; i < game.tileMap.length; i++) {
    let row = game.tileMap[i];
    for (let j = 0; j < TILE_WIDTH; j++) {
      let index = row[j];
      switch (index) {
        case SQUARE:
          let tempObs = new ObsSquare(game.ctx,i,j);
          if(ballCollidingSquare(game.ball,tempObs)){
            console.log('collided');
            game.levelMap[i][j] -= 1;
            if(game.levelMap[i][j] == 0){
              game.tileMap[i][j] = 0;
            }
            game.ball.changeDirection(tempObs);
          }
          break;
        case TRIANGLE1:
          //collision for triangle
          break;
        case TRIANGLE2:
          //collision for triangle
          break;
        case TRIANGLE3:
          //collision for triangle
          break;
        case TRIANGLE4:
          //collision for triangle
          break;
        case COIN:
          //collision for coin
          break;
        case PLUS_BALL:
          //collision for add ball
          break;
        case POWER_HORZ:
          //collision for hor_power
          break;
        case POWER_VERT:
          //collision for ver_power
          break;
        case POWER_SPLIT:
          //collision for split_power
          break;
        default:
        //do nothing
      }
    }
  }
}


