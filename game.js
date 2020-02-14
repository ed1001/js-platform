class Game {
  constructor(canvas) {
    this.player = new Player(playerSize, playerColor, canvas);
    this.state = "pre";
    this.canvas = canvas;
    this.restartTimer = 2 * fps;
    enemies = [];
    platforms = [new Platform(120, 430, 320, 50, "brown", ctx), 
                 new Platform(750, 430, 320, 50, "brown", ctx),
                 new Platform(430, 270, 320, 50, "brown", ctx)]
  }

  pre() {
    score = 0;
    this._drawTitle(360, 450, 400, 470);
  }

  play() {
    this._drawScores();
    drawText("20px Georgia", `Lives: ${this.player.lives}`, 50, 80, "white");


    if (enemyGenerate < 0) {
      enemies.push(new Enemy(enemySize, enemyColor, this.canvas));
      enemyGenerate = Math.floor(Math.random() * 4 * fps) + 1 * fps;
    } else {
      enemyGenerate -= 1;
    }

    this.player.collideEnv();

    platforms.forEach((platform) => {
      this.player.collidePlatform(platform)
      platform.draw(ctx);
    });
    this.player.draw(ctx);
    enemies.forEach(enemy => {
      this.player.collideEnemy(enemy)
      enemy.draw(ctx);
    });
  }
  post() {
    this._drawScores();
    drawText("80px Ariel", "GAME OVER", 360, 360, "white");
    this.restartTimer--;
    if (this.restartTimer <= 0) game = new Game(canvas);
  }

  _drawTitle() {
    drawText("130px Ariel", "Blue Buggers", 250, 240, "white");
    let color = flashFillStyle(0.05, 0.7, playerColor);
    drawText("40px Ariel", "push space to start", 450, 300, color);
  }

  _drawScores() {
    drawText("20px Georgia", `Score: ${score}`, 50, 50, "white");
    drawText("20px Georgia", `Hi-Score: ${hiScore}`, 1000, 50, "white");
  }
}
