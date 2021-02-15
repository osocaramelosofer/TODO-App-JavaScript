/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 470:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "L": () => (/* binding */ todoList)
});

;// CONCATENATED MODULE: ./src/classes/todo.class.js

class Todo {

    static fromJson( { tarea, id, completado, creado } ) {
        const tempTodo = new Todo( tarea );

        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;
        
        return tempTodo; 
    }

    constructor ( tarea ) {
        this.tarea = tarea;

        this.id         = new Date().getTime();
        this.completado = false;
        this.creado     = new Date();
    }

    imprimirTodo(){
        console.log(`tarea: ${this.tarea} - id: ${this.id}`);
    }
}
;// CONCATENATED MODULE: ./src/classes/todo-list-class.js


class TodoList {

    constructor () {
        // this.todos = [];
        this.cargarLocalStorage();

    }
    nuevoTodo( todo ) {
        this.todos.push( todo );
        this.guardarLocalStorage();  
    }
    eliminarTodo( id ) {

        this.todos = this.todos.filter( todo => todo.id != id ); // el metodo filter() es un metodo de un array que nos permite
                                                                // crea un nuevo array con todos los elementos que cumplan la condición 
        this.guardarLocalStorage();                                                                
    }
    marcarCompletado( id ){
        for( const todo of this.todos ) {
            
            if( todo.id == id ){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();  
                break;
            }
        }
    }
    eliminarCompletado(){
        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardarLocalStorage();  
    }

    guardarLocalStorage() {
        localStorage.setItem('todo', JSON.stringify( this.todos ) ); //parseamos el arreglo de objetos a arreglo de Jsons
    }
    cargarLocalStorage() {
        // if( localStorage.getItem('todo') ) {
        //     this.todos = JSON.parse( localStorage.getItem('todo'));

        // } else {
        //     this.todos = [];
        // }    --------> estas lineas de codigo se simplifican con un operador ternario como el de abajo
        this.todos = (localStorage.getItem('todo')) 
                        ?  JSON.parse( localStorage.getItem('todo') )
                        :  [];

        this.todos = this.todos.map(Todo.fromJson);
    }
}
;// CONCATENATED MODULE: ./src/js/components.js


//Referencias al html
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


const crearTodoHtml = ( todo ) => {
    const htmlTodo = 
    `
    <li class=" ${ (todo.completado) ? 'completed' : '' } " data-id="${ todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${ todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}

//Eventos
txtInput.addEventListener('keyup', (event) => { // agregar todo
                                                // keyup nos da el codigo de la tecla presionada, el keyup de enter = 13
    if ( event.keyCode === 13 && txtInput.value.length > 0) {
    
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );

        txtInput.value = '';
    }

});


divTodoList.addEventListener('click', (event) => {
    
    const nombreElemento = event.target.localName; // con esto sabemos a que le dimos click, input, label o button
    const todoElemento   = event.target.parentElement.parentElement; // obtenemos la referencia al <li> quien contiene toda nuesta tarea
    const todoId         = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input')) { // si se hizo click en el checkbox(input)
        
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed'); // agregamos o quitamos la clase completed

    } else if( nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento); // Eliminamos la referencia html
    }
    console.log(todoList);
});

btnBorrar.addEventListener('click', ()=>{
    
    todoList.eliminarCompletado(); //eliminamos los todos completados


    // Eliminamos la referencia de los todos completados en el html
    for( let i = divTodoList.children.length-1; i >= 0; i-- ) { // Recorremos de manera inversa los 
        
        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed') ) {
            divTodoList.removeChild(elemento);
        }
    }
});


ulFiltros.addEventListener('click', (event) =>{
    
    const filtro = event.target.text;
    if( !filtro ) { return; } 

    anchorFiltros.forEach( element => element.classList.remove('selected') );
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch ( filtro ) {

            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;
        
            default:
                break;
        }
    }
});
;// CONCATENATED MODULE: ./src/index.js

 // import { Todo } from './classes/todo.class.js'; 
                                        // import { TodoList } from './classes/todo-list-class';




const todoList = new TodoList();

todoList.todos.forEach(todo => crearTodoHtml(todo));
// todoList.todos.forEach(crearTodoHtml);   // cuando tenemos un argumento en donde es el unico argumento que mandamos
                                            //entonces podemos ponerlo así



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(470);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;