class Obstacle {
  constructor(ctx) {
    this.x;
    this.y;
    this.ctx = ctx;
  }

  drawRectangle(row,column) {
    this.ctx.fillStyle = 'white';
    this.x = (TILE_WIDTH * column) + BOX_PADDING;
    this.y = (TILE_HEIGHT * row) + BOX_PADDING;
    this.ctx.fillRect(this.x,this.y,OBSTACLE_WIDTH,OBSTACLE_HEIGHT);
  }
}