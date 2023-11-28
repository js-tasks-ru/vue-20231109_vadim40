import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'App',
  data() {
    return {
      number1: 0,
      number2: 0,
      result: 0,
      operation: undefined
    };
  },

  computed: {
    calculatedResult() {
      switch (this.operation) {
        case 'sum':
          return this.number1 + this.number2
        case 'multiply':
          return this.number1 * this.number2
        case 'subtract':
          return this.number1 - this.number2
        case 'divide':
          return this.number1 / this.number2
        default:
          return 0
      }
    }
  }
})

createApp(App).mount('#app');
