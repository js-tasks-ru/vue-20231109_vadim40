import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',

  props: {
    organizer: {
      type: String,
      required: true
    },
    place: {
      type: String,
      required: true
    },
    date: {
      type: Number,
      required: true
    }
  },

  computed: {
    localizedFormatDate() {
      return new Date(this.date).toLocaleDateString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      )
    },
    ISOFormatDate() {
      return new Date(this.date).toISOString().slice(0, 10)
    }
  },

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg"/>
        {{ organizer }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg"/>
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg"/>
        <time :datetime="ISOFormatDate">{{ localizedFormatDate }}</time>
      </li>
    </ul>`,
});
