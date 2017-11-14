//World Object--------------------------------------------------------------------------------------------------
function World() {
    var that = this;
    this.gameOverIndex = "none";
    this.mainWrapper = document.createElement('div');
    this.mainWrapper.style.width = '414px';
    this.mainWrapper.style.height = '600px';
    this.mainWrapper.style.overflow = 'hidden';
    this.mainWrapper.style.margin = '20px auto';
    this.mainWrapper.style.backgroundRepeat = 'repeat-y';
    this.mainWrapper.style.backgroundImage = 'url("road.png")';

    document.body.appendChild(this.mainWrapper);
    this.gameOverIndex = "none";

    //dummy wrapper-----------------------------------------------------------
    this.dummyWrapper = document.createElement('div');
    this.dummyWrapper.style.width = '414px';
    this.dummyWrapper.style.height = '600px';
    this.dummyWrapper.style.overflow = 'hidden';
    this.dummyWrapper.style.position = 'relative';
    this.dummyWrapper.style.display = 'none';

    this.mainWrapper.appendChild(this.dummyWrapper);

    //Start Menu--------------------------------------------------------------
    this.startMenu = document.createElement('div');
    this.startMenu.style.width = '414px';
    this.startMenu.style.height = '600px';
    this.startMenu.style.overflow = 'hidden';
    this.startMenu.style.margin = '20px auto';
    this.startMenu.style.fontSize = '100px';
    this.startMenu.style.fontWeight = 'bold';
    this.startMenu.style.color = 'blue';
    this.startMenu.style.textAlign = 'center';
    this.startMenu.innerHTML = "ROAD RAGE!!";
    this.mainWrapper.appendChild(this.startMenu);

    //StartButton--------------------------------------------------------------
    this.startBtn = document.createElement('button');
    this.startBtn.style.width = '20%';
    this.startBtn.style.display = 'block';
    this.startBtn.innerHTML = '<strong>START GAME</strong>';
    this.startBtn.style.margin = '200px auto';
    this.startMenu.appendChild(this.startBtn);

    //Start button function------------------------------------------------------
    this.startBtn.onclick = function() {
        that.startMenu.style.display = 'none';
        that.dummyWrapper.style.display = 'block';
        that.init();
    }

    //Game Over--------------------------------------------------------------  
    this.createGameOverScreen = function() {
        this.gameOverScreen = document.createElement('div');
        this.gameOverScreen.style.width = '414px';
        this.gameOverScreen.style.height = '600px';
        this.gameOverScreen.style.overflow = 'hidden';
        this.gameOverScreen.style.margin = '20px auto';
        this.gameOverScreen.style.fontSize = '100px';
        this.gameOverScreen.style.fontWeight = 'bold';
        this.gameOverScreen.style.color = 'red';
        this.gameOverScreen.style.display = 'none';
        this.gameOverScreen.style.textAlign = 'center';
        this.gameOverScreen.style.position = 'absolute';
        this.gameOverScreen.innerHTML = 'GAME OVER';
        this.gameOverScreen.style.zIndex = '3';
        this.dummyWrapper.appendChild(this.gameOverScreen);
        //RestartButton--------------------------------------------------------------
        this.playAgainBtn = document.createElement('button');
        this.playAgainBtn.style.width = '20%';
        this.playAgainBtn.style.display = 'block';
        this.playAgainBtn.innerHTML = '<strong>Play Again</strong>';
        this.playAgainBtn.style.margin = '20px auto';
        this.playAgainBtn.style.zIndex = '3';
        this.gameOverScreen.appendChild(this.playAgainBtn);
        //Restart button function------------------------------------------------------
        this.playAgainBtn.onclick = function() {
            that.gameOverScreen.style.display = "none";
            while (that.dummyWrapper.hasChildNodes()) {
                that.dummyWrapper.removeChild(that.dummyWrapper.lastChild);
            }
            that.init();
        }
    }

    this.obstacleArray = [];

    //Initiating the world----------------------------------------------------
    this.init = function() {
        this.obstacleArray = [];
        this.gameOverIndex = 'none';
        var bgLimit = 0;
        var mainCar = new Car();
        this.createGameOverScreen();
        this.dummyWrapper.appendChild(mainCar.carImage);
        this.begin(bgLimit, mainCar);
        //defining movement
        document.onkeydown = function(event) {
            if (event.keyCode == 37) {
                mainCar.move('left');
            } else if (event.keyCode == 39) {
                mainCar.move('right');
            }
            // }else if(event.keyCode==40){
            //  mainCar.move('top',);
            // }else if(event.keyCode==38){
            //  mainCar.move('bottom');
            // }
        };
    }

    //set Interval for moving background---------------------------------------
    this.begin = function(bgLimit, mainCar) {
        var counter = 0;
        var flag = setInterval(function() {
            that.mainWrapper.style.backgroundPosition = '0px ' + bgLimit + 'px';
            bgLimit += 2;
            if (bgLimit > 828) {
                bgLimit = 0;
            }
            if (that.gameOverIndex === "game-over") {
                that.gameOver();
                that.gameOverScreen.style.display = 'block';
                clearInterval(flag);
            }
            counter += 10;
            if (counter == 1500) {
                counter = 0;
                that.addObstacle();
            }

            that.moveCar();
            that.obstacleCollision(mainCar);//removal of obstacle also in same function
            if (that.gameOverIndex === "game-over") {
                that.gameOver();
            }

        }, 10);
    }

    this.addObstacle = function() {
        var obstacle = new Obstacle();
        this.dummyWrapper.appendChild(obstacle.objImage);
        this.obstacleArray.push(obstacle);
    }

    //moving car
    this.moveCar = function() {
        var speed = 3;
        for (var i = 0; i < that.obstacleArray.length; i++) {
            that.obstacleArray[i].y += speed;
            that.obstacleArray[i].objImage.style.top = that.obstacleArray[i].y + 'px';
        }
    }

    //game-over keydown function off--------------------------------------------------------
    this.gameOver = function() {
        document.onkeydown = null;
    }

    //obstacle removal and collision detection-------------------------------------------------
    this.obstacleCollision = function(mainCar) {
        if (that.obstacleArray.length > 0) {
            if (that.obstacleArray[0].y > 600) {
                that.obstacleArray[0].removeObstacle(that.dummyWrapper);
                that.obstacleArray.splice(that.obstacleArray.indexOf(that.obstacleArray[0]), 1);
            } else {
                if (checkCollision(mainCar, that.obstacleArray[0], that.dummyWrapper)) {
                    that.gameOverIndex = "game-over";
                    that.gameOver();
                }
            }
        }
    }
}

