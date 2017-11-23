class Game {
  constructor() {
    this.canvas = document.getElementById('mainCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.level = 1;
    this.coin = 0;
    this.addBalls = 0; //number of balls to add on next level
    this.totalBalls = 1;
    this.shootStatus = false;
    this.ballsLeft = this.totalBalls; //number of balls left to move
    this.firstDeadBallX = null;
    this.flagPowerUps = [];
    this.plus1Score = [];
    //this.background = new Image();
    //this.drawBackground();
    this.sprtieSheet = new Image();
    this.ballsArray = [];
    this.ballsArray.push(new Ball(this.ctx));
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
        newTile.push(TRIANGLE_BOT_LEFT);
        newLevel.push(this.level);
        break;
      case 1:
        newTile.push(TRIANGLE_BOT_RIGHT);
        newLevel.push(this.level);
        break;
      case 2:
        newTile.push(TRIANGLE_TOP_LEFT);
        newLevel.push(this.level);
        break;
      default:
        newTile.push(TRIANGLE_TOP_RIGHT);
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

  //updating TILE MAP and number of balls-------------------------------------------------------------------------
  updateTileMap() {
    let tempTileMap = this.tileMap.slice();
    let tempLevelMap = this.levelMap.slice();
    let lastBall = this.ballsArray.length - 1;
    for(let i=0;i<this.addBalls;i++){
      let tempBall = new Ball(this.ctx);
      tempBall.x = this.ballsArray[0].x;
      tempBall.dummyX = this.ballsArray[0].x;
      tempBall.dummyY = BALL_Y_DEAD  + (lastBall + i + 1)* BALL_GAP;
      tempBall.visible = false;
      this.ballsArray.push(tempBall);
    }
    this.totalBalls += this.addBalls;
    this.addBalls = 0;
    this.ballsLeft = this.totalBalls;
    //update tile map
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
      if(this.obstacles[i][0].checkCollision(ball)) {
        this.updateFlagArray(this.obstacles[i][0].row,this.obstacles[i][0].column);
        ball.collisionOperation(this.obstacles[i],this);
        this.updateMaps(this.obstacles[i][0].row,this.obstacles[i][0].column,this.obstacles[i][1]);
      }
    }
  }

  //updating both maps after collision-------------------------------------------------------------------------------
  updateMaps(row,column,type){
    switch (type)
    {
      case SQUARE:
        this.levelMap[row][column]--;
        if (this.levelMap[row][column] == 0) {
          this.tileMap[row][column] = 0;
        }
        break;
      case COIN:
        this.coin++;
        console.log('Coins: ',this.coin);
        this.tileMap[row][column] = 0;
        break;
      case PLUS_BALL:
        this.addBalls++;
        this.tileMap[row][column] = 11;
        let newPlus1Score = new Plus1(this.ctx,row,column);
        newPlus1Score.drawPlus1();
        this.plus1Score.push(newPlus1Score);
        break;
      default:
      //do nothing
    }
  }

  //update flag array if collision----------------------------------------------------------------------------------
  updateFlagArray(row,column) {
    for(let i=0;i<this.flagPowerUps.length;i++){
      if(this.flagPowerUps[i][0] == row && this.flagPowerUps[i][1] == column){
        this.flagPowerUps[i][2] = true;
        break;
      }
    }
  }

  //removing powerups if the ball is dead---------------------------------------------------------------------------
  removePowerUps(){
    this.flagPowerUps.forEach((value)=>{
      if(value[2] == true){
        this.tileMap[value[0]][value[1]] = 0 ;
      }
    });
  }

  //animation for horizontal laser----------------------------------------------------------------------------------
  horizontalLaser(row) {
    let randomHeight = getRandomNumber(OBSTACLE_HEIGHT/2,OBSTACLE_HEIGHT/5);
    let valueY = (TILE_HEIGHT * row) + OBSTACLE_HEIGHT/2 - TILE_PADDING;
    this.ctx.beginPath();
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(0,valueY,GAME_WIDTH,randomHeight);
    this.ctx.closePath();
  }

  //animation for vertical laser-------------------------------------------------------------------------------------
  verticalLaser(column) {
    let randomWidth = getRandomNumber(OBSTACLE_WIDTH/2,OBSTACLE_WIDTH/5);
    let valueX = (TILE_WIDTH * column) + OBSTACLE_WIDTH/2 - TILE_PADDING;
    this.ctx.beginPath();
    this.ctx.fillStyle = 'yellow';
    this.ctx.fillRect(valueX,0,randomWidth,GAME_HEIGHT);
    this.ctx.closePath();
  }

  //check if all the balls are dead or not--------------------------------------------------------------------------
  checkDeadBall(){
    for(let i=0;i<this.ballsArray.length;i++){
      if(this.ballsArray[i].dx != 0 || this.ballsArray[i].dy !=0){
        return false;
      }
    }
    return true;
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



//main draw for game---------------------------------------------------------------------------------------------------
function draw(){
  game.obstacles = [];
  let obstacle;
  let powerUp;
  let score;
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
        // case TRIANGLE_BOT_LEFT:
        //   obstacle = new ObsTriangleBotLeft(game.ctx,i,j);
        //   obstacle.drawTriangleBotLeft(game.levelMap[i][j]);
        //   break;
        // case TRIANGLE_BOT_RIGHT:
        //   obstacle = new ObsTriangleBotRight(game.ctx,i,j);
        //   obstacle.drawTriangleBotRight(game.levelMap[i][j]);
        //   break;
        // case TRIANGLE_TOP_LEFT:
        //   obstacle = new ObsTriangleTopRight(game.ctx,i,j);
        //   obstacle.drawTriangleTopRight(game.levelMap[i][j]);
        //   break;
        // case TRIANGLE_TOP_RIGHT:
        //   obstacle = new ObsTriangleTopLeft(game.ctx,i,j);
        //   obstacle.drawTriangleTopLeft(game.levelMap[i][j]);
        //   break;
        case COIN:
          powerUp = new PowerUps(game.ctx,i,j,game.sprtieSheet,0); //type 0 for coin
          powerUp.drawCoin();
          game.obstacles.push([powerUp,COIN]);
          break;
        case PLUS_BALL:
          powerUp = new PowerUps(game.ctx,i,j,game.sprtieSheet,1); //type 1 for plus
          powerUp.drawPlus();
          game.obstacles.push([powerUp,PLUS_BALL]);
          break;
        case POWER_HORZ:
          powerUp = new PowerUps(game.ctx,i,j,game.sprtieSheet,2); //type 2 for power horizontal
          powerUp.drawPowerHorizontal();
          game.obstacles.push([powerUp,POWER_HORZ]);
          game.flagPowerUps.push([i,j,false]);
          break;
        case POWER_SPLIT:
          powerUp = new PowerUps(game.ctx,i,j,game.sprtieSheet,3); //type 4 for power split
          powerUp.drawPowerSplit();
          game.obstacles.push([powerUp,POWER_SPLIT]);
          game.flagPowerUps.push([i,j,false]);
          break;
        case POWER_VERT:
          powerUp = new PowerUps(game.ctx,i,j,game.sprtieSheet,4); //type 3 for power vertical
          powerUp.drawPowerVertical();
          game.obstacles.push([powerUp,POWER_VERT]);
          game.flagPowerUps.push([i,j,false]);
          break;
        case PLUS_1:
          score = new Plus1(game.ctx,i,j); //displaying +1 after eating coins or addBallPowerUp
          score.drawPlus1();
          break;
        default:
        //do nothing
      }
    }
  }

  let tempPlus1Score = game.plus1Score.slice();
  for(let i=0;i<tempPlus1Score.length;i++){
    if(tempPlus1Score[i].counter>=30){
      game.plus1Score.splice(game.plus1Score.indexOf(game.plus1Score[i]),1);
    }
  }
  console.log(game.plus1Score);

  for(let i=0;i<game.plus1Score.length;i++){
    let row = game.plus1Score[i].row;
    let column = game.plus1Score[i].column;
    game.plus1Score[i].updatePlus1();
    if(game.plus1Score[i].counter>=30){
      game.tileMap[row][column] = 0;
    }
  }
  console.log(game.plus1Score);


  for(let i=0;i<game.ballsArray.length;i++) {
    game.ballsArray[i].updateBall(game, i);
    game.checkCollision(game.ballsArray[i]);
    game.ballsArray[i].drawBall();
  }

  game.canvas.addEventListener('click',(evt)=>{
    if(game.checkDeadBall()) {
      game.shootStatus = true;
      for(let j=0;j<game.ballsArray.length;j++) {
        game.ballsArray[j] = getMousePos(game.canvas, evt, game.ballsArray[j], j, game);
        game.ballsArray[j].setOffSetX(j);
      }
    }
  });
  window.requestAnimationFrame(draw);
}



