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
    this.checkCanvasCollision();
    this.limitBoundary(game);
    this.x += this.dx;
    this.y -= this.dy;
  }

  checkCanvasCollision() {
    if ( (this.x > (GAME_WIDTH-BALL_RADIUS)) || (this.x < (0+BALL_RADIUS)) ){
      this.dx *= -1;
    }else if ( (this.y > (GAME_HEIGHT-BALL_RADIUS)) || (this.y < (0+BALL_RADIUS)) ) {
      this.dy *= -1;
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
      game.updateTileMap();
    }else if ( this.x < (0+BALL_RADIUS) ){
      this.x = BALL_RADIUS;
    }else if ( this.y < (0+BALL_RADIUS) ){
      this.y = BALL_RADIUS;
    }
  }

  changeDirection(obstacle){
    switch (obstacle[1]){
      case SQUARE:
        this.changeDirectionSquare(obstacle[0]);
        break;
      default:
        //do  nothing
    }
  }

  changeDirectionSquare(obstacle){
    if (this.x-BALL_RADIUS/2 < obstacle.x) {
      this.dx = -Math.abs(this.dx);
    }else if (this.x+BALL_RADIUS/2 > (obstacle.x + OBSTACLE_WIDTH)) {
      this.dx = Math.abs(this.dx);
    }

    if (this.y-BALL_RADIUS/2 < obstacle.y) {
      this.dy = Math.abs(this.dy);
    }else if (this.y+BALL_RADIUS/2 > (obstacle.y + OBSTACLE_HEIGHT)) {
      this.dy = -Math.abs(this.dy);
    }
  }
}
