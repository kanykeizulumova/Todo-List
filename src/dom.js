import { addTodo, getProjectTodos } from "./logic.js";
import { allTodos, projectList } from "./logic.js";
import { removeProjectTodos } from "./logic.js";
import { showEditTodoForm } from "./input.js";

function renderTodos(array) {
  const mainContainer = document.querySelector(".main-container");
  const taskContainer = document.querySelector("#tasks-container");
  taskContainer.innerHTML = "";
  array.forEach((todo) => {
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo");
    const todoInfo = document.createElement("div");
    todoInfo.classList.add("todo-info");
    todoInfo.innerHTML = `
            <h2>${todo.title}</h2>
            <p> Project: ${todo.projectName} </p>
            <p> Description: ${todo.description} </p>
            <p> Due Date: ${todo.dueDate} </p>
            <p> Priority: ${todo.priority} </p>
            <p> Notes: ${todo.notes} </p>
        `;
    todoElement.appendChild(todoInfo);
    const priorityClass = "priority-" + todo.priority.toLowerCase();
    todoElement.classList.add(priorityClass);
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.type = "button";
    deleteButton.textContent = "🗑";
    todoElement.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
      const idToDelete = todo.id;
      allTodos.splice(
        allTodos.findIndex((todo) => todo.id === idToDelete),
        1
      );
      localStorage.setItem("todos", JSON.stringify(allTodos));
      renderTodos(array);
    });
    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.type = "button";
    editButton.textContent = "✏️";
    todoElement.appendChild(editButton);
    editButton.addEventListener("click", () => {
      console.log("Редактируем:", todo);
      showEditTodoForm(todo, mainContainer, array);
    });

    taskContainer.appendChild(todoElement);
  });
}

function renderProjectsMenu() {
  const projectListContainer = document.querySelector("#project-menu");
  projectListContainer.innerHTML = "";
  projectList.forEach((project) => {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");
    projectElement.innerHTML = `
            <h2>${project}</h2>
        `;
    projectElement.addEventListener("click", () => {
      renderTodos(getProjectTodos(project));
    });
    const projectDeleteBtn = document.createElement("button");
    projectDeleteBtn.classList.add("delete-button");
    projectDeleteBtn.type = "button";
    projectDeleteBtn.textContent = "🗑";
    projectElement.appendChild(projectDeleteBtn);
    projectDeleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const projectToDelete = project;
      projectList.splice(
        projectList.findIndex((project) => project === projectToDelete),
        1
      );
      localStorage.setItem("projects", JSON.stringify(projectList));
      removeProjectTodos(projectToDelete);
      renderProjectsMenu();
      renderAllTasks();
      renderTodos(allTodos);
    });
    projectListContainer.appendChild(projectElement);
  });
}

function renderAllTasks() {
  const allTasksContainer = document.querySelector("#all-tasks");
  allTasksContainer.addEventListener("click", () => {
    localStorage.setItem("todos", JSON.stringify(allTodos));
    renderTodos(allTodos);
  });
}

export { renderTodos, renderProjectsMenu, renderAllTasks };
