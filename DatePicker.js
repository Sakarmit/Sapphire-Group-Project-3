"use strict";
class DatePicker {
    constructor(id, callback) {
        this.container = document.getElementById(id);
        this.callback = callback;
        this.date = new Date();
        this.render();
    }

    render(date) {
        if (date instanceof Date) {
            this.date = date;
        }
        const calendarHTML = this.generateCalendarHTML();
        this.container.innerHTML = calendarHTML;
    }

    generateCalendarHTML() {
        const firstDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        const lastDayOfMonth= new Date(this.date.getFullYear(),this.date.getMonth()+1, 0).getDate();
        const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        let calendarHTML = `
    <table>
      <thead>
        <tr>
          <th colspan="7">${this.getMonthName()} ${this.date.getFullYear()}</th>
        </tr>
        <tr>
          ${dayNames.map(day => `<th>${day}</th>`)
            .join('')}
        </tr>
      </thead>
      <tbody>
  `;

        let dayCounter = 1;
        for (let i = 0; i < 6; i++) {
            calendarHTML += '<tr>';

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfMonth) {
                    calendarHTML += '<td class="other-month"></td>';
                } else if (dayCounter <= lastDayOfMonth) {
                    calendarHTML += `<td>${dayCounter}</td>`;
                    dayCounter++;
                } else {
                    calendarHTML += '<td class="other-month"></td>';
                }
            }
            calendarHTML += '</tr>';
        }
        calendarHTML += `
      </tbody>
    </table>
  `;
        return calendarHTML;
    }
    getMonthName() {
        const monthNum = this.date.getMonth();
        const monthArray=["January","February","March","April","May","June","July","August","September","October","November","December"];
        return monthArray[monthNum];
    }
}