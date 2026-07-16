// ==========================
// TaskFlow Pro
// ==========================

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

const total = document.getElementById("total");
const completed = document.getElementById("completed");
const left = document.getElementById("left");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ==========================
// Save Tasks
// ==========================

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ==========================
// Update Statistics
// ==========================

function updateStats() {

    total.textContent = tasks.length;

    const completedTasks = tasks.filter(task => task.completed).length;

    completed.textContent = completedTasks;

    left.textContent = tasks.length - completedTasks;

}

// ==========================
// Render Tasks
// ==========================

function renderTasks(filter = "") {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        if (!task.text.toLowerCase().includes(filter.toLowerCase())) return;

        const li = document.createElement("li");

        li.className = task.completed ? "task completed" : "task";

        li.innerHTML = `

        <div class="task-left">

            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${index})">

            <span>${task.text}</span>

        </div>

        <div class="actions">

            <button class="edit"
                onclick="editTask(${index})">

                <i class="fa-solid fa-pen"></i>

            </button>

            <button class="delete"
                onclick="deleteTask(${index})">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

        taskList.appendChild(li);

    });

    updateStats();

}

// ==========================
// Add Task
// ==========================

addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task!");

        return;

    }

    tasks.push({

        text: text,

        completed: false

    });

    taskInput.value = "";

    saveTasks();

    renderTasks(searchInput.value);

});

// Enter Key

taskInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        addBtn.click();

    }

});// ==========================
// Delete Task
// ==========================

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    renderTasks(searchInput.value);

}

// ==========================
// Complete Task
// ==========================

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    renderTasks(searchInput.value);

}

// ==========================
// Edit Task
// ==========================

function editTask(index) {

    const newTask = prompt("Edit Task", tasks[index].text);

    if (newTask !== null && newTask.trim() !== "") {

        tasks[index].text = newTask.trim();

        saveTasks();

        renderTasks(searchInput.value);

    }

}

// ==========================
// Search
// ==========================

searchInput.addEventListener("keyup", function () {

    renderTasks(this.value);

});

// ==========================
// Mobile Sidebar
// ==========================

menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("show");
    overlay.classList.toggle("show");

});

// Close sidebar by clicking overlay

overlay.addEventListener("click", () => {

    sidebar.classList.remove("show");
    overlay.classList.remove("show");

});

// Close sidebar after clicking menu item

document.querySelectorAll(".sidebar li").forEach(item => {

    item.addEventListener("click", () => {

        sidebar.classList.remove("show");
        overlay.classList.remove("show");

    });

});

// ==========================
// Close sidebar on desktop resize
// ==========================

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {

        sidebar.classList.remove("show");
        overlay.classList.remove("show");

    }

});

// ==========================
// Start App
// ==========================

renderTasks();
