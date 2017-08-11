import Vue from 'vue'
import App from './App.vue'

// import Ripple from '../dist/ripple';
import Ripple from './ripple';

Vue.use(Ripple);

new Vue({
  el: '#app',
  render: h => h(App)
});
