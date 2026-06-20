// this url is the server dirwection

    


const API="https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function saveTask(){
    // 1. get values from the DOM
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    // 2. crbudgeteate an object using our class (model)
    const taskToSave = new Task(title,desc,color,date,status,budget);
    console.log(taskToSave);

    

    // 3. send to server
    $.ajax({
        type: "POST" ,
        url: API,
        data: JSON.stringify(taskToSave),
        contentType: "application/json",
        success: function(created){
            console.log(created);
            // displayTask(created);
        },
        error: function(err){
            console.log(err);
        }
    });
    
}

function updateTask(){
    $.ajax({
        type: "PUT",
        url: "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks/1",
        data: JSON.stringify(
            {
                title: "hello this is the new method",
                budget: 159
            }
        ),
        contentType:"application/json",
        success: function(response){
                console.log(response);
        },
        error: function(err){
            console.log(err);
        }


    });
    
}

function loadTask(){
    $.ajax({
        type:"GET",
        url: API,
        success: function(data){
            console.log(data);
            data.forEach(task => displayTask(task));
        },
        error: function(err){
                console.log(err);
        }

    });
}
function displayTask(task){
    let syntax = `
    <div  class="task"id="${task.id}" style="border-color:${task.color}">
        <div class="info">
            <h4 class="task-title">${task.title}</h4>
            <p class="task-desc"  >${task.desc}</p>
        </div>
        <label class="status">${task.status}</label>
        <div class= "date-budget">
            <label>${task.date}</label>
            <label>${task.budget}</label>
        </div>
        <div>
            <button class="btn-delete">🗑️</button>
        </div>
    </div>
    `;
    // inject new html into the dom
    $(".list").append(syntax);
}

function init(){
    console.log("hello world")
    $("#btnSave").click(saveTask);
// old way
    // $(".btn-delete").click(deleteTask);

    // new way event delegation
    // on click inside of .list, if the target is btn
    $(".list").on("click",".btn-delete",deleteTask);


    loadTask();
    
}

function deleteTask(){
    // context for specific button
    let btn = $(this);

    // 2. find the parent 
    let taskElement = btn.parents(".task");

    // 3.extraction get ID that we save in the html
    let id = taskElement.attr("id");

    console.log("The requesting id is: ", id)

    // 4. server connection
    $.ajax(
        {
            type:"delete",
            url: API + "/" + id,
            success: function(){
                taskElement.fadeOut(500,function(){
                    $(this).remove();
                });
            },error: function(err){
                    console.log("error");
            }
        }
    )
};




window.onload = init; // force the html and the css gets resolved before that i run the logic