import './styles.css';
import { Todo, TodoList} from './classes' // import { Todo } from './classes/todo.class.js'; 
                                        // import { TodoList } from './classes/todo-list-class';

import { crearTodoHtml } from './js/components'


export const todoList = new TodoList();

todoList.todos.forEach(todo => crearTodoHtml(todo));
// todoList.todos.forEach(crearTodoHtml);   // cuando tenemos un argumento en donde es el unico argumento que mandamos
                                            //entonces podemos ponerlo así

