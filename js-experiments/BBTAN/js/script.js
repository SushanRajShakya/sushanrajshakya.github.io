//Random number generator------------------------------------------------------------------------------------------
function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Random number generator float-------------------------------------------------------------------------------------
function getRandomFloat(max, min) {
  return (Math.random() * (max - min + 1)) + min;
}


let x1,x2,y1,y2,angle;
//Ball position in canvas/game -------------------------------------------------------------------------------------
function getMousePos(canvas, evt, ball, j, game) {
  if(j == 0) {
    x1 = ball.x;
    y1 = ball.y;
    let rect = canvas.getBoundingClientRect();
    let x = evt.clientX - rect.left;
    x2 = x;
    let y = evt.clientY - rect.top;
    y2 = y;
    angle = Math.atan(Math.abs(y - ball.y) / Math.abs(x - ball.x));
    angle = limitAngle(angle);
    let dx = Math.cos(angle) * BALL_VELOCITY;
    let dy = Math.sin(angle) * BALL_VELOCITY;
    ball.dx = dx;
    angle *= -1;
    if (x - ball.x < 0) {
      ball.dx = dx * -1;
      angle *= -1;
    }
    ball.dy = dy;
  }else {
    ball.dx = game.ballsArray[0].dx;
    ball.dy = game.ballsArray[0].dy;
  }
  return ball;
}

//get x value for (x,y)
function getX(y) {
  let x = ( ( (y - y1)/Math.tan(angle) ) + x1);
  return x;
}

//limiting angle for shooting the ball--------------------------------------------------------------------------
function limitAngle(angle){
  if (angle<=LOWEST_ANGLE) {
    return LOWEST_ANGLE;
  }else {
    return angle;
  }
}


