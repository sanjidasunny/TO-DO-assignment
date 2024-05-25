//Intials
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");


// Add to do 
addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTodo();
  }
});


function addTodo() {
  // Get the trimmed value from the todo input field
  const todoText = todoInput.value.trim();

  // Check if the input is not empty
  if (todoText !== "") {
    // Create a new list item
    const li = document.createElement("li");
    li.classList.add("todo-item");

    // Create a checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");
    
    li.appendChild(checkbox);

    // Create a span element to display the todo text
    const span = document.createElement("span");
    span.textContent = todoText;
    span.classList.add("todo-text");
    li.appendChild(span);

    // Create a div to hold the buttons and dropdown button
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    //  Edit button
    const editButton = document.createElement("button");
    editButton.classList.add("link-button", "editBtn");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", editTodo);
    
    buttonsDiv.appendChild(editButton);

    //  Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("link-button", "deleteBtn");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteTodo);
    buttonsDiv.appendChild(deleteButton);

    
    const dropdownButton = document.createElement("select");
    dropdownButton.classList.add("dropdownBtn");
    const priorityOption1 = document.createElement("option");
    priorityOption1.value = "1";
    priorityOption1.textContent = "1";
    const priorityOption2 = document.createElement("option");
    priorityOption2.value = "2";
    priorityOption2.textContent = "2";
    const priorityOption3 = document.createElement("option");
    priorityOption3.value = "3";
    priorityOption3.textContent = "3";
    dropdownButton.appendChild(priorityOption1);
    dropdownButton.appendChild(priorityOption2);
    dropdownButton.appendChild(priorityOption3);
    buttonsDiv.appendChild(dropdownButton);
    
    li.appendChild(buttonsDiv);

    // Clear the input field
    todoInput.value = "";

    // Append the list item to the todo list
    todoList.appendChild(li);
    todoList.scrollBy = todoList.scrollHeight;
    //console.log("hello");
    checkClearAllButton();
    todoInput.focus();
  }
}



//Edit toDo
function editTodo() {
  // Get a reference to the parent list item
  const listItem = this.parentElement.parentElement;

  // Get the existing todo text element
  const todoTextElement = listItem.querySelector(".todo-text");

  // Store the original todo text
  let originalText = "";
  if (todoTextElement) {
      originalText = todoTextElement.textContent;
  }

  // Remove the Edit and Delete buttons
  const editButton = listItem.querySelector(".editBtn");
  const deleteButton = listItem.querySelector(".deleteBtn");
  if (editButton && deleteButton) {
      editButton.style.display = "none";
      deleteButton.style.display = "none";
  }

  // Create an input field with the current text content
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = originalText;

  // Replace the todo text with the input field
  if (todoTextElement) {
      listItem.replaceChild(inputField, todoTextElement);
  }

  inputField.focus();

  //  Save button
  const saveButton = document.createElement("button");
  saveButton.classList.add("link-button", "saveBtn");
  saveButton.textContent = "Save";
  listItem.querySelector(".buttons").appendChild(saveButton);

  // Cancel button
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("link-button", "cancelBtn");
  cancelButton.textContent = "Cancel";
  listItem.querySelector(".buttons").appendChild(cancelButton);

  // Function to handle saving changes
  function handleSave() {
      // Get the updated todo text
      const updatedTodoText = inputField.value.trim();

      // Check if the updated todo text is not empty
      if (updatedTodoText !== "") {
          // Update the text content of the existing todo text element
          todoTextElement.textContent = updatedTodoText;

          // Restore the Edit and Delete buttons
          if (editButton && deleteButton) {
              editButton.style.display = "inline-block";
              deleteButton.style.display = "inline-block";
          }

          // Remove the input field and Save/Cancel buttons
          listItem.replaceChild(todoTextElement, inputField);
          listItem.querySelector(".buttons").removeChild(saveButton);
          listItem.querySelector(".buttons").removeChild(cancelButton);

          // Reattach the event listeners for editing and deleting
          editButton.addEventListener("click", editTodo);
          deleteButton.addEventListener("click", deleteTodo);
      }
  }

  // Add event listener to save button
  saveButton.addEventListener("click", handleSave);

  // Add event listener to cancel button
  cancelButton.addEventListener("click", function() {
      // Restore the Edit and Delete buttons
      if (editButton && deleteButton) {
          editButton.style.display = "inline-block";
          deleteButton.style.display = "inline-block";
      }

      // Remove the input field and Save/Cancel buttons
      listItem.replaceChild(todoTextElement, inputField);
      listItem.querySelector(".buttons").removeChild(saveButton);
      listItem.querySelector(".buttons").removeChild(cancelButton);

      // Reattach the event listeners for editing and deleting
      editButton.addEventListener("click", editTodo);
      deleteButton.addEventListener("click", deleteTodo);
  });

  editButton.removeEventListener("click", editTodo);
}


function deleteTodo() {
  this.parentElement.parentElement.remove();
}


todoList.addEventListener("change", function (event) {
  if (event.target.classList.contains("todo-checkbox")) {
    const todoTextElement = event.target.nextElementSibling;
    if (event.target.checked) {
      todoTextElement.style.textDecoration = "line-through";
      todoTextElement.style.textDecorationThickness = "3px";
      todoTextElement.style.textDecorationSkipInk = "center";
    } else {
      todoTextElement.style.textDecoration = "none";
    }
  }
});


const clearAllBtn = document.getElementById("clearAllBtn");

function checkClearAllButton() {
  const todoItems = document.querySelectorAll(".todo-item");
  if (todoItems.length > 0) {
    clearAllBtn.style.display = "block";
  } else {
    clearAllBtn.style.display = "none";
  }
}

clearAllBtn.addEventListener("click", clearAllTodos);


function clearAllTodos() {
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach(item => {
    item.remove();
  });
  
  clearAllBtn.style.display = "none";
}

checkClearAllButton();




