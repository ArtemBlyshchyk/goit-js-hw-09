import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
// import 'flatpickr/dist/themes/dark.css';

let selectedTime = null;
const refs = {
  inputDate: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
// console.log(refs.inputDate);
// console.log(refs.startBtn);
refs.startBtn.disabled = 'disabled';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = (Math.floor(ms / day));
  // Remaining hours
  const hours = (Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = (Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = (Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      refs.startBtn.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};

class Timer {
  constructor() {
    this.timerID = null;
    this.isActive = false;
    refs.startBtn.disabled = true;
  }

  startTimer() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.timerID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      const componentsTimer = convertMs(deltaTime);
      this.updateComponentsTimer(componentsTimer);
      if (deltaTime <= 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  updateComponentsTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }

  stopTimer() {
    clearInterval(this.timerID);
  }
}

const timer = new Timer();
flatpickr(refs.inputDate, options);
refs.startBtn.addEventListener('click', () => timer.startTimer());