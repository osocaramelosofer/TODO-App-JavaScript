import { Todo } from "./todo.class";

export class TodoList {

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