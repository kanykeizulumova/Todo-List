import { addTodo, getProjectTodos } from './logic.js';
import { allTodos, projectList } from './logic.js';
import { removeProjectTodos } from './logic.js';

function renderTodos(array) {
    const mainContainer = document.querySelector('.main-container');
    const taskContainer = document.querySelector('#tasks-container');
    taskContainer.innerHTML = "";
    array.forEach(todo => {
        const todoElement = document.createElement('div');
        todoElement.classList.add('todo');
        const todoInfo = document.createElement('div');
        todoInfo.classList.add('todo-info');
        todoInfo.innerHTML = `
            <h2>${todo.title}</h2>
            <p> Project: ${todo.projectName} </p>
            <p> Description: ${todo.description} </p>
            <p> Due Date: ${todo.dueDate} </p>
            <p> Priority: ${todo.priority} </p>
            <p> Notes: ${todo.notes} </p>
        `;
        todoElement.appendChild(todoInfo);
        const priorityClass = 'priority-' + todo.priority.toLowerCase();
        todoElement.classList.add(priorityClass);
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.type = 'button';
        deleteButton.textContent = '🗑';
        todoElement.appendChild(deleteButton);
        deleteButton.addEventListener('click', () => {
            const idToDelete = todo.id;
            allTodos.splice(allTodos.findIndex(todo => todo.id === idToDelete), 1);
            localStorage.setItem('todos', JSON.stringify(allTodos));
            renderTodos(array);

        });
        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.type = 'button';
        editButton.textContent = '✏️';
        todoElement.appendChild(editButton);
        editButton.addEventListener('click', () => {
            console.log("Редактируем:", todo);
            const dialog = document.createElement('dialog');
            const form = document.createElement('form');
            form.setAttribute('method', 'post');
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                console.log("Форма отправлена!");
                todo.title = titleInput.value;
                todo.projectName = selectList.value;
                todo.description = descriptionInput.value;
                todo.dueDate = dueDateInput.value;
                todo.priority = priorityInput.value;
                todo.notes = notesInput.value;
                localStorage.setItem('todos', JSON.stringify(allTodos));
                renderTodos(array);
                dialog.close();
                dialog.remove();
            });
            const titleInput = document.createElement('input');
            titleInput.setAttribute('type', 'text');
            titleInput.id = 'title';
            titleInput.value = todo.title;
            const titleLabel = document.createElement('label');
            titleLabel.textContent = 'Title:';
            titleLabel.htmlFor = 'title';
            const descriptionInput = document.createElement('input');
            descriptionInput.setAttribute('type', 'text');
            descriptionInput.id = 'description';
            descriptionInput.value = todo.description;
            const descriptionLabel = document.createElement('label');
            descriptionLabel.textContent = 'Description:';
            descriptionLabel.htmlFor = 'description';
            const dueDateInput = document.createElement('input');
            dueDateInput.setAttribute('type', 'date');
            dueDateInput.id = 'dueDate';
            dueDateInput.value = todo.dueDate;
            const dueDateLabel = document.createElement('label');
            dueDateLabel.textContent = 'Due Date:';
            dueDateLabel.htmlFor = 'dueDate';
            const priorityInput = document.createElement('select');
            priorityInput.id = 'priority';
            priorityInput.value = todo.priority;
            const priorityLabel = document.createElement('label');
            priorityLabel.textContent = 'Priority:';
            priorityLabel.htmlFor = 'priority';
            let newOptionHigh = new Option('High', 'High');
            let newOptionMedium = new Option('Medium', 'Medium');
            let newOptionLow = new Option('Low', 'Low');
            priorityInput.appendChild(newOptionHigh);
            priorityInput.appendChild(newOptionMedium);
            priorityInput.appendChild(newOptionLow);
            const notesInput = document.createElement('input');
            notesInput.setAttribute('type', 'text');
            notesInput.id = 'notes';
            notesInput.value = todo.notes;
            const notesLabel = document.createElement('label');
            notesLabel.textContent = 'Notes:';
            notesLabel.htmlFor = 'notes';
            const selectList = document.createElement("select");
            selectList.id = "mySelect";
            selectList.value = todo.projectName;
            const selectLabel = document.createElement('label');
            selectLabel.textContent = 'Project name:';
            selectLabel.htmlFor = 'mySelect';
            form.appendChild(titleLabel);
            form.appendChild(titleInput);
            form.appendChild(descriptionLabel);
            form.appendChild(descriptionInput);
            form.appendChild(dueDateLabel);
            form.appendChild(dueDateInput);
            form.appendChild(priorityLabel);
            form.appendChild(priorityInput);
            form.appendChild(notesLabel);
            form.appendChild(notesInput);
            form.appendChild(selectLabel);
            form.appendChild(selectList);
            dialog.appendChild(form);
            mainContainer.appendChild(dialog);
            dialog.showModal();
            const cancelBtn = document.createElement('button');
            cancelBtn.type = 'button';
            cancelBtn.textContent = 'Cancel';
            form.appendChild(cancelBtn);
            cancelBtn.addEventListener('click', () => {
                dialog.close();
                dialog.remove();
            });
            const submitBtn = document.createElement('button');
            submitBtn.textContent = 'Submit';
            form.appendChild(submitBtn);
            for (let i = 0; i < projectList.length; i++) {
                const option = document.createElement("option");
                option.value = projectList[i];
                option.text = projectList[i];
                selectList.appendChild(option);
            }
        });




        taskContainer.appendChild(todoElement);

    })

}

function renderProjectsMenu() {
    const projectListContainer = document.querySelector('#project-menu');
    projectListContainer.innerHTML = "";
    projectList.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        projectElement.innerHTML = `
            <h2>${project}</h2>
        `;
        projectElement.addEventListener('click', () => {
            renderTodos(getProjectTodos(project));

        });
        const projectDeleteBtn = document.createElement('button');
        projectDeleteBtn.classList.add('delete-button');
        projectDeleteBtn.type = 'button';
        projectDeleteBtn.textContent = '🗑';
        projectElement.appendChild(projectDeleteBtn);
        projectDeleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectToDelete = project;
            projectList.splice(projectList.findIndex(project => project === projectToDelete), 1);
            localStorage.setItem('projects', JSON.stringify(projectList));
            removeProjectTodos(projectToDelete);
            renderProjectsMenu();
            renderAllTasks();
            renderTodos(allTodos);
        });
        projectListContainer.appendChild(projectElement);
    })

}

function renderAllTasks() {
    const allTasksContainer = document.querySelector('#all-tasks');
    allTasksContainer.addEventListener('click', () => {
        localStorage.setItem('todos', JSON.stringify(allTodos));
        renderTodos(allTodos);
    })
}

export { renderTodos, renderProjectsMenu, renderAllTasks };