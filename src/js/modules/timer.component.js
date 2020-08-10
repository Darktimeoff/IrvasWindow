export default class Timer {
    constructor(deadline, parentSectionSel, daysSel, hoursSel, minutesSel, secondsSel) {
        this.parentSection = document.querySelector(parentSectionSel);
        this.$days = this.parentSection.querySelector(daysSel);
        this.$hours = this.parentSection.querySelector(hoursSel);
        this.$minutes = this.parentSection.querySelector(minutesSel);
        this.$seconds = this.parentSection.querySelector(secondsSel)
        this.deadline = deadline;
    }

    static calcLeftDate(deadline) {
        return _calcLeftTime(deadline);
    }

    init() {
        _render.call(this);
        _upDateTimer.call(this, _render.bind(this));
    }

    stopTimer() {
        clearTimeout(this.timerId);
    }
}

function _render() {
    const {days, hours, minutes, seconds} = _calcLeftTime.call(this, this.deadline);
    this.$days.textContent = _addZero(days);
    this.$hours.textContent = _addZero(hours);
    this.$minutes.textContent = _addZero(minutes);
    this.$seconds.textContent = _addZero(seconds); 
}

function _calcLeftTime(deadline) {
    const t = +new Date(deadline) - Date.now();
    const days = Math.floor((t / (1000 * 60 * 60 * 24)));
    const hours = Math.floor((t / (1000 * 60 * 60) % 24) );
    const minutes = Math.floor((t / 1000 / 60) % 60 );
    const seconds = Math.floor((t / 1000) % 60 );
    return {
        days,
        hours,
        minutes,
        seconds
    }
}

function _addZero(value) {
   return value < 10 ? '0' + value : value;
}

function _upDateTimer(func) {
    this.timerId = setTimeout(function upDate() {
        func()
        this.timerId = setTimeout(upDate, 1000)
    }, 1000);
}