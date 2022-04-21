var buttonE1 = document.querySelector("#save-task")
var tasksToDoE1 = document.querySelector("#tasks-to-do")


var createTaskHandler = function(){

    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";
    listItemE1.textContent = "This is a new task.";
    tasksToDoE1.appendChild(listItemE1);

};

buttonE1.addEventListener("click", createTaskHandler);