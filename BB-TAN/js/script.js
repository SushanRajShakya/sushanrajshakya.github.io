//Random number generator------------------------------------------------------------------------------------------
function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Ball position in canvas/game -------------------------------------------------------------------------------------
function getMousePos(canvas, evt, ball) {
  let rect = canvas.getBoundingClientRect();
  let angle;
  let x = evt.clientX - rect.left;
  let y = evt.clientY - rect.top;
  angle = Math.atan(Math.abs(y-ball.y)/Math.abs(x-ball.x));
  let dx = Math.cos(angle) * BALL_VELOCITY;
  let dy = Math.sin(angle) * BALL_VELOCITY;
  ball.dx = dx;
  if (x-ball.x < 0){
    ball.dx = dx * -1;
  }
  ball.dy = dy;
  return ball;
}

//Collision detection for square and ball----------------------------------------------------------------------------
function ballCollidingSquare(ball, square) {
  let distX = Math.abs(ball.x - square.x - OBSTACLE_WIDTH / 2);
  let distY = Math.abs(ball.y - square.y - OBSTACLE_HEIGHT / 2);

  if (distX > (OBSTACLE_WIDTH / 2 + BALL_RADIUS)) {
    return false;
  }
  if (distY > (OBSTACLE_HEIGHT / 2 + BALL_RADIUS)) {
    return false;
  }

  if (distX <= (OBSTACLE_WIDTH / 2)) {
    return true;
  }
  if (distY <= (OBSTACLE_HEIGHT / 2)) {
    return true;
  }
}
