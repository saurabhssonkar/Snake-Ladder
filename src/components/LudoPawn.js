class LudoPawn {
    constructor(ctx, x, y, color) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.color = color;
    }
  
    draw() {
      const { ctx, x, y, color } = this;
  
      // Draw the head (circle)
      ctx.beginPath();
      ctx.arc(x, y - 30, 10, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "black";
      ctx.stroke();
  
      // Draw the body (triangle)
      ctx.beginPath();
      ctx.moveTo(x - 15, y - 20); // Bottom-left
      ctx.lineTo(x + 15, y - 20); // Bottom-right
      ctx.lineTo(x, y + 20); // Top-middle
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();
  
      // Draw the base (rectangle)
      ctx.beginPath();
      ctx.rect(x - 12, y + 20, 24, 5);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
      }
  }
  
  export default LudoPawn;
  