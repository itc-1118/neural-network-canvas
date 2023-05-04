import Connection from "./Connection.js";
import Neuron from "./Neuron.js";
import Particle from "./Particle.js";
import ShootingStar from "./ShootingStar.js";
import Star from "./Star.js";
class NeuralNetworkAnimation {
  constructor(canvasId) {
    // 获取画布元素并设置上下文
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    // 设置画布大小
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // 初始化 backgroundImage 和 backgroundImageLoaded 属性
    this.backgroundImage = null;
    this.backgroundImageLoaded = false;

    // 初始化背景图片
    this.initBackgroundImage("https://i.postimg.cc/0jd3258t/bg.png");

    // 初始化神经元、连接、用户图片
    this.neurons = [];
    this.connections = [];
    this.userImages = [
      "https://i.postimg.cc/ZK42sNcX/user1.png",
      "https://i.postimg.cc/v8WCvhWW/user2.png",
      "https://i.postimg.cc/wT2PCB4M/user3.png",
      "https://i.postimg.cc/CxKtSV9N/user4.png",
    ];

    // 初始化星星、流星、粒子
    this.stars = [];
    this.shootingStars = [];
    this.particles = [];
    this.activeNeuron = null;
    // 创建星星
    this.createStars();
    // 创建流星
    const shootingStar = new ShootingStar(this.canvas);
    this.shootingStars.push(shootingStar);
    // 创建神经元
    this.createNeurons();
    // 创建连接
    this.createConnections();
    // 开始动画
    this.animate();

    // 添加触摸事件监听器
    this.canvas.addEventListener(
      "touchstart",
      (e) => this.touchStart(e),
      false
    );
    this.canvas.addEventListener("touchmove", (e) => this.touchMove(e), false);
    this.canvas.addEventListener("touchend", (e) => this.touchEnd(e), false);
  }

  // 创建粒子
  createParticles() {
    // 设置粒子数量
    const numParticles = 50;

    // 遍历创建粒子
    for (let i = 0; i < numParticles; i++) {
      // 随机生成粒子的 x 和 y 坐标
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;

      // 创建粒子实例
      const particle = new Particle(x, y);

      // 将粒子添加到粒子数组
      this.particles.push(particle);
    }
  }

  // 动画粒子
  animateParticles() {
    // 遍历粒子数组
    for (const particle of this.particles) {
      // 绘制粒子
      particle.draw(this.ctx);

      // 移动粒子
      particle.move();
    }
  }

  // 创建神经元
  createNeurons() {
    // 设置神经元总数
    const totalNeurons = 30;
    // 设置边距
    const padding = 10;
    // 计算可用宽度和高度
    const availableWidth = this.canvas.width - padding * 2;
    const availableHeight = this.canvas.height - padding * 2;

    // 遍历创建神经元
    for (let i = 0; i < totalNeurons; i++) {
      let x, y;

      // 70% 的概率让神经元在两边
      if (Math.random() < 0.7) {
        x =
          Math.random() < 0.5
            ? Math.random() * (availableWidth * 0.25) + padding
            : Math.random() * (availableWidth * 0.25) + availableWidth * 0.75;
      } else {
        // 30% 的概率让神经元在中间
        x = Math.random() * (availableWidth * 0.5) + availableWidth * 0.25;
      }

      // 80% 的概率让神经元向上汇集
      if (Math.random() < 0.8) {
        y = Math.random() * (availableHeight / 2) + padding;
      } else {
        // 20% 的概率让神经元在下半部分
        y =
          Math.random() * (availableHeight / 2) + availableHeight / 2 + padding;
      }

      // 随机选择图片资源
      const imgSrc =
        this.userImages[Math.floor(Math.random() * this.userImages.length)];

      // 创建神经元实例
      const neuron = new Neuron(x, y, imgSrc, this.canvas);

      // 将神经元添加到神经元数组
      this.neurons.push(neuron);
    }
  }

  // 绘制背景
  // drawBackground() {
  //   // 计算背景渐变的中心点
  //   const centerX = this.canvas.width / 2;
  //   const centerY = this.canvas.height / 3;

