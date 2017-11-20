//Random number generator------------------------------------------------------------------------------------
function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//BBTAN canvas rectangle -------------------------------------------------------------------------------------
function getMousePos(canvas, evt, ball) {
  let rect = canvas.getBoundingClientRect();
  let angle;
  let x = evt.clientX - rect.left;
  let y = evt.clientY - rect.top;
  angle = Math.atan(Math.abs(y-ball.y)/Math.abs(x-ball.x));
  let dx = parseFloat(Math.cos(angle) * BALL_VELOCITY).toFixed(5);
  let dy = parseFloat(Math.sin(angle) * BALL_VELOCITY).toFixed(5);
  ball.dx = dx;
  if (x-ball.x < 0){
    ball.dx = -dx;
  }
  ball.dy = dy;
  return ball;
}
