var formE1 = document.querySelector("#task-form")
var tasksToDoE1 = document.querySelector("#tasks-to-do")


var createTaskHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
//create list item
    var listItemE1 = document.createElement("li");
//create div to hold task info and add to list item
    var taskInfoE1 = document.createElement("div");
//give it a class name
    taskInfoE1.className = "task-info"
//add html content to div
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    listItemE1.appendChild(taskInfoE1);

    listItemE1.className = "task-item";
    
    tasksToDoE1.appendChild(listItemE1);

};

formE1.addEventListener("submit", createTaskHandler);