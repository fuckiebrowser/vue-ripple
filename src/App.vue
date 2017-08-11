<template>
    <div id="app">
        <button v-ripple="{color:'#222',duration:500}">{{msg}}</button>
    </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      }
    },

    methods: {},
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
        pointer-events: none;
        border-radius: 50%;
        transform: translate3d(-50%, -50%, 0);
        animation-name: ripple;
        animation-timing-function: linear;
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
