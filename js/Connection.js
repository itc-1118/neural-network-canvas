// 这个类表示神经元之间的连接。它包含一个构造函数和一个绘制连接的方法。
// 连接类的实例表示一个连接两个神经元的连接对象。在此类中，我们绘制了连接两个神经元的直线，
// 并设置了线条的宽度和颜色。以下是加入中文注释的代码：

class Connection {
  // 构造函数，传入两个神经元对象
  constructor(neuron1, neuron2) {
    this.neuron1 = neuron1;
    this.neuron2 = neuron2;
  }

  // 绘制连接
  draw(ctx) {
    ctx.imageSmoothingEnabled = true;
    ctx.beginPath();
    // 移动到第一个神经元的中心点
    ctx.moveTo(
      this.neuron1.x + this.neuron1.size / 2,
      this.neuron1.y + this.neuron1.size / 2
    );
    // 连接到第二个神经元的中心点
    ctx.lineTo(
      this.neuron2.x + this.neuron2.size / 2,
      this.neuron2.y + this.neuron2.size / 2
    );
    ctx.lineWidth = 0.5; // 设置线条宽度
    ctx.strokeStyle = "rgba(255, 255, 255, .85)"; // 设置线条颜色（灰色，20%透明度）
    ctx.strokeStyle = "smooth";
    ctx.stroke(); // 绘制线条
  }
}

export default Connection;
