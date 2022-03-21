// Query Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const modal = document.querySelector('.modal');

// EventListeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);

// Functions
function addTodo(e){
    // Prevent For from submitting
    e.preventDefault();
    
    // Create the main div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create the li tag
    const li = document.createElement('li');
    li.textContent = todoInput.value
    li.classList.add('todo-item');

    // Create the completed button
    const btn1 = document.createElement('button');
    // Create Check Icon
    btn1.innerHTML = '<i class="fas fa-check"></i>'
    btn1.classList.add('complete');

    // Create the delete button
    const btn2 = document.createElement('button');
    // Create Delete Icon
    btn2.innerHTML = '<i class="fas fa-trash"></i>'
    btn2.classList.add('delete');

    // Append All to the main div
    todoDiv.appendChild(li);
    todoDiv.appendChild(btn1);
    todoDiv.appendChild(btn2);

    // Append A Todo
    const errorMsg = document.querySelector('.error'); 
    if(todoInput.value === ''){
        errorMsg.classList.remove('hidden');
    } else{
        errorMsg.classList.add('hidden');
        todoList.appendChild(todoDiv);
    }

    //Reset input value to an empty string 
    todoInput.value = '';
}

// const todo = item.parentElement;
// //Animation
// todo.classList.add('fall');
// todo.addEventListener('transitionend',() => todo.remove());

function deleteCheck(e){
    const item = e.target;
    if(item.classList.contains('complete')){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    } else if(item.classList.contains('delete')){
        modal.classList.remove('hidden');
        const todo = item.parentElement;

        //Animation
        todo.classList.add('remove');
        

        // Confirmation
        modal.addEventListener('click',(e)=>{
            const modalTarget = e.target;
            if(modalTarget.classList.contains('cancel') || modalTarget.classList.contains('modal')){
                modal.classList.add('hidden');
            } else if(modalTarget.classList.contains('del')){
                modal.classList.add('hidden');
                
                todo.classList.add('fall');
                todo.addEventListener('transitionend',() => todo.remove());
            }
        });
    }
}
