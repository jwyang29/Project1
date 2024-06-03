document.addEventListener('DOMContentLoaded', function () {
    const calendarBody = document.getElementById('calendar-body');
    const currentMonth = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const toggleModeBtn = document.getElementById('toggle-mode');
    const newGroupBtn = document.querySelector('.new-group');
    const groupIconsContainer = document.getElementById('group-icons');

    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonthIndex = today.getMonth();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const groupColors = [
        'green-tone-a', 'green-tone-b', 'green-tone-c', 'green-tone-d', 'green-tone-e'
    ];

    let groupIndex = 0;

    function generateCalendar(month, year) {
        calendarBody.innerHTML = '';
        currentMonth.textContent = `${months[month]} ${year}`;

        let firstDay = new Date(year, month).getDay();
        let daysInMonth = 32 - new Date(year, month, 32).getDate();

        let date = 1;

        for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                let cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    let cellText = document.createTextNode('');
                    cell.appendChild(cellText);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    let cellText = document.createTextNode(date);
                    cell.appendChild(cellText);
                    cell.addEventListener('click', () => {
                        showWeek(new Date(year, month, date));
                    });
                    date++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
    }

    function showWeek(selectedDate) {
        const startOfWeek = getStartOfWeek(selectedDate);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        days.forEach((day, index) => {
            const dayColumn = document.getElementById(day.toLowerCase());
            dayColumn.innerHTML = '';
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + index);
            dayColumn.textContent = `${day}, ${date.getMonth() + 1}/${date.getDate()}`;
        });
    }

    function getStartOfWeek(date) {
        const day = date.getDay();
        const diff = date.getDate() - day; // calculate start of the week (Sunday)
        return new Date(date.setDate(diff));
    }

    prevMonthBtn.addEventListener('click', () => {
        currentMonthIndex = (currentMonthIndex === 0) ? 11 : currentMonthIndex - 1;
        if (currentMonthIndex === 11) {
            currentYear--;
        }
        generateCalendar(currentMonthIndex, currentYear);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonthIndex = (currentMonthIndex === 11) ? 0 : currentMonthIndex + 1;
        if (currentMonthIndex === 0) {
            currentYear++;
        }
        generateCalendar(currentMonthIndex, currentYear);
    });

    generateCalendar(currentMonthIndex, currentYear);
    showWeek(today);  // Show current week on page load

    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function() {
            todoItem.classList.toggle('completed');
        });

        const text = document.createElement('span');
        text.textContent = todoText;

        todoItem.appendChild(checkbox);
        todoItem.appendChild(text);
        todoList.appendChild(todoItem);

        todoInput.value = '';
    }

    toggleModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('night-mode');
        if (document.body.classList.contains('night-mode')) {
            toggleModeBtn.textContent = 'Day Mode';
        } else {
            toggleModeBtn.textContent = 'Night Mode';
        }
    });

    newGroupBtn.addEventListener('click', function() {
        addNewGroupIcon();
    });

    function addNewGroupIcon() {
        groupIndex = groupIndex % groupColors.length;
        const newGroupIcon = document.createElement('div');
        newGroupIcon.className = `group-icon ${groupColors[groupIndex]}`;
        newGroupIcon.textContent = String.fromCharCode(65 + groupIndex); // 'A' = 65, 'B' = 66, etc.
        groupIconsContainer.appendChild(newGroupIcon);
        groupIndex++;
    }
});


