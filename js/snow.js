// snow.js - Snow animation effect
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const snowflakes = [];
  const snowflakeCount = 200;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);

  function Snowflake() {
    this.x = Math.random() * width;
    this.y = Math.random() * height * -1;
    this.size = Math.random() * 3 + 1;
    this.speed = Math.random() * 1 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.3;
  }

  Snowflake.prototype.update = function() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = Math.random() * height * -1;
      this.x = Math.random() * width;
    }
  };

  Snowflake.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
    ctx.fill();
  };

  for (let i = 0; i < snowflakeCount; i++) {
    snowflakes.push(new Snowflake());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    snowflakes.forEach(function(snowflake) {
      snowflake.update();
      snowflake.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}); 