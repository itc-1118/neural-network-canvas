// 这个类表示一个粒子，包含构造函数、绘制和移动方法。粒子类的实例表示一个具有特定坐标和速度的粒子对象。
// 在此类中，我们绘制了一个小圆作为粒子，并设置了填充颜色。以下是加入中文注释的代码：
class Particle {
  // 构造函数，传入x, y坐标
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
  }

  // 绘制粒子
  draw(ctx) {
    ctx.beginPath();
    // 以x, y为圆心，半径为1的圆形粒子
    ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; // 填充颜色（白色，50%透明度）
    ctx.fill();
  }

  // 移动粒子
  move() {
    this.x += this.vx;
    this.y += this.vy;

    // 保持粒子在画布边界内
    if (this.x < 0 || this.x > canvas.width) {
      this.vx = -this.vx;
    }
    if (this.y < 0 || this.y > canvas.height) {
      this.vy = -this.vy;
    }
  }
}

export default Particle;