class Ripple {
  constructor(options) {
    const defaultOptions = {
      color: '#666',
      duration: 500,
    };
    this.options = Object.assign(defaultOptions, options);

    const ripple = this.ripple = document.createElement('div');
    const { offsetX, offsetY, radius, color, duration } = this.options;
    ripple.className = 'v-ripple';
    ripple.style.width = 2 * radius + 'px';
    ripple.style.height = 2 * radius + 'px';
    ripple.style.background = color;
    ripple.style.left = offsetX + 'px';
    ripple.style.top = offsetY + 'px';

    ripple.style.animationDuration =
      ripple.style.webkitAnimationDuration =
        ripple.style.mozAnimationDuration = `${duration}ms`;

    this.animate();
  }

  animate() {
    const ripple = this.ripple;
    const { el, duration } = this.options;
    el.prepend(ripple);

    setTimeout(() => {
      el.removeChild(ripple);
    }, duration);
  }
}

const ripple = {
  inserted(el, binding, vnode) {
    const { position, overflow } = getComputedStyle(el);

    el.style.overflow = (overflow !== 'hidden') ? 'hidden' : '';
    el.style.position = (position === 'static') ? 'relative' : '';

    const { offsetHeight, clientHeight, offsetWidth, clientWidth } = el;
    const height = offsetHeight || clientHeight;
    const width = offsetWidth || clientWidth;
    const radius = height > width ? height : width;

    el.addEventListener('click', (ev) => {
      const { offsetX, offsetY } = ev;
      new Ripple(Object.assign({ el, offsetX, offsetY, radius }, binding.value));
    });
  }
};

function install(vue) {
  vue.directive('ripple', ripple);
}

module.exports = {
  install,
};