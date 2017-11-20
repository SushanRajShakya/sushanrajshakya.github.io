class Ball {
  constructor(ctx) {
    this.x = GAME_WIDTH/2;
    this.y = BALL_Y_DEAD;
    this.dx = 0;
    this.dy = 0;
    this.ctx = ctx;
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'white';
  }

  drawBall() {
    this.ctx.beginPath();
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
}