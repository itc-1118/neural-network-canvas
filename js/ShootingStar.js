// 这个类表示一个流星，包含构造函数、重置、判断流星是否消失、更新位置和绘制方法。
// 流星类的实例表示一个具有特定位置、长度、速度和角度的流星对象。在此类中，
// 我们绘制了一个带有渐变颜色和随机线宽的线段来表示流星。以下是加入中文注释的代码：
// 定义流星类
class ShootingStar {
    constructor(canvas) {
      this.canvas = canvas
      this.reset();
    }
  
    // 重置流星位置和属性
    reset() {
      const region = Math.random();
  
      if (region < 0.33) {
        // 左上
        this.x = Math.random() * this.canvas.width * 0.5;
        this.y = Math.random() * this.canvas.height * 0.3;
      } else if (region < 0.66) {
        // 右上
        this.x = Math.random() * this.canvas.width * 0.5 + this.canvas.width * 0.5;
        this.y = Math.random() * this.canvas.height * 0.3;
      } else {
        // 中间
        this.x = Math.random() * this.canvas.width * 0.5 + this.canvas.width * 0.25;
        this.y = Math.random() * this.canvas.height * 0.3;
      }
  
      this.len = Math.random() * 80 + 10;
      this.speed = Math.random() * 4 + 2;
  
      // 随机选择角度，使流星从上方向下移动
      this.angle = Math.PI / 4 + ((Math.random() - 0.5) * Math.PI) / 2;
      this.vx = Math.cos(this.angle) * this.speed;
      this.vy = Math.sin(this.angle) * this.speed;
    }
  
    // 判断流星是否消失
    isDead() {
      return this.x < 0 || this.x > this.canvas.width || this.y > this.canvas.height;
    }
  
    // 更新流星位置
    update() {
      this.x += this.vx;
      this.y += this.vy;
  
      if (this.x < 0 || this.x > this.canvas.width || this.y > this.canvas.height) {
        this.reset();
      }
    }
  
    // 绘制流星
    draw(ctx) {
      const gradient = ctx.createLinearGradient(
        this.x,
        this.y,
        this.x + this.len * Math.cos(this.angle),
        this.y + this.len * Math.sin(this.angle)
      );
  
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.5)");
  
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(
        this.x + this.len * Math.cos(this.angle),
        this.y + this.len * Math.sin(this.angle)
      );
  
      const lineWidth = Math.random() * 2 + 1; // 在 1 到 3 之间随机选择线宽
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = gradient;
      ctx.stroke();
    }
  }
  
  export default ShootingStar;