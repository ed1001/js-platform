function capNum(num, min, max) {
  if (num > max) return max;
  if (num < min) return min;
  return num;
}

function between(x, a, b) {
  return x > a && x < b;
}

function drawBg(ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "brown";
  ctx.fillRect(0, canvas.height - groundHeight, canvas.width, canvas.height);
}

function drawText(font, text, x, y, colour) {
  ctx.font = font;
  ctx.fillStyle = colour;
  ctx.fillText(text, x, y);
}