  //   // 创建径向渐变
  //   const gradient = this.ctx.createRadialGradient(
  //     centerX,
  //     centerY,
  //     50,
  //     centerX,
  //     centerY,
  //     this.canvas.width / 1.5
  //   );

  //   // 添加渐变色
  //   gradient.addColorStop(0, "rgba(0, 20, 50, 1)");
  //   gradient.addColorStop(1, "rgba(0, 0, 30, 1)");

  //   // 设置渐变为填充样式并绘制矩形
  //   this.ctx.fillStyle = gradient;
  //   this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  // }

  // 初始化背景图片
  initBackgroundImage(imgSrc) {
    this.backgroundImage = new Image();
    this.backgroundImage.src = imgSrc;
    this.backgroundImage.onload = () => {
      // 图片加载完成后，将标志设置为 true，以便在 drawBackground 方法中绘制
      this.backgroundImageLoaded = true;
    };
  }
  // 绘制背景
  drawBackground() {
    if (this.backgroundImageLoaded) {
      this.ctx.drawImage(
        this.backgroundImage,
        0,
        0,
        this.backgroundImage.width,
        this.backgroundImage.height,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }
  }

  // 创建连接
  createConnections() {
    // 遍历神经元数组并创建连接
    for (let i = 1; i < this.neurons.length; i++) {
      // 创建连接实例
      const connection = new Connection(this.neurons[i - 1], this.neurons[i]);
      // 将连接添加到连接数组
      this.connections.push(connection);
    }
  }

  // 创建星星
  createStars() {
    const numStars = 100;
    // 循环创建星星实例并添加到 stars 数组
    for (let i = 0; i < numStars; i++) {
      const star = new Star(this.canvas);
      this.stars.push(star);
    }
  }

  // 动画绘制星星
  animateStars(t) {
    // 遍历 stars 数组，调用每个星星的 draw 方法进行绘制
    for (const star of this.stars) {
      star.draw(this.ctx, t);
    }
  }

  // 动画绘制流星
  animateShootingStars() {
    // 0.01% 的概率生成新的流星
    if (Math.random() < 0.000001) {
      const shootingStar = new ShootingStar(this.canvas);
      this.shootingStars.push(shootingStar);
    }
    // 遍历 shootingStars 数组，更新并绘制每个流星
    for (let i = 0; i < this.shootingStars.length; i++) {
      const shootingStar = this.shootingStars[i];
      shootingStar.update();
      shootingStar.draw(this.ctx);

      // 如果流星消失，从数组中移除
      if (shootingStar.isDead()) {
        this.shootingStars.splice(i, 1);
        i--;
      }
    }
  }

  // 动画主函数
  animate(t) {
    // 清除画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // 绘制背景渐变色
    this.drawBackground(this.ctx);
    // 绘制星星
    this.animateStars(t);
    // 绘制流星
    this.animateShootingStars();
    // 绘制神经元间的连接
    for (const connection of this.connections) {
      connection.draw(this.ctx);
    }
    // 绘制神经元并进行动画处理
    for (const neuron of this.neurons) {
      neuron.draw(this.ctx);
      neuron.animatePulse(t);
      neuron.move();
    }

    // 递归调用 requestAnimationFrame 更新动画
    requestAnimationFrame((t) => {
      this.animate(t);
    });
  }

  touchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    for (const neuron of this.neurons) {
      const dx = x - (neuron.x + neuron.size / 2);
      const dy = y - (neuron.y + neuron.size / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < neuron.size / 2) {
        this.activeNeuron = neuron;
        break;
      }
    }
  }

  touchMove(e) {
    e.preventDefault();
    if (this.activeNeuron) {
      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      this.activeNeuron.x = x - this.activeNeuron.size / 2;
      this.activeNeuron.y = y - this.activeNeuron.size / 2;
    }
  }

  touchEnd(e) {
    e.preventDefault();
    this.activeNeuron = null;
  }
}

export default NeuralNetworkAnimation;