var boom = new Explosion();

//Car Object---------------------------------------------------------------------------------------------------
function Car() {
    var that = this;
    this.position = ['54px', '161px', '265px']; //total position
    this.indexPosition = getRandomNumber(2, 0);
    this.left = this.position[this.indexPosition];
    //Car IMAGE--------------------------------------------------
    this.carImage = document.createElement('img');
    this.carImage.src = 'car-yellow.png';
    this.carImage.style.width = '84px';
    this.carImage.style.height = '130px';
    this.carImage.style.position = 'absolute';
    this.carImage.style.zIndex = '2';
    this.carImage.style.bottom = '0px';
    this.carImage.style.left = this.left;

    //movement for function---------------------------------------
    this.move = function(direction) {
        var prevPosition = this.indexPosition;
        if (direction == 'left') {
            this.indexPosition--;
            this.checkIndexPos();
        } else if (direction == 'right') {
            this.indexPosition++;
            this.checkIndexPos();
        }
        this.left = this.position[this.indexPosition];
        this.carImage.style.left = that.left;
    }

    //checking boundary of road before moving-----------------------
    this.checkIndexPos = function() {
        if (this.indexPosition < 0) {
            this.indexPosition = 0;
        } else if (this.indexPosition > 2) {
            this.indexPosition = 2;
        }
    };
}


//Random number generator------------------------------------------------------------------------------------
function getRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Objects------------------------------------------------------------------------------------------------------
function Obstacle() {
    var that = this;
    this.images = ['car-white.png', 'car-red.png', 'car-penguin.png'];
    this.carType = this.images[getRandomNumber(2, 0)];
    this.position = ['54px', '161px', '265px']; //total position
    this.indexPosition = getRandomNumber(2, 0);
    this.left = this.position[this.indexPosition];
    this.y = -130;
    //Car IMAGE--------------------------------------------------
    this.objImage = document.createElement('img');
    this.objImage.src = this.carType;
    this.objImage.style.width = '84px';
    this.objImage.style.height = '130px';
    this.objImage.style.position = 'absolute';
    this.objImage.style.top = this.y + 'px';
    this.objImage.style.left = this.left;

    this.removeObstacle = function(dummyWrapper) {
        dummyWrapper.removeChild(this.objImage);
    }
}

function Explosion() {
    var that = this;
    //BOOM IMAGE--------------------------------------------------
    this.objImage = document.createElement('img');
    this.objImage.src = 'boom.png';
    this.objImage.style.width = '130px';
    this.objImage.style.height = '150px';
    this.objImage.style.position = 'absolute';
    this.objImage.style.bottom = '0px';
    this.objImage.style.zIndex = '2';
}



//Check Collision
var checkCollision = function(mainCar, obstacle, dummyWrapper) {
    var topMainCar = 600 - 130;
    var botObstacle = parseInt(obstacle.objImage.style.getPropertyValue("top")) + 130;
    if ((topMainCar < botObstacle)) {
        if (mainCar.indexPosition == obstacle.indexPosition) {
            boom.objImage.style.left = mainCar.left;
            dummyWrapper.appendChild(boom.objImage);
            return true;
        }
    }
    return false;
}

//Game creeting world-----------------------------------------------------------------------------------------------
var createWorld = new World();

/*var resetBtn=document.createElement('button');
resetBtn.innerHTML='RESET';
document.body.appendChild(resetBtn);*/

/*collision-->(rightA>leftB)&&(leftA<rightB)&&(bottomA>topB)&&(topA<bottomB)*/