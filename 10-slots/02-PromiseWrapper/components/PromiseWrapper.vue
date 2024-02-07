<template>
    <slot name="pending" v-if="state === 'pending'"></slot>
    <slot name="fulfilled" v-else-if="state === 'fulfilled'" :result="result"></slot>
    <slot name="rejected" v-else-if="state === 'rejected'" :error="error"></slot>
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      state: null,
      result: null,
      error: null
    }
  },

  watch: {
    promise: {
      immediate: true,
      handler(promise) {
        this.state = 'pending';

        promise.then(result => {
          this.result = result;
          this.state = 'fulfilled';
        }).catch(error => {
          this.error = error;
          this.state = 'rejected';
        });
      }
    }
  }
}
</script>
