<template>
    <div id="app">
        <button v-ripple="{color:'#222',duration:1000,render:'canvas'}">{{msg}}</button>
    </div>
</template>

<script>


  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',

        offsetX: 0,
        offsetY: 0,
        quene: [],
      }
    },

    methods: {
      ripple(ev) {
        const { offsetX, offsetY } = ev;
        const target = { offsetX, offsetY };
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');

        // 1862
        // 动画时间500ms
        const duration = 500;
        // 渲染次数
        const renderTimes = 500 / 1000 * 60;

        let start = null;

        function draw(timestamp) {
          if (start === null) start = timestamp;
          const progress = timestamp - start;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();
          ctx.arc(offsetX, offsetY, progress * 1862 / duration, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(${HexToRgb('#222')},${1 - progress / duration})`;//半透明绿色
          ctx.fill();
          ctx.stroke();

          if (progress < duration) {
            requestAnimationFrame(draw, canvas);
          }
        }

        requestAnimationFrame(draw, canvas);
      },
    },
  }
</script>

<style>
    button {
        background: transparent;
        outline: none;
        border: none;
        padding: 80px 150px;
        font-size: 50px;
    }

    .v-ripple {
        position: absolute;
        z-index: -1;
        pointer-events: none;
        border-radius: 50%;
        transform: translate3d(-50%, -50%, 0);
        animation-name: ripple;
        animation-timing-function: ease-out;
        opacity: 0;
    }

    @keyframes ripple {
        from {
            transform: translate3d(-50%, -50%, 0) scale(0, 0);
            opacity: 1;
        }
        to {
            transform: translate3d(-50%, -50%, 0) scale(1, 1);
            opacity: 0;
        }
    }
</style>
