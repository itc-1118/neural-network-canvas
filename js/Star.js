// 这个类表示一个星星，包含构造函数和绘制方法。星星类的实例表示一个具有特定坐标、半径、频率和相位的星星对象。
// 在此类中，我们绘制了一个带有不同透明度的圆形星星。以下是加入中文注释的代码：
// 定义星星类
class Star {
    constructor(canvas) {
      // 随机生成星星的位置
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      // 随机生成星星的半径
      this.radius = Math.random() * 2;
      // 随机生成星星的频率
      this.frequency = 0.001 + Math.random() * 0.002;
      // 随机生成星星的相位
      this.phase = Math.random() * 2 * Math.PI;
    }
  
    // 绘制星星
    draw(ctx, t) {
      // 根据频率和相位计算透明度
      const opacity = 0.3 + 0.7 * Math.sin(this.frequency * t + this.phase);
  
      ctx.beginPath();
      // 以x, y为圆心，半径为radius的圆形星星
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`; // 填充颜色（白色，根据计算的透明度）
      ctx.fill();
    }
  }

  export default Star;
  