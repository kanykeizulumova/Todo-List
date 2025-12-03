import { format } from 'date-fns';
import './style.css';
import { addTodo, getProjectTodos } from './logic.js';
import { allTodos, projectList } from './logic.js';
import { renderTodos, renderProjectsMenu, renderAllTasks } from './dom.js';
import { showAddTodoForm } from './input.js';
renderTodos(allTodos);
renderProjectsMenu();
showAddTodoForm();
renderAllTasks()



