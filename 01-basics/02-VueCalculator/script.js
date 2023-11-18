import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'App',
  data() {
    return {
      number1: 0,
      number2: 0,
      result: 0,
    };
  },
  methods: {
    calculateNumbers(action) {
      switch (action) {
        case 'sum':
          return this.number1 + this.number2
        case 'mul':
          return this.number1 * this.number2
        case 'sub':
          return this.number1 - this.number2
        case 'div':
          return this.number1 / this.number2
      }
    }
  }
})

const app = createApp(App);
const vm = app.mount('#app')

window.vm = vm
