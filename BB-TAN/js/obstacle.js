class Obstacle {
  constructor(ctx,row,column) {
    this.x = (TILE_WIDTH * column) + TILE_PADDING;
    this.y = (TILE_HEIGHT * row) + TILE_PADDING;
    this.ctx = ctx;
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = LINE_WIDTH;
  }

  drawRectangle() {
    this.ctx.beginPath();
    this.ctx.lineWidth = LINE_WIDTH;
    this.ctx.strokeRect(this.x,this.y,OBSTACLE_WIDTH,OBSTACLE_HEIGHT);
    this.ctx.closePath();
  }

  drawTriangle1() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x,this.y);
    this.ctx.lineTo(this.x,this.y + OBSTACLE_HEIGHT);
    this.ctx.lineTo(this.x + OBSTACLE_WIDTH, this.y + OBSTACLE_HEIGHT);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  drawTriangle2() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x + OBSTACLE_WIDTH,this.y);
    this.ctx.lineTo(this.x,this.y + OBSTACLE_HEIGHT);
    this.ctx.lineTo(this.x + OBSTACLE_WIDTH, this.y + OBSTACLE_HEIGHT);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  drawTriangle3() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x,this.y);
    this.ctx.lineTo(this.x + OBSTACLE_WIDTH,this.y + OBSTACLE_HEIGHT);
    this.ctx.lineTo(this.x + OBSTACLE_WIDTH,this.y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  drawTriangle4() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x,this.y);
    this.ctx.lineTo(this.x + OBSTACLE_WIDTH,this.y);
    this.ctx.lineTo(this.x,this.y + OBSTACLE_HEIGHT);
    this.ctx.closePath();
    this.ctx.stroke();
  }
}