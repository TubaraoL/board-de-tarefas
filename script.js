document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const taskNameInput = document.querySelector('input[placeholder="Nome da tarefa"]');
    const taskLabelInput = document.querySelector('input[placeholder="Etiqueta"]');
    const main = document.querySelector('main');
    const taskDonesElement = document.querySelector('.task-dones h3');
    
    let completedTasksCount = 0;
    
    function updateCompletedCounter() {
        taskDonesElement.textContent = `${completedTasksCount} tarefas concluídas`;
    }
    
    function getCurrentDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    function markTaskAsComplete(taskElement) {
        const button = taskElement.querySelector('.task-button');
        const doneIcon = taskElement.querySelector('.img-done');
        
        button.style.display = 'none';
        doneIcon.style.display = 'block';
        
        taskElement.classList.add('task-completed');
        
        completedTasksCount++;
        updateCompletedCounter();
        
        taskElement.style.opacity = '0.7';
        taskElement.style.backgroundColor = '#f8f9fa';
    }
    
    function createNewTask(taskName, taskLabel) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        
        const taskDetailsDiv = document.createElement('div');
        taskDetailsDiv.className = 'taskDetails';
        
        const taskNameDiv = document.createElement('div');
        taskNameDiv.className = 'taskName';
        
        const taskNameH2 = document.createElement('h2');
        taskNameH2.textContent = taskName || 'Nova tarefa';
        
        const taskTypeDiv = document.createElement('div');
        taskTypeDiv.className = 'taskType';
        
        const taskTypeH4 = document.createElement('h4');
        taskTypeH4.textContent = taskLabel || 'geral';
        
        const taskCreationDiv = document.createElement('div');
        taskCreationDiv.className = 'taskCreation';
        
        const taskCreationH3 = document.createElement('h3');
        taskCreationH3.textContent = `Criado em: ${getCurrentDate()}`;
        
        const taskButton = document.createElement('button');
        taskButton.className = 'task-button';
        taskButton.textContent = 'Concluir';
        
        const doneImg = document.createElement('img');
        doneImg.className = 'img-done';
        doneImg.src = 'assets/done.svg';
        doneImg.alt = 'Tarefa concluída';
        
        taskNameDiv.appendChild(taskNameH2);
        taskTypeDiv.appendChild(taskTypeH4);
        taskCreationDiv.appendChild(taskCreationH3);
        
        taskDetailsDiv.appendChild(taskNameDiv);
        taskDetailsDiv.appendChild(taskTypeDiv);
        taskDetailsDiv.appendChild(taskCreationDiv);
        
        taskDiv.appendChild(taskDetailsDiv);
        taskDiv.appendChild(taskButton);
        taskDiv.appendChild(doneImg);
        
        taskButton.addEventListener('click', function() {
            markTaskAsComplete(taskDiv);
        });
        
        return taskDiv;
    }
    
    function addTask(event) {
        event.preventDefault();
        
        const taskName = taskNameInput.value.trim();
        const taskLabel = taskLabelInput.value.trim();
        
        if (!taskName) {
            alert('Por favor, digite um nome para a tarefa');
            taskNameInput.focus();
            return;
        }
        
        const newTask = createNewTask(taskName, taskLabel);
        
        main.insertBefore(newTask, main.firstChild);
        
        taskNameInput.value = '';
        taskLabelInput.value = '';
        taskNameInput.focus();
        
        newTask.style.animation = 'fadeIn 0.3s ease-in';
    }
    
    function initializeExistingButtons() {
        const existingButtons = document.querySelectorAll('.task-button');
        existingButtons.forEach(button => {
            const taskElement = button.closest('.task');
            const doneIcon = taskElement.querySelector('.img-done');
            
            if (doneIcon.style.display === 'block' || taskElement.classList.contains('task-completed')) {
                completedTasksCount++;
                button.style.display = 'none';
            } else {
                button.addEventListener('click', function() {
                    markTaskAsComplete(taskElement);
                });
            }
        });
        
        updateCompletedCounter();
    }
    
    form.addEventListener('submit', addTask);
    
    const addButton = document.querySelector('.form-button');
    addButton.addEventListener('click', addTask);
    
    taskLabelInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask(e);
        }
    });
    
    initializeExistingButtons();
    
    const style = document.createElement('style');
    style.textContent = `
        .task-completed {
            border-color: #4CAF50 !important;
            background-color: #f8f9fa;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .task-button:hover {
            transform: scale(1.02);
            transition: transform 0.2s;
        }
        
        .img-done {
            width: 32px;
            height: 32px;
        }
    `;
    document.head.appendChild(style);
});