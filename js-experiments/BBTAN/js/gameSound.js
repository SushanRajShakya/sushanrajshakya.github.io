class GameSound {
  constructor()
  {
    this.startGameflag = true;
    this.coin = new Audio('sounds/coin.mp3');
    this.powerUpLaser = new Audio('sounds/laser.mp3');
    this.powerUpSplit = new Audio('sounds/split.mp3');
    this.addBall = new Audio('sounds/addBall.mp3');
    this.pressButton = new Audio('sounds/button.mp3');
    this.gameOver = new Audio('sounds/gameover.mp3');
    this.collision = new Audio('sounds/collision.mp3');
    this.startGame = new Audio('sounds/startGame.mp3');
  }

  play(element){
    if (element == 'coin') {
      this.coin.pause();
      this.coin.currentTime = 0;
      this.coin.play();
    } else if (element == 'powerUpLaser') {
      this.powerUpLaser.pause();
      this.powerUpLaser.currentTime = 0;
      this.powerUpLaser.play();
    } else if (element == 'powerUpSplit') {
      this.powerUpSplit.pause();
      this.powerUpSplit.currentTime = 0;
      this.powerUpSplit.play();
    } else if (element == 'addBall') {
      this.addBall.pause();
      this.addBall.currentTime = 0;
      this.addBall.play();
    } else if (element == 'gameOver') {
      this.gameOver.pause();
      this.gameOver.currentTime = 0;
      this.gameOver.play();
    } else if (element == 'button') {
      this.pressButton.pause();
      this.pressButton.currentTime = 0;
      this.pressButton.play();
    } else if (element == 'collision') {
      this.collision.pause();
      this.collision.currentTime = 0;
      this.collision.play();
    } else if (element == 'startGame' && this.startGameflag) {
      this.startGame.pause();
      this.startGame.currentTime = 0;
      this.startGame.play();
      this.startGameflag = false;
    }
  }
}