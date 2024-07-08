class Task {
    constructor(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = false;
    }
}

class ToDoList {
    constructor() {
        this.tasks = this.getTasksFromLocalStorage();
        this.renderTasks();
    }

    getTasksFromLocalStorage() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasksToLocalStorage();
        this.renderTasks();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasksToLocalStorage();
        this.renderTasks();
    }

    toggleTaskCompletion(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasksToLocalStorage();
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        this.tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add(task.completed ? 'completed' : '');

            const taskContent = document.createElement('span');
            taskContent.textContent = `${task.title} - ${task.description} - ${task.dueDate}`;
            taskContent.addEventListener('click', () => this.toggleTaskCompletion(index));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.addEventListener('click', () => this.deleteTask(index));

            taskItem.appendChild(taskContent);
            taskItem.appendChild(deleteButton);

            taskList.appendChild(taskItem);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const toDoList = new ToDoList();

    document.getElementById('task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due-date').value;

        if (title) {
            const task = new Task(title, description, dueDate);
            toDoList.addTask(task);
            document.getElementById('task-form').reset();
        }
    });
});
