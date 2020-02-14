var canvas = document.getElementById("game-area");
var ctx = canvas.getContext("2d");

window.requestAnimationFrame(update);

var background = new Image();
background.src = "./Background.png";

let game = new Game(canvas);

function update() {
  ctx.drawImage(background,0,0, canvas.width, canvas.height); 
  drawGround(ctx);
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
