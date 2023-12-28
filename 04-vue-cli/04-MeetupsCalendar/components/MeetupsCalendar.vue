<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="decreaseMonth()"
        >
        </button>
        <div class="calendar-view__date"> {{ selectedDate }}</div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="increaseMonth()"
        >
        </button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        v-for="cell in calendar"
        class="calendar-view__cell"
        :class="{'calendar-view__cell_inactive': cell.inactive}"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ cell.number }}</div>
        <div class="calendar-view__cell-content"></div>
        <a v-for="meetup in cell.meetups" :href="'/meetups/' + meetups.id" class="calendar-event"> {{ meetup.title }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',

  data() {
    return {
      'date': new Date(),
    }
  },

  created() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  },

  methods: {
    increaseMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() + 1));
    },
    decreaseMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() - 1))
    },
  },

  computed: {
    selectedDate() {
      return this.date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      })
    },
    monthsFirstWeekday() {
      return new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    },
    monthsTotalNumberOfDays() {
      return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()
    },

    calendar() {
      let calendarCells = []
      let i = 1
      while (i <= 35) {
        let dayDate = undefined
        let dayNumber = i
        let offset = 0
        let inactive = false

        if (i <= this.monthsFirstWeekday) {
          offset = i - this.monthsFirstWeekday
          if (offset < 0) {
            inactive = true
          }
          dayDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1 + offset)
          dayNumber = dayDate.getDate();
        }
        else {
          dayNumber = i + 1 - this.monthsFirstWeekday
          dayDate = new Date(this.date.getFullYear(), this.date.getMonth(), dayNumber)

          if (dayNumber > this.monthsTotalNumberOfDays) {
            offset = dayNumber - this.monthsTotalNumberOfDays
            inactive = true
            dayDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, offset)
            dayNumber = dayDate.getDate();
          }
        }
        let key = dayDate.toDateString()
        let meetups = this.selectedMonthMeetups[key]
        calendarCells.push({'number': dayNumber, 'inactive': inactive, 'meetups': meetups})
        i++
      }
      if (calendarCells[28].number === 1) {
        calendarCells = calendarCells.slice(0, 28)
      }
      return calendarCells
    },
    selectedMonthMeetups() {
      let dateData = this.date.toDateString().split(' ')
      let monthName = dateData[1]
      let year = dateData[3]
      let thisMonthMeetups = this.meetups.filter(
        (meetup) => {
          let meetupDate = new Date(meetup.date).toDateString()
          return meetupDate.includes(monthName) && meetupDate.includes(year)
        })
      let thisMonthMeetupsAsObject = {}
      for (let meetup of thisMonthMeetups) {
        let meetupDate = new Date(meetup.date).toDateString()
        if (thisMonthMeetupsAsObject[meetupDate]) {
          thisMonthMeetupsAsObject[meetupDate].push(meetup)
        }
        else {
          thisMonthMeetupsAsObject[meetupDate] = [meetup]
        }
      }
      return thisMonthMeetupsAsObject
    }
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
