// Retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// 💡 NEW: Constant for the Priority Selector input
const priorityInput = document.getElementById("priorityInput"); 

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); 
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const newTaskText = todoInput.value.trim();
  // 💡 NEW: Get priority value
  const newPriority = priorityInput ? priorityInput.value : "medium";
  
  if (newTaskText !== "") {
   
    todo.push({ 
      title: newTaskText, 
      disabled: false, // Used for completion check
      priority: newPriority, 
      status: "pending" 
    });
    saveToLocalStorage();
    todoInput.value = "";
    // Reset priority input to default
    if (priorityInput) priorityInput.value = "medium"; 
    displayTasks();
  }
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
  
    const currentStatus = item.disabled ? "completed" : "pending";
    item.status = currentStatus; // Sync status property
    
    const p = document.createElement("p");
    // 💡 UPDATED: Use item.title and add priority class to container
    p.innerHTML = `
      <div class="todo-container ${item.priority}-priority">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
        
        <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    } task-title" onclick="editTask(${index})">${item.title}</p>
        
        <span class="task-priority">${item.priority}</span>
        <span class="task-status">${item.status}</span>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
 
  const existingText = todo[index].title;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      // 💡 UPDATED: Save to 'title' property
      todo[index].title = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  // 💡 UPDATED: Update the 'status' property
  todo[index].status = todo[index].disabled ? "completed" : "pending";
  saveToLocalStorage();
  displayTasks();
}

function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
