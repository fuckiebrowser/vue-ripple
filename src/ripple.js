import './style.css';

function hexToRgb(str) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let sColor = str.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return sColorChange.join(",");
  }
  return sColor;
}

class Ripple {
  constructor(options) {
    const defaultOptions = { color: '#666', duration: 500, render: '' };
    this.options = Object.assign(defaultOptions, options);
    this.init();
  }

  init() {
    const {
      render,
      el,
      width,
      height,
    } = this.options;

    switch (render) {
      case 'canvas':
        const canvas = this.options.ripple = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        Object.assign(canvas.style, {
          position: 'absolute',
          top: 0,
          left: 0,
        });
        el.appendChild(canvas);
        break;
      default:
        break;
    }
  }

  animate(offsetX, offsetY) {
    const { ripple, color, render, el, duration, radius, width, height } = this.options;
    const diameter = 2 * radius;

    if (render === 'canvas') {
      let start = null;
      const ctx = ripple.getContext('2d');

      function draw(timestamp) {
        if (start === null) start = timestamp;

        const progress = timestamp - start;
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.arc(offsetX, offsetY, progress * diameter / duration, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${hexToRgb(color)},${1 - progress / duration})`;//半透明绿色
        ctx.fill();
        ctx.stroke();

        if (progress < duration) {
          requestAnimationFrame(draw, ripple);
        }
      }

      requestAnimationFrame(draw, ripple);
    } else {
      const ripple = document.createElement('div');
      ripple.style.background = color;
      ripple.className = 'v-ripple';

      Object.assign(ripple.style, {
        background: color,
        top: `${offsetY}px`,
        left: `${offsetX}px`,
        width: `${diameter}px`,
        height: `${diameter}px`,
        animationDuration: `${duration}ms`,
        webkitAnimationDuration: `${duration}ms`,
        mozAnimationDuration: `${duration}ms`,
      });

      el.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, duration);
    }
  }
}

const ripple = {
  inserted(el, binding) {
    const { position, overflow } = getComputedStyle(el);
    el.style.overflow = (overflow !== 'hidden') ? 'hidden' : '';
    el.style.position = (position === 'static') ? 'relative' : '';

    const { left, top, width, height } = el.getBoundingClientRect();
    const radius = height > width ? height : width;

    const ripple = new Ripple(Object.assign({ el, width, height, radius }, binding.value));

    el.addEventListener('click', (ev) => {
      const { pageX, pageY } = ev;
      const offsetX = pageX - left;
      const offsetY = pageY - top;
      ripple.animate(offsetX, offsetY);
    });
  },
};

function install(vue) {
  vue.directive('ripple', ripple);
}

export default {
  install,
};