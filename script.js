const tasksByDay = JSON.parse(localStorage.getItem('tasksByDay')) || {};
let currentDayIndex = 0;

const daysOfYear = Array.from({ length: 365 }, (_, i) => {
    const date = new Date(2025, 0, i + 1);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
});

function saveTasks() {
    localStorage.setItem('tasksByDay', JSON.stringify(tasksByDay));
}

function updateDayView() {
    const dayView = document.getElementById('day-view');
    const dayTitle = dayView.querySelector('h3');
    const taskList = dayView.querySelector('.tasks ul');

    const currentDay = daysOfYear[currentDayIndex];
    dayTitle.textContent = currentDay;
    document.getElementById('current-day').textContent = currentDay;

    taskList.innerHTML = '';

    const tasks = tasksByDay[currentDay] || [];
    tasks.forEach(({ text, completed }, index) => {
        const li = document.createElement('li');
        li.className = completed ? 'completed' : '';

        const taskSpan = document.createElement('span');
        taskSpan.textContent = text;
        li.appendChild(taskSpan);

        const toggleButton = document.createElement('button');
        toggleButton.textContent = completed ? 'Undo' : 'Complete';
        toggleButton.className = 'toggle';
        toggleButton.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            updateDayView();
        };
        li.appendChild(toggleButton);

        taskList.appendChild(li);
    });
}

document.getElementById('prev-day').addEventListener('click', () => {
    if (currentDayIndex > 0) {
        currentDayIndex--;
        updateDayView();
    }
});

document.getElementById('next-day').addEventListener('click', () => {
    if (currentDayIndex < daysOfYear.length - 1) {
        currentDayIndex++;
        updateDayView();
    }
});

document.querySelector('.add-task button').addEventListener('click', () => {
    const input = document.querySelector('.add-task input');
    const taskText = input.value.trim();
    if (taskText === '') return;

    const currentDay = daysOfYear[currentDayIndex];
    if (!tasksByDay[currentDay]) tasksByDay[currentDay] = [];
    tasksByDay[currentDay].push({ text: taskText, completed: false });

    input.value = '';
    saveTasks();
    updateDayView();
});

updateDayView();
