import { Todo } from '../classes/todo.class'
import { todoList } from '../index'
//Referencias al html
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) => {
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