//Random number generator------------------------------------------------------------------------------------------
function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Random number generator float-------------------------------------------------------------------------------------
function getRandomFloat(max, min) {
  return (Math.random() * (max - min + 1)) + min;
}

//function for getting mouse click co-ordinates---------------------------------------------------------------------
function getMouseCoOrdinates(canvas,evt){
  let rect = canvas.getBoundingClientRect();
  let x = evt.clientX - rect.left;
  let y = evt.clientY - rect.top;
  if ( (x <= GAME_WIDTH) && (y <= (GAME_HEIGHT - BOT_HEIGHT)) && (y>=TOP_HEIGHT)){
    return true;
  }else {
    return false;
  }
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

//get x value of (x,y) in a line with known slope --------------------------------------------------------------------
function getX(y) {
  let x = ( ( (y - y1)/Math.tan(angle) ) + x1);
  return x;
}

//limiting angle for shooting the ball--------------------------------------------------------------------------------
function limitAngle(angle){
  if (angle<=LOWEST_ANGLE) {
    return LOWEST_ANGLE;
  }else {
    return angle;
  }
}

//show dotted line for shooting the ball direction--------------------------------------------------------------------
function showShootDirection(game,evt) {
  let ballX = 0;
  let ballY = 0;
  let rect = game.canvas.getBoundingClientRect();
  if(game.firstDeadBallX == null){
    ballX = game.ballsArray[0].x;
    ballY = game.ballsArray[0].y;
  }else {
    ballX = game.firstDeadBallX;
    ballY = BALL_Y_DEAD;
  }
  let pointerX = evt.clientX - rect.left;
  let pointerY = evt.clientY - rect.top;
  let lineAngle = Math.atan(Math.abs(pointerY - ballY) / Math.abs(pointerX - ballX));
  lineAngle = limitAngle(lineAngle);
}

//sets 5 to 05, 6 to 06 and so on-------------------------------------------------------------------------------------
function calc(value) {
  let valString = value + "";
  if(valString.length < 2)
  {
    return "0" + valString;
  }
  else
  {
    return valString;
  }
}

//my time calculator--------------------------------------------------------------------------------------------------
function setTime(game) {
  if (game.gameTime <= 0){
    game.gameTime = TOTAL_TIME;
  }
  --game.gameTime;
  game.gameTimeSec = calc(game.gameTime%60);
  game.gameTimeMin = calc(parseInt(game.gameTime/60));
}


