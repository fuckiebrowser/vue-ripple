class Ripple {
  constructor(options) {
    const defaultOptions = {
      color: '#666',
      duration: 500,
    };
    this.options = Object.assign(defaultOptions, options);

    const ripple = document.createElement('div');
    const { offsetX, offsetY, radius, color, duration } = this.options;

    ripple.className = 'v-ripple';
    ripple.style.width = `${2 * radius}px`;
    ripple.style.height = `${2 * radius}px`;
    ripple.style.background = color;
    ripple.style.left = `${offsetX}px`;
    ripple.style.top = `${offsetY}px`;

    const dur = `${duration}ms`;
    ripple.style.animationDuration = dur;
    ripple.style.webkitAnimationDuration = dur;
    ripple.style.mozAnimationDuration = dur;

    this.ripple = ripple;
    this.animate();
  }

  animate() {
    const ripple = this.ripple;
    const { el, duration } = this.options;
    el.appendChild(ripple);

    setTimeout(() => {
      el.removeChild(ripple);
    }, duration);
  }
}

const ripple = {
  inserted(el, binding) {
    const { position, overflow } = getComputedStyle(el);

    el.style.overflow = (overflow !== 'hidden') ? 'hidden' : '';
    el.style.position = (position === 'static') ? 'relative' : '';

    const { left, top, width, height } = el.getBoundingClientRect();
    const radius = height > width ? height : width;

    el.addEventListener('click', (ev) => {
      const { pageX, pageY } = ev;
      const offsetX = pageX - left;
      const offsetY = pageY - top;
      new Ripple(Object.assign({ el, offsetX, offsetY, radius }, binding.value));
    });
  },
};

function install(vue) {
  vue.directive('ripple', ripple);
}

export default {
  install,
};
