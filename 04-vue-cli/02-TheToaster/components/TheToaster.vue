<template>
  <div class="toasts">
    <UiToast
      v-for="(toast, index) in toasts"
      :key="`toast_${index}`"
      :message="toast.message"
      :type="toast.type"
    />
  </div>
</template>

<script>
import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    success(message) {
      this.toasts.push({message: message, type: 'success'});
      this.removeToastAfterTimeout();
    },

    error(message) {
      this.toasts.push({message: message, type: 'error'});
      this.removeToastAfterTimeout();
    },

    removeToastAfterTimeout() {
      setTimeout(() => {
        this.toasts.shift();
      }, 5000);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
