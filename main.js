// Get references to DOM elements
const newTodoInput = document.getElementById("new-todo");
const todoList = document.getElementById("todo-list");
const clearCompletedButton = document.getElementById("clear-completed");
const todoCountElement = document.getElementById("todo-count");

// Todo list data
let todos = [];

// Function to render the todo list
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("flex", "items-center", "justify-between", "bg-gray-200", "px-4", "py-2", "rounded-md");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.classList.add("mr-2");
    checkbox.addEventListener("change", () => toggleTodoCompletion(index));

    const todoText = document.createElement("span");
    todoText.textContent = todo.text;
    todoText.classList.add("flex-1", "mr-2", { "line-through text-gray-500": todo.completed });

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash text-red-500 hover:text-red-600"></i>';
    deleteButton.addEventListener("click", () => deleteTodo(index));

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
  });

  updateTodoCount();
}

// Function to add a new todo
function addTodo() {
  const newTodoText = newTodoInput.value.trim();
  if (newTodoText) {
    todos.push({ text: newTodoText, completed: false });
    newTodoInput.value = "";
    renderTodos();
  }
}

// Function to toggle the completion of a todo
function toggleTodoCompletion(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

// Function to delete a todo
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Function to clear completed todos
function clearCompletedTodos() {
  todos = todos.filter((todo) => !todo.completed);
  renderTodos();
}

// Function to update the todo count
function updateTodoCount() {
  const incompleteTodos = todos.filter((todo) => !todo.completed).length;
  todoCountElement.textContent = `${incompleteTodos} items left`;
}

// Event listeners
newTodoInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

clearCompletedButton.addEventListener("click", clearCompletedTodos);

// Initial render
renderTodos();
