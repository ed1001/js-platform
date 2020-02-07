class Game {
  constructor(ctx, canvas) {
    this.player = new Player(playerSize, playerColor, ctx, canvas);
    this.state = "pre";
  }

  pre() {
    this.score = 0;
    this._drawTitle(360, 450, 400, 470);
  }

  play() {
    drawText("20px Georgia", `Score: ${this.score}`, 50, 50);
    drawText("20px Georgia", `Hi-Score: ${hiScore}`, 1000, 50);

    if (enemyGenerate < 0) {
      enemies.push(new Enemy(enemySize, enemyColor, this.ctx, this.canvas));
      enemyGenerate = Math.floor(Math.random() * 4000) + 3000;
    } else {
      enemyGenerate -= 1;
    }

    this.player.draw(ctx);
    enemies.forEach(enemy => {
      enemy.draw(ctx);
    });
  }
  post() {
    drawText("20px Georgia", `Score: ${this.score}`, 50, 50);
    drawText("20px Georgia", `Hi-Score: ${hiScore}`, 1000, 50);
    drawText("80px Ariel", "GAME OVER", 360, 360);
    this.restartTimer--;
    if (this.restartTimer <= 0) game = new Game();
  }

  _drawTitle() {
    drawText("130px Ariel", "Blue Buggers", 250, 240, "blue");
    drawText("40px Ariel", "push space to start", 450, 300, "blue");
  }
}
