class Player {
  constructor(size, color, ctx, canvas) {
    this.size = size;
    this.color = color;
    this.x = canvas.width / 2;
    this.ground = canvas.height - groundHeight - size;
    this.rightBound = canvas.width - this.size;
    this.y = this.ground;
    this.vx = 0;
    this.vy = 0;
    this.canvas = canvas;
    this.ctx = ctx;
    this.maxSpeed = 10;
    this.acceleration = 3;
    this.accelerating = false;
    this.jumpStrength = 30;
    this.bopStrength = 10;
    this.jumping = false;
    this.right = true;
  }

  draw(ctx) {
    const c = this.canvas;
    const s = this.size;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, s, s);
    this.translate();
    this.collideEnemy();
  }

  applyAcceleration() {
    this.vx = capNum(this.vx + (this.right ? this.acceleration : -this.acceleration), -this.maxSpeed, this.maxSpeed);
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

  collideEnemy() {
    enemies.forEach(enemy => {
      if (between(this.x, enemy.x - this.size, enemy.x + enemy.size)) {
        if (this.y > enemy.y - this.size + 5) {
          this.killPlayer();
        } else if (this.y > enemy.y - this.size) {
          this.killEnemy(enemy);
          score += 1;
        }
      }
    });
  }

  killEnemy(enemy) {
    enemies.splice(enemies.indexOf(enemy), 1);
    this.vy = -this.bopStrength;
  }

  killPlayer() {
    console.log("DEAD");
  }

  jump() {
    if (!this.jumping) {
      this.vy -= this.jumpStrength;
      this.jumping = true;
    }
  }
}
