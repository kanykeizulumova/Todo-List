let allTodos = JSON.parse(localStorage.getItem('todos')) || [];

class Todo {
    constructor(title, projectName, description, dueDate, priority, notes) {
        this.title = title;
        this.projectName = projectName;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.id = crypto.randomUUID();
    }
}

let projectList = JSON.parse(localStorage.getItem('projects')) || ["Home", "Work", "Gym"];
if (projectList.length === 0) {
    projectList.push("Home", "Work", "Gym");
}
localStorage.setItem('projects', JSON.stringify(projectList));



const task1 = new Todo('Buy bread', 'Home', 'Stop by the bakery', '2025-12-05', 'Medium', 'Don\'t forget the milk');
const task2 = new Todo('Submit report', 'Work', 'Quarterly budget', '2025-12-10', 'High', 'Check the numbers twice');
const task3 = new Todo('Warm-up', 'Gym', 'New cardio', '2025-12-03', 'Low', 'Focus on legs');

if (allTodos.length === 0) {
    allTodos.push(task1, task2, task3);
}
localStorage.setItem('todos', JSON.stringify(allTodos));


function addTodo(title, projectName, description, dueDate, priority, notes) {
    allTodos.push(new Todo(title, projectName, description, dueDate, priority, notes));
    localStorage.setItem('todos', JSON.stringify(allTodos));
}

function getProjectTodos(projectName) {
    let newArray = allTodos.filter(todo => todo.projectName === projectName);
    return newArray;
}

function removeProjectTodos(projectName) {
    let newArray = allTodos.filter(todo => todo.projectName !== projectName);
    allTodos = newArray;
    localStorage.setItem('todos', JSON.stringify(allTodos));
}

export { addTodo };
export { getProjectTodos };
export { removeProjectTodos };
export { projectList };
export { allTodos };