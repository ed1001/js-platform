class Platform {
  constructor(x, y, w, h, color) {
    this.x = x,
    this.y = y,
    this.w = w,
    this.h = h,
    this.color = color
  }

  draw(ctx) {
    const w = this.w;
    const h = this.h;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, w, h);
  }
}
