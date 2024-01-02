<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{'image-uploader__preview-loading': isLoading}"
      :style="{'--bg-url': `url('${shownImage}')`}"
    >
      <span class="image-uploader__text">{{ imageStatusText }}</span>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @change="handleFile"
        @click="!isLoading && shownImage ? clearImage() : null"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  props: {
    preview: String,
    uploader: Function
  },

  data() {
    return {
      image: this.preview,
      isLoading: false
    }
  },

  methods: {
    async handleFile(event) {
      this.isLoading = true;
      const file = event.target.files[0];
      this.$emit('select', file);

      if (this.uploader) {
        try {
          let data = await this.uploader(file);
          this.$emit('upload', data);
          this.image = URL.createObjectURL(data);
        } catch (err) {
          this.$emit('error', err);
          this.$refs.fileInput.value = null;
        }

      }
      else {
        this.image = file
      }
      this.isLoading = false;
    },
    clearImage() {
      if (this.shownImage) {
        this.$emit('remove')
        this.image = null
        this.$refs.fileInput.value = null
      }
    },
  },

  computed: {
    shownImage() {
      return this.image || this.preview
    },
    imageStatusText() {
      if (this.isLoading) {
        return 'Загрузка...'
      }
      if (this.image) {
        return 'Удалить изображение'
      } else {
        return 'Загрузить изображение'
      }
    }
  },

  emits: ['select', 'upload', 'error', 'remove'],

  inheritAttrs: false


};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
