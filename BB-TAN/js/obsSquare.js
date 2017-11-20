class ObsSquare {
  constructor(ctx,row,column) {
    this.x = (TILE_WIDTH * column) + TILE_PADDING;
    this.y = (TILE_HEIGHT * row) + TILE_PADDING;
    this.level;
    this.textX = 17;//aligning font at center
    this.textY = 26;//aligning font at center
    this.ctx = ctx;
    this.ctx.strokeStyle = 'yellow';
    this.ctx.fillStyle = 'yellow';
    this.ctx.font = 'bold 12px Arial'
    this.ctx.lineWidth = LINE_WIDTH;
  }

  drawSquare(level) {
    this.level = level;
    if(this.level>99){
      this.textX -= 6;
    } else if (this.level>9){
      this.textX -= 3
    }
    this.ctx.beginPath();
    this.ctx.lineWidth = LINE_WIDTH;
    this.ctx.strokeRect(this.x,this.y,OBSTACLE_WIDTH,OBSTACLE_HEIGHT);
    this.ctx.fillText(this.level,this.textX+this.x,this.textY+this.y);
    this.ctx.closePath();
  }
}