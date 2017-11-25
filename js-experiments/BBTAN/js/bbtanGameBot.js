class BbtanGameBot {
  constructor (ctx) {
    this.ctx = ctx;
    this.sx = BBTAN_GAME_BOT_X;
    this.sy = BBTAN_GAME_BOT_Y;
    this.x = GAME_WIDTH/2;
    this.y = BALL_Y_DEAD - BOT_BG_HEIGHT + BALL_RADIUS + 2;
  }

  drawBbtanBot(gameStatus, game) {
    if (gameStatus == 'inGame') {
      this.checkFirstBall(game);
      this.ctx.drawImage(game.spriteSheet, this.sx, this.sy, BBTAN_GAME_BOT_WIDTH,BBTAN_GAME_BOT_HEIGHT, this.x,this.y,BBTAN_BOT_GAME_WIDTH,BBTAN_BOT_GAME_HEIGHT);
    }
  }

  checkFirstBall(game) {
    if(game.firstDeadBallX == null){
      this.x = game.ballsArray[0].x;
    }else {
      this.x = game.firstDeadBallX;
    }
  }
}
