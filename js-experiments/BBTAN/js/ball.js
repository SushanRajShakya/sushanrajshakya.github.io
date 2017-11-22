class Ball {
  constructor(ctx) {
    this.x = GAME_WIDTH/2;
    this.y = BALL_Y_DEAD;
    this.dummyY = BALL_Y_DEAD;
    this.dummyX = GAME_WIDTH/2;
    this.dx = 0;
    this.dy = 0;
    this.ctx = ctx;
    this.visible = true;
    this.flagForSplit = true;
    this.flagForPowHor = true;
    this.flagForPowVer = true;
  }

  drawBall() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'white';
    this.ctx.arc(this.x, this.y, BALL_RADIUS, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.closePath();
  }

  updateBall(game, i){
    if(game.shootStatus) {
      if(this.visible) {
        this.checkCanvasCollision();
        this.limitBoundary(game, i);
        this.checkBallLeft(game);
        this.x += this.dx;
        this.y -= this.dy;
      } else {
        this.dummyX += this.dx;
        this.dummyY -= this.dy;
        this.setVisibility();
      }
    }
  }

  //for multiple balls aligning according to the angle-----------------------------------------------------------------
  setOffSetX(j){
    this.dummyX = getX(BALL_Y_DEAD + (j*BALL_GAP));
  }

  //check if the ball is visible in the game---------------------------------------------------------------------------
  setVisibility(){
    if(this.dummyY < BALL_Y_DEAD){
      this.visible = true;
      this.y = this.dummyY;
      this.x = this.dummyX;
    }
  }

  checkCanvasCollision() {
    if ( (this.x > (GAME_WIDTH-BALL_RADIUS)) || (this.x < (0+BALL_RADIUS)) ){
      this.dx *= -1;
      this.flagForSplit = true;
      this.flagForPowHor = true;
      this.flagForPowVer = true;
    }else if (this.y < (0+BALL_RADIUS)) {
      this.dy *= -1;
      this.flagForSplit = true;
      this.flagForPowHor = true;
      this.flagForPowVer = true;
    }
  }

  limitBoundary(game, i) {
      if (this.x > (GAME_WIDTH - BALL_RADIUS)) {
        this.x = GAME_WIDTH - BALL_RADIUS;
      } else if (this.y > (GAME_HEIGHT - BALL_RADIUS)) {
        this.dummyY = BALL_Y_DEAD + (i * BALL_GAP);
        this.y = BALL_Y_DEAD;
        this.visible = false;
        game.ballsLeft--;
        this.dx = 0;
        this.dy = 0;
        if (game.firstDeadBallX == null) {
          game.firstDeadBallX = this.x;
        } else {
          this.x = game.firstDeadBallX;
        }
      } else if (this.x < (0 + BALL_RADIUS)) {
        this.x = BALL_RADIUS;
      } else if (this.y < (0 + BALL_RADIUS)) {
        this.y = BALL_RADIUS;
      }
  }

  checkBallLeft(game){
    if(game.ballsLeft==0) {
      game.firstDeadBallX = null;
      game.level++;
      game.removePowerUps();
      game.updateTileMap();
      game.flagPowerUps = [];
      game.shootStatus = false;
      console.log('----------------------------------------------');
    }
  }

  collisionOperation(obstacle,game){
    switch (obstacle[1]){
      case SQUARE:
        this.flagForSplit = true;
        this.flagForPowHor = true;
        this.flagForPowVer = true;
        this.changeDirectionSquare(obstacle[0]);
        break;
      case POWER_SPLIT:
        if(this.flagForSplit){
          this.changeDirectionPowerSplit();
        }
        this.flagForSplit = false;
        this.flagForPowHor = true;
        this.flagForPowVer = true;
        break;
      case POWER_HORZ:
        if(this.flagForPowHor){
          this.laserHorizontal(obstacle[0],game);
        }
        this.flagForSplit = true;
        this.flagForPowHor = false;
        this.flagForPowVer = true;
        break;
      case POWER_VERT:
        if(this.flagForPowVer){
          this.laserVertical(obstacle[0],game);
        }
        this.flagForSplit = true;
        this.flagForPowHor = true;
        this.flagForPowVer = false;
        break;
      default:
      //do  nothing
    }
  }

  changeDirectionSquare(obstacle){
    if (this.x - BALL_RADIUS/2 < obstacle.x) {
      this.dx = -Math.abs(this.dx);
    } else if (this.x + BALL_RADIUS/2 > (obstacle.x + OBSTACLE_WIDTH)) {
      this.dx = Math.abs(this.dx);
    }

    if (this.y - BALL_RADIUS/2 < obstacle.y) {
      this.dy = Math.abs(this.dy);
    } else if (this.y + BALL_RADIUS/2 > (obstacle.y + OBSTACLE_HEIGHT)) {
      this.dy = -Math.abs(this.dy);
    }
  }

  changeDirectionPowerSplit() {
    let angle = getRandomFloat(Math.PI/2,0);
    let dx = Math.cos(angle) * BALL_VELOCITY;
    let dy = Math.sin(angle) * BALL_VELOCITY;
    this.dx = dx;
    let random = getRandomNumber(4,3);
    //for negative dx random value;
    if(random == 3){
      this.dx *= -1;
    }
    this.dy = dy;
  }

  laserHorizontal(obstacle,game) {
    let row = obstacle.row;
    game.horizontalLaser(row);
    for(let i=0;i<TILE_COLUMNS;i++){
      game.levelMap[row][i]--;
      if(game.levelMap[row][i] <= 0){
        game.levelMap[row][i] = 0;
        let tempValue = game.tileMap[row][i];
        if (tempValue<=5 && tempValue>=1) {
          game.tileMap[row][i] = 0;
        }
      }
    }
  }

  laserVertical(obstacle,game) {
    let column = obstacle.column;
    game.verticalLaser(column);
    for(let i=1;i<TILE_ROWS;i++){
      game.levelMap[i][column]--;
      if(game.levelMap[i][column] <= 0){
        game.levelMap[i][column] = 0;
        let tempValue = game.tileMap[i][column];
        if (tempValue<=5 && tempValue>=1) {
          game.tileMap[i][column] = 0;
        }
      }
    }
  }
}
