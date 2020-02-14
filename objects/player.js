class Player {
  constructor(size, color, canvas) {
    this.size = size;
    this.color = color;
    this.x = canvas.width / 2;
    this.ground = canvas.height - groundHeight - size;
    this.rightBound = canvas.width - this.size;
    this.y = this.ground;
    this.prevY = this.y;
    this.prevX = this.x;
    this.vx = 0;
    this.vy = 0;
    this.lives = 3;
    this.canvas = canvas;
    this.maxSpeed = 10;
    this.acceleration = 3;
    this.accelerating = false;
    this.jumpStrength = 30;
    this.bopStrength = 10;
    this.jumping = false;
    this.right = true;
    this.invulnerable = false;
    this.opacity = 1;
  }

  draw(ctx) {
    let color = this.invulnerable ? flashFillStyle(0.1, 1, this.color) : this.color;
    ctx.fillStyle = color;
    const s = this.size;
    ctx.fillRect(this.x, this.y, s, s);
    this.translate();
  }

  applyAcceleration() {
    const acc = this.jumping ? this.acceleration / 5 : this.acceleration;
    this.vx = capNum(this.vx + (this.right ? acc : -acc), -this.maxSpeed, this.maxSpeed);
  }

  applyResistance() {
    const resistance = this.jumping ? airResistance : friction;
    if (this.right) {
      this.vx = capNum(this.vx - resistance, 0, this.maxSpeed);
    } else {
      this.vx = capNum(this.vx + resistance, -this.maxSpeed, 0);
    }
  }

  translate() {
    if (this.accelerating) {
      this.applyAcceleration();
    } else {
      this.applyResistance();
    }
    this.prevY = this.y;
    this.vy += gravity;
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
    if (this.x > this.rightBound) {
      this.x = this.rightBound;
      this.vx = 0;
    }
    if (this.x < 0) {
      this.x = 0;
      this.vx = 0;
    }
  }

  collidePlatform(platform) {
    const leftBound = platform.x - this.size;
    const rightBound = platform.x + platform.w;
    const upperBound = platform.y - this.size;
    const lowerBound = platform.y + platform.h;
    if (between(this.x, leftBound, rightBound)) {
      if (between(lowerBound, this.y, this.prevY)) {
        this.y = platform.y + platform.h;
        this.vy = 0;
      } else if (this.vy >= 0 && between(this.y + this.size, platform.y, platform.y + platform.h)) {
        this.y = platform.y - this.size;
        this.vy = 0;
        this.jumping = false;
      }
    }
    // if (between(this.y, upperBound, lowerBound)) {
    //   if (between(leftBound, this.prevX, this.x)) {
    //     this.x = leftBound;
    //     this.vx = 0;
    //   }
    // }

  }

  collideEnemy(enemy) {
    const leftBound = enemy.x - this.size;
    const rightBound = enemy.x + enemy.size;
    const upperBound = enemy.y - this.size;
    const lowerBound = enemy.y + enemy.size;
    if (
      between(this.x, leftBound, rightBound) &&
      between(this.y, upperBound, lowerBound)
    ) {
      if (between(upperBound, this.prevY, this.y)) {
        this.killEnemy(enemy);
      } else if (!this.invulnerable) {
        this.reset();
      }
    }
  }

  killEnemy(enemy) {
    enemies.splice(enemies.indexOf(enemy), 1);
    this.vy = -this.bopStrength;
    score += 1;
    if (score > hiScore) hiScore = score;
  }

  reset() {
    this.lives--;
    if (this.lives === 0) {
      game.state = "post";
    } else {
      this.x = canvas.width / 2;
      this.y = canvas.width / 2;
      this.y = this.ground;
      this.invulnerable = true;
      setTimeout(() => {
        this.invulnerable = false;
      }, 3000);
    }
  }

  jump() {
    if (!this.jumping) {
      this.vy -= this.jumpStrength;
      this.jumping = true;
    }
  }
}
