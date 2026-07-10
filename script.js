const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

// Load tasks when page opens
loadTasks();

// Add task button
addBtn.addEventListener("click", addTask);

// Press Enter to add task
taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

// Search tasks
searchInput.addEventListener("keyup", searchTasks);

function addTask() {

    const task = taskInput.value.trim();

    if(task === ""){
        alert("Please enter a task!");
        return;
    }

    createTask(task,false);

    taskInput.value="";

    saveTasks();

}

function createTask(task,isCompleted){

    const li=document.createElement("li");

    const taskText=document.createElement("span");
    taskText.textContent=task;

    if(isCompleted){
        taskText.classList.add("completed");
    }

    // Complete task
    taskText.addEventListener("click",function(){

        taskText.classList.toggle("completed");

        saveTasks();

        updateCounter();

    });

    // Edit Button
    const editBtn=document.createElement("button");
    editBtn.textContent="✏️";

    editBtn.addEventListener("click",function(e){

        e.stopPropagation();

        const newTask=prompt("Edit Task",taskText.textContent);

        if(newTask!==null && newTask.trim()!==""){

            taskText.textContent=newTask.trim();

            saveTasks();

        }

    });

    // Delete Button
    const deleteBtn=document.createElement("button");
    deleteBtn.textContent="🗑️";

    deleteBtn.addEventListener("click",function(e){

        e.stopPropagation();

        li.remove();

        saveTasks();

        updateCounter();

    });

    const buttonBox=document.createElement("div");

    buttonBox.appendChild(editBtn);

    buttonBox.appendChild(deleteBtn);

    li.appendChild(taskText);

    li.appendChild(buttonBox);

    taskList.appendChild(li);

    updateCounter();

}

// Save Tasks
function saveTasks(){

    const tasks=[];

    document.querySelectorAll("#taskList li").forEach(function(li){

        tasks.push({

            text:li.querySelector("span").textContent,

            completed:li.querySelector("span").classList.contains("completed")

        });

    });

    localStorage.setItem("tasks",JSON.stringify(tasks));

}

// Load Tasks
function loadTasks(){

    const tasks=JSON.parse(localStorage.getItem("tasks")) || [];

    taskList.innerHTML="";

    tasks.forEach(function(task){

        createTask(task.text,task.completed);

    });

}

// Search Tasks
function searchTasks(){

    const value=searchInput.value.toLowerCase();

    const tasks=document.querySelectorAll("#taskList li");

    tasks.forEach(function(task){

        const text=task.querySelector("span").textContent.toLowerCase();

        if(text.includes(value)){

            task.style.display="flex";

        }

        else{

            task.style.display="none";

        }

    });

}

// Update Counter
function updateCounter(){

    const total=document.querySelectorAll("#taskList li").length;

    const completed=document.querySelectorAll(".completed").length;

    const remaining=total-completed;

    document.getElementById("totalTasks").textContent="📋 Total : "+total;

    document.getElementById("completedTasks").textContent="✅ Done : "+completed;

    document.getElementById("remainingTasks").textContent="⏳ Left : "+remaining;

}

updateCounter();