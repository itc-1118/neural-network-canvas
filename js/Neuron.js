// 这个类表示一个神经元，包含构造函数、绘制、移动和脉冲动画等方法。
// 神经元类的实例表示一个具有特定坐标、图片源、速度和频率等属性的神经元对象。
// 在此类中，我们绘制了神经元的图片，并为其添加了一个透明度较
class Neuron {
  static COLOR_ARRAY = ["rgba(8, 174, 148)", "rgba(90, 114, 239)"];
  static SPEECH_TEXT = "Hello, world!";
  static SPEECH_RECT = { width: 100, height: 40 };
  // 构造函数，传入x, y坐标和图片源
  constructor(x, y, imgSrc, canvas) {
    this.x = x;
    this.y = y;
    this.imgSrc = imgSrc;
    this.canvas = canvas;
    this.size = 35;

    this.initImage();
    this.initProperties();
  }
  // 初始化图片
  initImage() {
    this.image = new Image();
    this.image.src = this.imgSrc;
  }
  // 初始化属性
  initProperties() {
    this.frequency = this.randomInRange(0.0002, 0.003);
    this.vx = this.randomInRange(-0.5, 0.5) * 0.1;
    this.vy = this.randomInRange(-0.5, 0.5) * 0.2;
    this.colors = this.getRandomColor();
    // 是否显示图标描述的窗体
    this.isPressed = false;
    this.timer = null;
  }
  // 绘制神经元
  draw(ctx) {
    // 禁用图像平滑，以避免在缩放时出现模糊
    ctx.imageSmoothingEnabled = false;
    this.drawNeuronImage(ctx);
    this.drawBorder(ctx);
    if (this.isPressed) this.drawSpeech(ctx);
  }
  // 绘制神经元图片
  drawNeuronImage(ctx) {
    ctx.save();
    // 绘制圆周的白色边框
    ctx.beginPath();
    // 将神经元图片的透明度降低
    ctx.globalAlpha = 1;
    ctx.arc(
      this.x + this.size / 2,
      this.y + this.size / 2,
      this.size / 2,
      0,
      2 * Math.PI
    );
    ctx.clip();
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    ctx.restore();
  }
  // 绘制神经元边框
  drawBorder(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.x + this.size / 2,
      this.y + this.size / 2,
      this.size / 2,
      0,
      2 * Math.PI
    );
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.colors;
    ctx.stroke();
  }
  // 绘制对话框
  drawSpeech(ctx) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(
      this.x + this.size + 10,
      this.y + this.size / 2 - Neuron.SPEECH_RECT.height / 2,
      Neuron.SPEECH_RECT.width,
      Neuron.SPEECH_RECT.height
    );

    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.fillText(
      Neuron.SPEECH_TEXT,
      this.x + this.size + 20,
      this.y + this.size / 2
    );
  }

  getRandomColor() {
    const index = Math.floor(Math.random() * Neuron.COLOR_ARRAY.length);
    return Neuron.COLOR_ARRAY[index];
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x + this.size > this.canvas.width)
      this.vx = -this.vx;
    if (this.y < 0 || this.y + this.size > this.canvas.height)
      this.vy = -this.vy;
  }

  onPress() {
    this.isPressed = true;
    this.timer = setTimeout(() => {
      this.isPressed = false;
      this.timer = null;
    }, 3000);
  }

  onRelease() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.isPressed = false;
  }
  // 动画脉冲效果
  animatePulse(t) {
    const amplitude = 5;
    this.size = 35 + amplitude * Math.sin(this.frequency * t);
  }

  randomInRange(min, max) {
    return min + Math.random() * (max - min);
  }
}

export default Neuron;