<template>
    <div id="app">
        <button v-ripple>{{msg}}</button>
        <button v-ripple style="color:#ff6600">try</button>
    </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
  }
</script>

<style>
    /*@import './style.css';*/

    button {
        background: transparent;
        outline: none;
        border: none;
        padding: 80px 150px;
        font-size: 50px;
    }
</style>
