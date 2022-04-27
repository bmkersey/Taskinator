var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var pageContentE1 = document.querySelector("#page-content");
var tasksInProgressE1 = document.querySelector("#tasks-in-progress");
var tasksCompletedE1 = document.querySelector("#tasks-completed")
var taskIdCounter = 0;
var tasks = [];


var taskFormHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form!!");
        return false;
    }

    formE1.reset();

    //make data an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
    };

    var isEdit = formE1.hasAttribute("data-task-id");
    
    
    if (isEdit) {
        var taskId = formE1.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else{
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        createTaskE1(taskDataObj)
    }

};


var createTaskE1 = function(taskDataObj){

    //create list item
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";
    //add task id as a custom attribute
    listItemE1.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoE1 = document.createElement("div");
    //give it a class name
    taskInfoE1.className = "task-info"
    //add html content to div
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemE1.appendChild(taskInfoE1);

    var taskActionsE1 = createTaskActions(taskIdCounter);
    listItemE1.appendChild(taskActionsE1)
    
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    saveTasks();

    tasksToDoE1.appendChild(listItemE1);

    taskIdCounter++;


};

var createTaskActions = function(taskId){

    var actionContainerE1 = document.createElement("div");
    actionContainerE1.className = "task-actions";
    // create edit button
    var editButtonE1 = document.createElement("button");
    editButtonE1.textContent = "Edit";
    editButtonE1.className = "btn edit-btn";
    editButtonE1.setAttribute("data-task-id", taskId)
    actionContainerE1.appendChild(editButtonE1);

    // create delete button
    var deleteButtonE1 = document.createElement("button");
    deleteButtonE1.textContent = "Delete";
    deleteButtonE1.className = "btn delete-btn";
    deleteButtonE1.setAttribute("data-task-id", taskId);
    actionContainerE1.appendChild(deleteButtonE1);

    //create dropdown menu
    var statusSelectE1 = document.createElement("select");
    statusSelectE1.className = "select-status";
    statusSelectE1.setAttribute("name","status-change");
    statusSelectE1.setAttribute("data-task-id", taskId);
    actionContainerE1.appendChild(statusSelectE1);

    var statusChoices = ["To Do", "In Progress", "Completed"]

    for (var i = 0; i< statusChoices.length; i++){
        //creat options in drop down
        var statusOptionE1 = document.createElement("option")
        statusOptionE1.textContent = statusChoices[i]
        statusOptionE1.setAttribute("value", statusChoices[i])
        statusSelectE1.appendChild(statusOptionE1);
        };

    return actionContainerE1;

};

var taskButtonHandler = function(event){
    var targetE1 = event.target

    if (targetE1.matches(".edit-btn")){
        var taskId = targetE1.getAttribute("data-task-id")
        editTask(taskId)
    }else if (targetE1.matches(".delete-btn")){
        var taskId = targetE1.getAttribute("data-task-id")
        deleteTask(taskId)
    }

}

var editTask = function(taskId){
    
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId +"']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    
    document.querySelector("input[name='task-name']").value= taskName;
    document.querySelector("select[name='task-type']").value= taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formE1.setAttribute("data-task-id", taskId)
}

var completeEditTask = function(taskName, taskType, taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    for (var i = 0; i < tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };
    alert("Task has been successfully updated!!");
    formE1.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task"
    saveTasks();
}

var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    var updatedTaskArr = [];
    for (var i = 0; i < tasks.length; i++){
        if (tasks[i].id !== parseInt(taskId)){
            updatedTaskArr.push(tasks[i])
        }
    }

    tasks = updatedTaskArr
    saveTasks();
};

var taskStatusChangeHandler = function(event){
    var taskId = event.target.getAttribute("data-task-id");
    var statusValue = event.target.value.toLowerCase();
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do"){
        tasksToDoE1.appendChild(taskSelected);
    }else if (statusValue === "in progress"){
        tasksInProgressE1.appendChild(taskSelected);
    }else if (statusValue === "completed"){
        tasksCompletedE1.appendChild(taskSelected);
    };

    for (var i = 0; i < tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].status = statusValue
        }
    }
    saveTasks()

};
var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function(){
    //get items from storage
    tasks = localStorage.getItem("tasks", JSON.parse(tasks));
    //convert strings

    //itterate through to create elements
    for (var i = 0; i < tasks.length; i++){
        tasks[i].id = taskIdCounter
        var listItemE1 = document.createElement('li')
        listItemE1.className = "task-item"
        listItemE1.setAttribute("data-task-id", tasks[i].id)
        var taskInfoE1 = document.createElement("div")
        taskInfoE1.className = "task-info"
        taskInfoE1.innerHTML = "<h3 class='class-name-task'>" + tasks[i].name + "</h3><span class='class-type'>" + tasks[i].type + "</span>";
        listItemE1.appendChild(taskInfoE1)
        var taskActionsE1 = createTaskActions(tasks[i].id)
        listItemE1.appendChild(taskActionsE1);

        if(tasks[i].status === "to do"){
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 0
            tasksToDoE1.appendChild(listItemE1);
        } else if (tasks[i].status === "in progress"){
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 1
            tasksInProgressE1.appendChild(listItemE1);
        } else if (tasks[i].staus === "complete"){
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 2
            tasksCompletedE1.appendChild(listItemE1)
        }
        taskIdCounter++;
    }

}

formE1.addEventListener("submit", taskFormHandler);
pageContentE1.addEventListener("click", taskButtonHandler);
pageContentE1.addEventListener("change", taskStatusChangeHandler);