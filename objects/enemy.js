class Enemy extends Player {
  constructor(size, color, canvas) {
    super(size, color, canvas);
    this.x = canvas.width + size * 2;
    this.vx = -4;
  }

  translate() {
    this.x += this.vx;
    this.y += this.vy;
    this.collideEnv();
  }

  collideEnv() {
    if (this.y > this.ground) {
      this.y = this.ground;
      this.vy = 0;
      this.jumping = false;
    }
  }

  collideEnemy() {}
}
