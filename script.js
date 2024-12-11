const tasksByDay = JSON.parse(localStorage.getItem('tasksByDay')) || {};
let currentDay = 1;

function saveTasks() {
    localStorage.setItem('tasksByDay', JSON.stringify(tasksByDay));
}

function updateDayView() {
    const dayView = document.getElementById('day-view');
    const dayTitle = dayView.querySelector('h3');
    const taskList = dayView.querySelector('.tasks ul');

    dayTitle.textContent = `December ${currentDay}`;
    taskList.innerHTML = '';

    const tasks = tasksByDay[currentDay] || [];
    tasks.forEach(taskText => {
        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        li.appendChild(taskSpan);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove';
        removeButton.onclick = () => {
            tasksByDay[currentDay] = tasksByDay[currentDay].filter(task => task !== taskText);
            saveTasks();
            updateDayView();
        };
        li.appendChild(removeButton);

        taskList.appendChild(li);
    });
}

document.getElementById('prev-day').addEventListener('click', () => {
    if (currentDay > 1) {
        currentDay--;
        updateDayView();
        document.getElementById('current-day').textContent = `December ${currentDay}`;
    }
});

document.getElementById('next-day').addEventListener('click', () => {
    if (currentDay < 31) {
        currentDay++;
        updateDayView();
        document.getElementById('current-day').textContent = `December ${currentDay}`;
    }
});

document.querySelector('.add-task button').addEventListener('click', () => {
    const input = document.querySelector('.add-task input');
    const taskText = input.value.trim();
    if (taskText === '') return;

    if (!tasksByDay[currentDay]) tasksByDay[currentDay] = [];
    tasksByDay[currentDay].push(taskText);

    input.value = '';
    saveTasks();
    updateDayView();
});

updateDayView();
