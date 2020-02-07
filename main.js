var canvas = document.getElementById("game-area");
var ctx = canvas.getContext("2d");

window.requestAnimationFrame(update);

const game = new Game(ctx, canvas);

function update() {
  drawBg(ctx);

  switch (game.state) {
    case "pre":
      game.pre();
      break;
    case "play":
      game.play();
      break;
    case "post":
      game.post();
      break;
  }

  window.requestAnimationFrame(update);
}
