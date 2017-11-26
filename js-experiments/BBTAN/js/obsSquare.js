class ObsSquare {
  constructor(ctx,row,column) {
    this.x = (TILE_WIDTH * column) + TILE_PADDING;
    this.y = (TILE_HEIGHT * row) + TILE_PADDING + TOP_HEIGHT;
    this.level;
    this.row = row;
    this.column = column;
    this.textX = 17;//aligning font at center
    this.textY = 26;//aligning font at center
    this.ctx = ctx;
    this.ctx.strokeStyle = '#d7e163';
    this.ctx.fillStyle = '#d7e163';
    this.ctx.font = 'bold 12px Arial';
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
    this.ctx.font = 'bold 12px Arial';
    this.ctx.lineWidth = LINE_WIDTH;
    this.ctx.strokeRect(this.x,this.y,OBSTACLE_WIDTH,OBSTACLE_HEIGHT);
    this.ctx.fillText(this.level,this.textX+this.x,this.textY+this.y);
    this.ctx.closePath();
  }

  drawCollidedSquare() {
    if(this.level>99){
      this.textX -= 6;
    } else if (this.level>9){
      this.textX -= 3
    }
    this.ctx.beginPath();
    this.ctx.font = 'bold 12px Arial';
    this.ctx.strokeStyle = '#d7e163';
    this.ctx.fillStyle = '#d7e163';
    this.ctx.lineWidth = LINE_WIDTH;
    this.ctx.clearRect(this.x,this.y,OBSTACLE_WIDTH,OBSTACLE_HEIGHT);
    this.ctx.strokeRect(this.x+PADDING_SQUARE,this.y+PADDING_SQUARE,OBSTACLE_WIDTH - PADDING_SQUARE_X2,OBSTACLE_HEIGHT -PADDING_SQUARE_X2);
    this.ctx.fillText(this.level,this.textX+this.x,this.textY+this.y);
    this.ctx.closePath();
  }


//Collision detection for square and ball----------------------------------------------------------------------------
  checkCollision(ball) {
    //Find the vertical & horizontal (distX/distY) distances between the ball’s center and the square’s center
    let distX = Math.abs(ball.x - this.x - LINE_WIDTH - OBSTACLE_WIDTH / 2);
    let distY = Math.abs(ball.y - this.y - LINE_WIDTH - OBSTACLE_HEIGHT / 2);

    // If the distance is greater than ball_radius + half_Square, then they are too far apart to be colliding
    if (distX > (OBSTACLE_WIDTH / 2 + BALL_RADIUS + LINE_WIDTH)) {
      return false;
    }
    if (distY > (OBSTACLE_HEIGHT / 2 + BALL_RADIUS + LINE_WIDTH)) {
      return false;
    }

    // If the distance is less than half_Square then they are definitely colliding
    if (distX <= BALL_RADIUS+(OBSTACLE_WIDTH / 2)+LINE_WIDTH) {
      this.drawCollidedSquare();
      return true;
    }
    if (distY <= BALL_RADIUS+(OBSTACLE_HEIGHT / 2)+LINE_WIDTH) {
      this.drawCollidedSquare();
      return true;
    }

    /*Test for collision at square corner.
    -Think of a line from the square center to any square corner
    -Now extend that line by the radius of the ball
    -If the ball’s center is on that line they are colliding at exactly that square corner*/
    let dx=distX-OBSTACLE_WIDTH/2;
    let dy=distY-OBSTACLE_HEIGHT/2;
    if (dx*dx+dy*dy <= (BALL_RADIUS*BALL_RADIUS)) {
      this.drawCollidedSquare();
      return true;
    }else {
      return false;
    }

  }
}