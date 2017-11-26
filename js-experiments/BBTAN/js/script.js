//Random number generator------------------------------------------------------------------------------------------
function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Random number generator float-------------------------------------------------------------------------------------
function getRandomFloat(max, min) {
  return (Math.random() * (max - min + 1)) + min;
}

//function for getting shoot co-ordinates---------------------------------------------------------------------
function getShootCoOrdinates(canvas, evt){
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
function setShootingAngle(canvas, evt, ball, j, game) {
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

//get mouse co-ordinates for various operations-----------------------------------------------------------------------
function checkCoOrdinates(canvas, evt){
  let rect = canvas.getBoundingClientRect();
  let x = evt.clientX - rect.left;
  let y = evt.clientY - rect.top;
  if (x>=PAUSE_X && y>=PAUSE_Y && x<=(PAUSE_WIDTH+PAUSE_X) && y<=(PAUSE_Y+PAUSE_HEIGHT)) {
    return 'paused';
  }else if(x>=RESUME_X && y>=RESUME_Y && x<=(RESUME_WIDTH+RESUME_X) && y<=(RESUME_Y+RESUME_HEIGHT)){
    return 'resumed';
  }else if(x>=RESTART_X && y>=RESTART_Y && x<=(RESTART_WIDTH+RESTART_X) && y<=(RESTART_Y+RESTART_HEIGHT)){
    return 'restart';
  }else if(x>=MAIN_MENU_X && y>=MAIN_MENU_Y && x<=(MAIN_MENU_WIDTH+MAIN_MENU_X) && y<=(MAIN_MENU_Y+MAIN_MENU_HEIGHT)){
    return 'start-menu';
  }else if(x>=PLAY_BTN_GAME_X && y>=PLAY_BTN_GAME_Y && x<=(PLAY_BTN_GAME_WIDTH+PLAY_BTN_GAME_X) && y<=(PLAY_BTN_GAME_Y+PLAY_BTN_GAME_HEIGHT)) {
    return 'play';
  }
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


