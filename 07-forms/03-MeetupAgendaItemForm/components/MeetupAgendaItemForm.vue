<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <UiIcon icon="trash"/>
    </button>

    <UiFormGroup>
      <UiDropdown title="Тип" :options="$options.agendaItemTypeOptions" name="type" v-model="localAgendaItem.type"/>
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput
            type="time"
            placeholder="00:00"
            name="startsAt"
            v-model="localAgendaItem.startsAt"
          />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput type="time" placeholder="00:00" name="endsAt" v-model="localAgendaItem.endsAt"/>
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup v-for="field in additionalFields" :label="field.label">
      <UiInput :multiline="field.name === 'description'" :name="field.name" v-model="localAgendaItem[field.model]"/>
    </UiFormGroup>
    <UiFormGroup v-if="localAgendaItem.type === 'talk'" label="Язык">
      <UiDropdown
        title="Язык"
        :options="$options.talkLanguageOptions"
        name="language"
        v-model="localAgendaItem.language"
      />
    </UiFormGroup>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  {value: null, text: 'Не указано'},
  {value: 'RU', text: 'RU'},
  {value: 'EN', text: 'EN'},
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: {UiIcon, UiFormGroup, UiInput, UiDropdown},

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localAgendaItem: {...this.agendaItem}
    }
  },

  watch: {
    clonedLocalAgendaItem: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal.startsAt !== oldVal.startsAt && oldVal.endsAt) {
          const startsAtDiffInMS = new Date(`1970-01-01T${oldVal.endsAt}`).getTime() -
            new Date(`1970-01-01T${oldVal.startsAt}`).getTime();
          if (startsAtDiffInMS !== 0) {
            const newEndsAt = new Date(new Date(`1970-01-01T${newVal.startsAt}`).getTime() + startsAtDiffInMS);
            this.localAgendaItem.endsAt = newEndsAt.toLocaleString().substring(12, 17);
          }
        }
        console.log('tut')
        this.$emit('update:agendaItem', {...newVal});
      },
    },
  },

  computed: {
    clonedLocalAgendaItem() {
      return {...this.localAgendaItem}
    },

    additionalFields() {
      let fields = [{
        label: 'Нестандартный текст (необязательно)',
        name: 'title',
        model: this.localAgendaItem.title
      }]
      if (this.localAgendaItem.type === 'talk' || this.localAgendaItem.type === 'other') {
        console.log('inside double condition')
        fields = [{
          label: 'Описание',
          name: 'description',
          model: 'description'
        }]
        if (this.localAgendaItem.type === 'talk') {
        console.log('inside talk condition')

          fields = fields.concat(
            [{
              label: 'Тема',
              name: 'title',
              model: 'title'
            },
              {
                label: 'Докладчик',
                name: 'speaker',
                model: 'speaker'
              },]
          )
        } else {
        console.log('inside other condition')

          fields.push(
            {
              label: 'Заголовок',
              name: 'title',
              model: 'title'
            },
          )
        }
      }
      return fields
    }
  },

  emits: ['remove', 'update:agendaItem']
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
