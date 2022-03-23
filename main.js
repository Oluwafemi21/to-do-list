// Query Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const modal = document.querySelector(".modal");
const filterList = document.querySelector(".filter-list");

// EventListeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

// filter edits
filterList.addEventListener('change', filterTodo)

// Functions
const todos = todoList.childNodes;
const total = document.querySelector(".total");

function addTodo(e) {
  // Prevent For from submitting
  e.preventDefault();

  // Create the main div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create the li tag
  const li = document.createElement("li");
  li.textContent = todoInput.value;
  li.classList.add("todo-item");

  // Create the completed button
  const btn1 = document.createElement("button");
  // Create Check Icon
  btn1.innerHTML = '<i class="fas fa-check"></i>';
  btn1.classList.add("complete");

  // Create the delete button
  const btn2 = document.createElement("button");
  // Create Delete Icon
  btn2.innerHTML = '<i class="fas fa-trash"></i>';
  btn2.classList.add("delete");

  // Append All to the main div
  todoDiv.appendChild(li);
  todoDiv.appendChild(btn1);
  todoDiv.appendChild(btn2);

  // Append A Todo
  const errorMsg = document.querySelector(".error");
  if (todoInput.value === "") {
    errorMsg.classList.remove("hidden");
  } else {
    errorMsg.classList.add("hidden");
    todoList.appendChild(todoDiv);
  }

  //Reset input value to an empty string
  todoInput.value = null;

  //counting the number of todos
  total.textContent = `You have ${todos.length} todo(s).`;
}

function deleteCheck(e) {
  const item = e.target;
  if (item.classList.contains("complete")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  } else if (item.classList.contains("delete")) {
    const todo = item.parentElement;
    modal.classList.remove("hidden");

    //Animation
    todo.classList.add("remove");

    // Confirmation
    const cancel = document.querySelector(".cancel");
    const del = document.querySelector(".del");

    cancel.addEventListener("click", () => {
      modal.classList.add("hidden");
      todo.classList.remove("remove");
    });

    modal.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    del.addEventListener("click", () => {
      modal.classList.add("hidden");

      if (todo.classList.contains("remove")) {
        //counting the number of todos
        let len = todos.length;
        if (len > 1) {
          total.textContent = `You have ${len - 1} todo(s).`;
        } else {
          total.textContent = null;
        }

        todo.classList.add("fall");
        todo.addEventListener("transitionend", () => todo.remove());
      }
    });
  }
}

function filterTodo(e) {
  const todos = Array.from(todoList.childNodes);
  switch (e.target.value) {
    case "all":
      todos.map((todo) => {
        todo.style.display = "flex";
      })
      total.textContent = `You have ${todos.length} todo(s).`;
      break;

    case "completed":
      let arr1 = todos.filter((todo) => todo.classList.contains('completed'));
      
      todos.map((todo) => {
        if(!todo.classList.contains('completed')){
          todo.style.display = "none";
        }
        else{
          todo.style.display = "flex";
        }
      })
      total.textContent = `You have completed ${arr1.length} todo(s).`;
      break;

    case "uncompleted":
      let arr2 = todos.filter((todo) => !todo.classList.contains('completed'));

      todos.map((todo) => {
        if(!todo.classList.contains('completed')){
          todo.style.display = "flex";
        }
        else{
          todo.style.display = "none";
        }
      })
      total.textContent = `You have ${arr2.length} uncompleted todo(s).`;
      break;
  }
}
