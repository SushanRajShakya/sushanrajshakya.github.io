class Ball {
  constructor(ctx) {
    this.x = GAME_WIDTH/2;
    this.y = 442;
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

  updateBall(){
    this.x += this.dx;
    this.y -= this.dy;
    this.x = parseFloat(this.x).toFixed(5);
    this.y = parseFloat(this.y).toFixed(5);
    console.log('x',this.dx,'and y',this.dy);
  }
}