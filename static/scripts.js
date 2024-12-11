document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display tasks on page load
    fetchTasks();

    // Add event listener for form submission
    document.getElementById('add-task-form').addEventListener('submit', function (event) {
        event.preventDefault();
        addTask();
    });
});

function fetchTasks() {
    // Fetch tasks from the backend
    fetch('/tasks')
        .then(response => response.json())
        .then(data => {
            const tasksContainer = document.getElementById('tasks-container');
            tasksContainer.innerHTML = ''; // Clear existing tasks

            // Display tasks
            data.tasks.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.textContent = task.task;
                tasksContainer.appendChild(taskElement);
            });
        });
}

function addTask() {
    const taskInput = document.getElementById('task');
    const task = taskInput.value;

    // Add new task to the backend
    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: task }),
    })
        .then(response => response.json())
        .then(data => {
            // Fetch and display updated tasks
            fetchTasks();
            // Clear input field
            taskInput.value = '';
        });
}
