document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowRight":
      if (!game.player.jumping) {
        game.player.accelerating = true;
        game.player.right = true;
      }
      break;
    case "ArrowLeft":
      if (!game.player.jumping) {
        game.player.accelerating = true;
        game.player.right = false;
      }
      break;
    case "ArrowUp":
      game.player.jump();
      break;
    case "ArrowDown":
      break;
    case " ":
      if (game.state === "pre") {
        game.state = "play";
      }
      break;
    default:
      break;
  }
});

document.addEventListener("keyup", e => {
  switch (e.key) {
    case "ArrowRight":
      game.player.accelerating = false;
      break;
    case "ArrowLeft":
      game.player.accelerating = false;
      break;
    case "ArrowUp":
      break;
    case "ArrowDown":
      break;
    case " ":
      break;
    default:
      break;
  }
});
