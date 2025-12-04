import { renderTodos, renderProjectsMenu } from "./dom.js";
import { addTodo, getProjectTodos } from "./logic.js";
import { allTodos, projectList } from "./logic.js";

function buildTodoFormFields(form, todo) {
  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.id = "title";
  titleInput.value = todo ? todo.title : '';
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title:";
  titleLabel.htmlFor = "title";
  const descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("type", "text");
  descriptionInput.id = "description";
  descriptionInput.value = todo ? todo.description : '';
  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description:";
  descriptionLabel.htmlFor = "description";
  const dueDateInput = document.createElement("input");
  dueDateInput.setAttribute("type", "date");
  dueDateInput.id = "dueDate";
  dueDateInput.value = todo ? todo.dueDate : '';
  const dueDateLabel = document.createElement("label");
  dueDateLabel.textContent = "Due Date:";
  dueDateLabel.htmlFor = "dueDate";
  const priorityInput = document.createElement("select");
  priorityInput.id = "priority";
  priorityInput.value = todo ? todo.priority : '';
  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Priority:";
  priorityLabel.htmlFor = "priority";
  let newOptionHigh = new Option("High", "High");
  let newOptionMedium = new Option("Medium", "Medium");
  let newOptionLow = new Option("Low", "Low");
  priorityInput.appendChild(newOptionHigh);
  priorityInput.appendChild(newOptionMedium);
  priorityInput.appendChild(newOptionLow);
  const notesInput = document.createElement("input");
  notesInput.setAttribute("type", "text");
  notesInput.id = "notes";
  notesInput.value = todo ? todo.notes : '';
  const notesLabel = document.createElement("label");
  notesLabel.textContent = "Notes:";
  notesLabel.htmlFor = "notes";
  const selectList = document.createElement("select");
  selectList.id = "mySelect";
  selectList.value = todo ? todo.projectName : '';
  const selectLabel = document.createElement("label");
  selectLabel.textContent = "Project name:";
  selectLabel.htmlFor = "mySelect";
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
  return { titleInput, descriptionInput, dueDateInput, priorityInput, notesInput, selectList };
}
function populateProjectSelect(selectList) {
  for (let i = 0; i < projectList.length; i++) {
    const option = document.createElement("option");
    option.value = projectList[i];
    option.text = projectList[i];
    selectList.appendChild(option);
  }

}

function showAddTodoForm() {
  const mainContainer = document.querySelector(".main-container");
  const addTodoButton = document.getElementById("add-todo");
  addTodoButton.addEventListener("click", (event) => {
    event.preventDefault();
    const dialog = document.createElement("dialog");
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    const { titleInput, descriptionInput, dueDateInput, priorityInput, notesInput, selectList } = buildTodoFormFields(form);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("Форма отправлена!");
      addTodo(
        titleInput.value,
        selectList.value,
        descriptionInput.value,
        dueDateInput.value,
        priorityInput.value,
        notesInput.value
      );
      localStorage.setItem('todos', JSON.stringify(allTodos));
      renderTodos(allTodos);
      dialog.close();
      dialog.remove();
    });
    dialog.appendChild(form);
    mainContainer.appendChild(dialog);
    dialog.showModal();
    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";
    form.appendChild(cancelBtn);
    cancelBtn.addEventListener("click", () => {
      dialog.close();
      dialog.remove();
    });
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    form.appendChild(submitBtn);
    /*submitBtn.addEventListener('click', () => {
            renderTodos(allTodos);
            dialog.close();
        });*/
    populateProjectSelect(selectList);
  });

}

function showAddProjectForm() {
  const mainContainer = document.querySelector(".main-container");
  const addProjectButton = document.getElementById("add-project");
  addProjectButton.addEventListener("click", (event) => {
    const dialog = document.createElement("dialog");
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("Форма отправлена!");
      projectList.push(projectNameInput.value);
      localStorage.setItem("projects", JSON.stringify(projectList));
      renderProjectsMenu(projectList);
      dialog.close();
      dialog.remove();
    });
    const projectNameInput = document.createElement("input");
    projectNameInput.setAttribute("type", "text");
    projectNameInput.id = "projectName";
    const projectNameLabel = document.createElement("label");
    projectNameLabel.textContent = "Project name:";
    projectNameLabel.htmlFor = "projectName";
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    form.appendChild(projectNameLabel);
    form.appendChild(projectNameInput);
    form.appendChild(saveBtn);
    dialog.appendChild(form);
    mainContainer.appendChild(dialog);
    dialog.showModal();
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    form.appendChild(cancelButton);
    cancelButton.addEventListener("click", () => {
      dialog.close();
      dialog.remove();
    });
    /*
        saveBtn.addEventListener('click', () => {
            //renderProjectsMenu(projectList);
            dialog.close();
        });*/
  });

}


function showEditTodoForm(todo, mainContainer, array) {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");
  form.setAttribute("method", "post");
  const { titleInput, descriptionInput, dueDateInput, priorityInput, notesInput, selectList } = buildTodoFormFields(form, todo);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Форма отправлена!");
    todo.title = titleInput.value;
    todo.projectName = selectList.value;
    todo.description = descriptionInput.value;
    todo.dueDate = dueDateInput.value;
    todo.priority = priorityInput.value;
    todo.notes = notesInput.value;
    renderTodos(array);
    dialog.close();
    dialog.remove();
  });

  dialog.appendChild(form);
  mainContainer.appendChild(dialog);
  dialog.showModal();
  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancel";
  form.appendChild(cancelBtn);
  cancelBtn.addEventListener("click", () => {
    dialog.close();
    dialog.remove();
  });
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  form.appendChild(submitBtn);
  populateProjectSelect(selectList);
}

export { showAddTodoForm, showEditTodoForm, showAddProjectForm };
