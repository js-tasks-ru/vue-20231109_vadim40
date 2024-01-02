<template>
  <UiInput
      :type="type"
      :step="step"
      :model-value="formattedModelValue"
      @input="formattedModelValue = ($event.target.valueAsNumber)"
      v-bind="$attrs"
  >
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName"/>
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',

  props: {
    type: {
      type: String,
      default: 'date'
    },
    modelValue: String,
    step: Number,
  },

  components: { UiInput },

  inheritAttrs: false,

  emits: ['update:modelValue'],

  computed: {
    formattedModelValue: {
      get() {
        if (!this.modelValue) {
          return '';
        }
        const date = new Date(this.modelValue);

        if (this.type === 'datetime-local') {
          return date.toISOString().substring(0, 16);
        } else if (this.type === 'time') {
          return date.toISOString().substring(11, 16);
        } else {
          return date.toISOString().substring(0, 10);
        }
      },

      set(value) {
        this.$emit('update:modelValue', value)
      },
    }
  },
};
</script>
