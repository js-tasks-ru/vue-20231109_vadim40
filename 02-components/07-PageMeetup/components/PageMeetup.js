import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from "../../06-MeetupView/components/MeetupView";

export default defineComponent({
  name: 'PageMeetup',

  components: {
    MeetupView,
    UiAlert,
    UiContainer,
  },

  data() {
    return {
      meetup: null,
      isLoading: false,
      error: null,
    };
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },



  created() {
    this.getMeetup(this.meetupId);
  },

  watch: {
    "meetupId": {
      async handler(newId, oldId) {
        this.getMeetup(newId);
      }
    }
  },

  methods: {
    async getMeetup(id) {
      this.isLoading = true;
      this.error = null;
      try {
        this.meetup = await fetchMeetupById(id);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },

  template: `
    <div class="page-meetup">
      <UiContainer v-if="isLoading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>
      <UiContainer v-else-if="error">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
      <MeetupView v-else :meetup="meetup"/>
    </div>`,
});
