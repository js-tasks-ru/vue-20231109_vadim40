import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
      required: true
    }
  },

  methods: {
    getIcon(type) {
      return `../../src/assets/icons/item-${agendaItemIcons[type]}.svg`
    },
    getTitle(item) {
      return item.title ? item.title : agendaItemDefaultTitles[item.type]
    }
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="getIcon(agendaItem.type)" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt + ' - ' + agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">
          {{ getTitle(agendaItem) }}
        </h3>
        <p v-if="agendaItem.type === 'talk'" class="agenda-item__talk">
          <span>{{ agendaItem.speaker }}r</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p>{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
