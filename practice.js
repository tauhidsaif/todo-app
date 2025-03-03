// Global tasks array
let tasks = [];

// On Page Loading
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    renderTasks();
});

// Function to save tasks in local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Function to remove the task
function removeTask(index) {
    tasks.splice(index, 1); // Remove task from array
    saveTasks();            // Update localStorage
    renderTasks();          // Re-render the list
    showError("⚠ Task removed!", "success");
}

// Render tasks to DOM
function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear current tasks

    tasks.forEach((taskText, index) => {
        let li = document.createElement("li");

        // Container for task number & text
        let taskContent = document.createElement("div");
        taskContent.classList.add("task-content");

        // Serial number span
        let taskNumber = document.createElement("span");
        taskNumber.classList.add("task-number");
        taskNumber.textContent = (index + 1) + ". ";

        // Task text span
        let taskTextElement = document.createElement("span");
        taskTextElement.classList.add("task-text");
        taskTextElement.textContent = taskText;

        taskContent.appendChild(taskNumber);
        taskContent.appendChild(taskTextElement);

        // Create delete button container
        let deleteBtnDiv = document.createElement("div");
        deleteBtnDiv.classList.add("deleteBtn_div");

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";
        deleteBtn.classList.add("delete-btn");

        // When delete is clicked, remove the task at this index
        deleteBtn.addEventListener("click", function() {
            removeTask(index);
        });
        deleteBtnDiv.appendChild(deleteBtn);

        li.appendChild(taskContent);
        li.appendChild(deleteBtnDiv);
        taskList.appendChild(li);
    });
}

// Function to add a task
function addTask() {
    let taskInput = document.getElementById("taskInput"); // Get input field
    let taskText = taskInput.value.trim();                // Remove extra spaces

    if (taskText === "") {
        showError("❌ Please enter a task!", "error");
        return;
    }

    // Add task to the array
    tasks.push(taskText);

    // Save the updated tasks array
    saveTasks();

    // Re-render the task list
    renderTasks();

    // Clear the input field
    taskInput.value = "";
}

// Add event listener for button click
document.getElementById("addTaskBtn").addEventListener("click", addTask);

// Function to remove all tasks
function removeAllTask() {
    if (tasks.length === 0) {
        showError("⚠ Nothing to remove!", "error");
        return;
    }

    tasks = [];    // Clear the array
    saveTasks();   // Update localStorage
    renderTasks(); // Re-render the list
    showError("😊 Everything Removed Buddy!", "success");
}

// Add event listener for remove button
document.getElementById("removeAllTask").addEventListener("click", removeAllTask);

// Task submission on hitting Enter key
document.getElementById("taskInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

// Function to show error messages
function showError(message, type = "warning") {
    let errorMsg = document.getElementById("errorMsg");
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
    errorMsg.style.opacity = "1"; // Fade in

    // Change background color based on type
    errorMsg.style.backgroundColor = 
        type === "error"   ? "#e74c3c" :
        type === "success" ? "#2ecc71" :
        type === "info"    ? "#3498db" :
                             "orange";

    // Hide after 2 seconds
    setTimeout(() => {
        errorMsg.style.opacity = "0"; // Start fading out
        setTimeout(() => {
            errorMsg.style.display = "none"; // Hide completely
        }, 500);
    }, 2000);
}

// Function to update serial numbers (if needed)
function updateTaskNumbers() {
    let taskItems = document.querySelectorAll("#taskList li");
    taskItems.forEach((li, index) => {
        let taskNumber = li.querySelector(".task-number");
        taskNumber.textContent = (index + 1) + ". ";
    });
}
