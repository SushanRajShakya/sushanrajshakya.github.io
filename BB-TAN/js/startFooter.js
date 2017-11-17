class StartFooter {
  constructor(ctx) {
    this.x = 10;
    this.y = 647;
    this.dx = 3;
    this.value = 'WHAT HAPPENS AFTER 30M..';
    this.ctx = ctx;
  }

  draw() {
    this.ctx.font = 'bold 48px SquareFont';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(this.value ,this.x ,this.y);
  }

  update(){
    this.x -= this.dx;
  }
}