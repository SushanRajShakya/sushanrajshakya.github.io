const TOP_HEIGHT = 60;
const BOT_HEIGHT = 114;
const BOT_BG_HEIGHT = 61;
const BOT_SCORE = BOT_HEIGHT - BOT_BG_HEIGHT;
const GAME_WIDTH = 350;
const GAME_HEIGHT = 450 + TOP_HEIGHT + BOT_HEIGHT;
const TILE_COLUMNS = 7;
const TILE_ROWS = 9;
const TILE_PADDING = 3;//for seperating the obstacles
const TILE_PAD_POWER = 12;//for separating power-ups
const TILE_PAD_SQUARE = TILE_PADDING * 2;
const TILE_WIDTH = Math.floor(GAME_WIDTH/7);
const TILE_HEIGHT = Math.floor((GAME_HEIGHT - TOP_HEIGHT - BOT_HEIGHT)/9);
const OBSTACLE_WIDTH = TILE_WIDTH - TILE_PAD_SQUARE;
const OBSTACLE_HEIGHT = TILE_HEIGHT - TILE_PAD_SQUARE;
const LINE_WIDTH = 3;
const POWER_UPS_WIDTH = OBSTACLE_WIDTH/2 + 5; //inside tile
const POWER_UPS_HEIGHT = OBSTACLE_HEIGHT/2 + 5; // inside tile
const BALL_RADIUS = 6;
const BALL_VELOCITY = 6;
const BALL_Y_DEAD = GAME_HEIGHT - BALL_RADIUS - 2 - BOT_HEIGHT;
const BALL_GAP = 30;

//Ball shooting angle limit-------------------------------------------------------------------------------------------
const LOWEST_ANGLE = 0.26;

//Sprite-Sheet locations and dimensions-------------------------------------------------------------------------------
const POWER_UPS_X = 210;
const POWER_UPS_Y = 361;
const POWER_UPS_SIZE = 29; //square image so same for height and width
const BBTAN_GAME_BOT_X = 72;
const BBTAN_GAME_BOT_Y = 361;
const BBTAN_GAME_BOT_WIDTH = 138; //for spritesheet width
const BBTAN_GAME_BOT_HEIGHT = 251; //for spritesheet height
const BBTAN_BOT_GAME_WIDTH = 73; //for canvas setting the width
const BBTAN_BOT_GAME_HEIGHT = BOT_BG_HEIGHT * 2; // for canvas setting the height

//TILE_MAPPING--------------------------------------------------------------------------------------------------------
const BLANK = 0;
const SQUARE = 1;
const TRIANGLE_BOT_LEFT = 2;
const TRIANGLE_BOT_RIGHT = 3;
const TRIANGLE_TOP_LEFT = 4;
const TRIANGLE_TOP_RIGHT = 5;
const COIN = 6;
const PLUS_BALL = 7
const POWER_HORZ = 8;
const POWER_SPLIT = 9;
const POWER_VERT = 10;
const PLUS_1 = 11;
const TOTAL_TIME = 1800; //30 mins in seconds

//dimensions for obstacles when collision occurs----------------------------------------------------------------------
const PADDING_SQUARE = 4;
const PADDING_SQUARE_X2 = PADDING_SQUARE * 2;

//co-ordinates for pause button and ques-mark-------------------------------------------------------------------------
const PAUSE_X = 10;
const PAUSE_Y = 10;
const PAUSE_WIDTH = TILE_WIDTH/1.5;
const PAUSE_GAP_X = PAUSE_X + PAUSE_WIDTH/2.6;
const PAUSE_GAP_WIDTH = 7;
const PAUSE_HEIGHT = TILE_HEIGHT/1.5;
const QUES_MARK_X = PAUSE_X + PAUSE_WIDTH + PAUSE_X + PAUSE_X/2;
const QUES_MARK_Y = TOP_HEIGHT/1.44;
const TIMERX = GAME_WIDTH/3;
const TIMERY = GAME_HEIGHT - 11;

//colors for time ----------------------------------------------------------------------------------------------------
const TIMER_COLOR = ['#e6644a','#f344bb','#7eff3e','#bd0000','#f10b1c','#eb0cc4','#9a0ceb','#1c0ceb','#43bbe7','#10c379','#0d7d05','#d2de15','#d0700a','#b51909','white'];