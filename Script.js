const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const errorMessage = document.getElementById('errorMessage');

let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function renderTasks() {
    todoList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">❌</button>
        `;
        todoList.appendChild(li);
    });
}

function addTask() {
    const taskText = todoInput.value.trim();

    if (taskText === '') {
        errorMessage.textContent = "Please enter a task!";
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';
    tasks.push(taskText);
    
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    
    renderTasks();
    console.log(`🚀 New task added by [Apna Name]: "${taskText}" at ${new Date().toLocaleTimeString()}`);
    todoInput.value = '';
}

window.deleteTask = function(index) {
    tasks.splice(index, 1);
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
}

addBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

renderTasks();