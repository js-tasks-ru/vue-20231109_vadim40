<template>
  <button @click="incrementCount">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0
    },
  },

  data() {
    return {
      localCount: this.count,
    };
  },

  watch: {
    count(newCount) {
      this.localCount = newCount;
    },
  },

  methods: {
    incrementCount() {
      this.localCount += 1;
      this.$emit('update:count', this.localCount);
    },
  },
};
</script>
