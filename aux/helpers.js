function capNum(num, min, max) {
  if (num > max) return max;
  if (num < min) return min;
  return num;
}

function between(x, a, b) {
  return x > a && x < b;
}

function drawGround(ctx) {
  ctx.fillStyle = "rgb(156, 19, 190)";
  ctx.fillRect(0, canvas.height - groundHeight, canvas.width, canvas.height);
}

function drawText(font, text, x, y, color) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function flashFillStyle(speed, depth, color) {
  opacity = opacityDesc ? opacity - speed : opacity + speed;
  if (opacity > 1) opacityDesc = true;
  if (opacity < 1 - depth) opacityDesc = false;
  return `${color.slice(0, -2)}${opacity})`;
}
