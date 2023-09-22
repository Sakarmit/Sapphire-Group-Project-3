'use strict';

class DatePicker {
    constructor(id, callback) {
        this.container = document.getElementById(id);
        this.callback = callback;
        this.date = new Date();
        this.render();
        this.setupControls();
    }

    render(date) {
        if (date instanceof Date) {
            this.date = date;
        }
        const calendarHTML = this.generateCalendarHTML();
        this.container.innerHTML = calendarHTML;
    }

    testFunction() {
        alert('sad')
    }

    generateCalendarHTML() {
        this.setupControls();
        const firstDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        const lastDayOfMonth=new Date(this.date.getFullYear(),this.date.getMonth()+1, 0).getDate();
        let previousMonth = new Date(this.date.getFullYear(),this.date.getMonth(), -firstDayOfMonth + 1).getDate();
        const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        let calendarHTML = `
        
            <table>
                <thead>
                    <tr>
                        <th> <button class="button" onclick="datePicker1.render(new Date('1/1/2009'))">\<</button> </th>
                        <th colspan="7">${this.getMonthName()} ${this.date.getFullYear()}</th>
                        <th> <button class="button">\></button> </th>
                    </tr>
                    <tr>
                        ${dayNames.map(day => `<th>${day}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
        `;

        let dayCounter = 1;
        let nextMonthCounter = 1;
        for (let i = 0; i < 6; i++) {
            calendarHTML += '<tr>';

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfMonth) {
                    calendarHTML += `<td class="other-month">${previousMonth}</td>`;
                    previousMonth++;
                } else if (dayCounter <= lastDayOfMonth) {
                    calendarHTML += `<td>${dayCounter}</td>`;
                    dayCounter++;
                } else {
                    calendarHTML += `<td class="other-month">${nextMonthCounter}</td>`;
                    nextMonthCounter++;
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
        const monthArray = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
        return monthArray[monthNum];
    }

    setupControls() {
        const prevButton = document.createElement('button');
        prevButton.textContent = '<';
        prevButton.addEventListener('click', () => {
            this.date.setMonth(this.date.getMonth() - 1);
            this.render();
        });

        const nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.addEventListener('click', () => {
            this.date.setMonth(this.date.getMonth() + 1);
            this.render();
        });

        const controlsDiv = document.createElement('div');
        controlsDiv.classList.add('calendar-controls');
        controlsDiv.appendChild(prevButton);
        controlsDiv.appendChild(nextButton);

        this.container.appendChild(controlsDiv);
    }
}