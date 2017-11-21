class Ball {
  constructor(ctx) {
    this.x = GAME_WIDTH/2;
    this.y = BALL_Y_DEAD;
    this.dx = 0;
    this.dy = 0;
    this.ctx = ctx;
  }

  drawBall() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'white';
    this.ctx.arc(this.x, this.y, BALL_RADIUS, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.closePath();
  }

  updateBall(game){
    this.checkCanvasCollision(game);
    this.limitBoundary(game);
    this.x += this.dx;
    this.y -= this.dy;
  }

  checkCanvasCollision(game) {
    if ( (this.x > (GAME_WIDTH-BALL_RADIUS)) || (this.x < (0+BALL_RADIUS)) ){
      this.dx *= -1;
      game.flagForSplit = true;
      game.flagForPowHor = true;
      game.flagForPowVer = true;
    }else if ( (this.y > (GAME_HEIGHT-BALL_RADIUS)) || (this.y < (0+BALL_RADIUS)) ) {
      this.dy *= -1;
      game.flagForSplit = true;
      game.flagForPowHor = true;
      game.flagForPowVer = true;
    }
  }

  limitBoundary(game) {
    if ( this.x > (GAME_WIDTH-BALL_RADIUS) ){
      this.x = GAME_WIDTH-BALL_RADIUS;
    }else if ( this.y > (GAME_HEIGHT-BALL_RADIUS) ) {
      this.y = BALL_Y_DEAD;
      this.dx = 0;
      this.dy = 0;
      game.level++;
      game.removePowerUps();
      game.updateTileMap();
      game.flagPowerUps = [];
    }else if ( this.x < (0+BALL_RADIUS) ){
      this.x = BALL_RADIUS;
    }else if ( this.y < (0+BALL_RADIUS) ){
      this.y = BALL_RADIUS;
    }
  }

  collisionOperation(obstacle,game){
    switch (obstacle[1]){
      case SQUARE:
        game.flagForSplit = true;
        game.flagForPowHor = true;
        game.flagForPowVer = true;
        this.changeDirectionSquare(obstacle[0]);
        break;
      case POWER_SPLIT:
        if(game.flagForSplit){
          this.changeDirectionPowerSplit();
        }
        game.flagForSplit = false;
        game.flagForPowHor = true;
        game.flagForPowVer = true;
        break;
      case POWER_HORZ:
        if(game.flagForPowHor){
          this.laserHorizontal(obstacle[0],game);
        }
        game.flagForSplit = true;
        game.flagForPowHor = false;
        game.flagForPowVer = true;
        break;
      case POWER_VERT:
        if(game.flagForPowVer){
          this.laserVertical(obstacle[0],game);
        }
        game.flagForSplit = true;
        game.flagForPowHor = true;
        game.flagForPowVer = false;
        break;
      default:
        //do  nothing
    }
  }

  changeDirectionSquare(obstacle){
    if (this.x-BALL_RADIUS < obstacle.x) {
      this.dx = -Math.abs(this.dx);
    }else if (this.x+BALL_RADIUS > (obstacle.x + OBSTACLE_WIDTH)) {
      this.dx = Math.abs(this.dx);
    }

    if (this.y-BALL_RADIUS < obstacle.y) {
      this.dy = Math.abs(this.dy);
    }else if (this.y+BALL_RADIUS > (obstacle.y + OBSTACLE_HEIGHT)) {
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
