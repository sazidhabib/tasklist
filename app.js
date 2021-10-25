// <!-- Design by Mahabub Sazid Habib -->

// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all even Listeners
loadEventListeners();


// load all even Listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks From Local Storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task){
    // create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
    });
}


// Add Task
function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in Local storage
    storeTaskInLocalStorage(taskInput.value); 

    // clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();

            // Remove task from LocalStorage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LocalStorage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear Tasks
function clearTasks(){
    // taskList.innerHTML = '';

    // Faster
    while (taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }


    // Clear from LocalStorage
    clearTasksFromLocalStorage();
}


// clear from LocalStroage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}


// Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
}

// <!-- Design by Mahabub Sazid Habib -->