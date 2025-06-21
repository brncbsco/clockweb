
const tasks = document.getElementById("taskcontainer");
loaddata();

const confirm = document.getElementById("confirm");
const add = document.getElementById("addbutton");
const input = document.getElementById("inputadd");
let y;
let x;
tasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("trash")) {
        e.target.parentElement.remove();
        storedata();
        return;
    }

    if (e.target.classList.contains("edit")) {
        const taskDiv = e.target.parentElement;
        const textSpan = taskDiv.querySelector(".text");
        const textContent = textSpan.textContent;

        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("textedit");
        input.value = textContent;

        taskDiv.replaceChild(input, textSpan);

        e.target.classList.remove("edit");
        e.target.classList.add("check");
        e.target.textContent = "✔️";

        input.focus();input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (input.value.trim().length > 0) {
            const array = update();
            if (!array.includes(input.value)) {
                const newSpan = document.createElement("span");
                newSpan.classList.add("text");
                newSpan.textContent = input.value;

                taskDiv.replaceChild(newSpan, input);

                e.target.classList.remove("check");
                e.target.classList.add("edit");
                e.target.textContent = "✏️";

                storedata();
                update();
            } else {
                confirm.textContent = "Task already created.";
                confirm.style.color = "red";
            }
        } else {
            confirm.textContent = "Please type a task.";
            confirm.style.color = "red";
        }
    }
});


        return;
    }

    if (e.target.classList.contains("check")) {
        const taskDiv = e.target.parentElement;
        const input = taskDiv.querySelector("input.textedit");
        if (input.value.trim().length>0){
            const array = update();
            if(!array.includes(input.value)){
                const newSpan = document.createElement("span");
                newSpan.classList.add("text");
                newSpan.textContent = input.value;

                taskDiv.replaceChild(newSpan, input);

                e.target.classList.remove("check");
                e.target.classList.add("edit");
                e.target.textContent = "✏️";

                storedata();
                update();
                
            }
            else{
                confirm.textContent = "Task already created."
                confirm.style.color = "red";
            }

    }
    else{
    confirm.style.color = "red";
    confirm.textContent = "Please type a task";
}
}});

function update(){
const array = []
document.querySelectorAll(".task .text").forEach(x =>{
    array.push(x.textContent);
})
return array;
};

add.addEventListener("click", () =>{
    let inputvalue = input.value;
if (input.value.trim().length>0){
    const array = update();
    if (!array.includes(input.value)){
    let newtask = document.createElement("div");
    newtask.classList.add("task");
    let newtext = document.createElement("span");
    newtext.classList.add("text");
    newtext.textContent = inputvalue;
    let newtrash = document.createElement("button");
    newtrash.textContent = "🗑️";
    newtrash.classList.add("trash");
    let newedit = document.createElement("button");
    newedit.textContent = "✏️";
    newedit.classList.add("edit");

    input.value = "";

    tasks.insertBefore(newtask, tasks.firstChild);
    newtask.appendChild(newtext);
    newtask.appendChild(newedit);
    newtask.appendChild(newtrash);
    update();
    storedata();
    confirm.textContent ="Task created successfully."
    confirm.style.color = "green";
    setTimeout(() =>{
        confirm.textContent ="";
    }, 5000)}
    else{
        input.value = "";
        confirm.textContent = "Task already created."
        confirm.style.color = "red";
    }}



else{
    input.value = "";
    confirm.style.color = "red";
    confirm.textContent = "Please type a task";
}

})

input.addEventListener("keydown",(e)=>{
    if (e.key === "Enter"){
        let inputvalue = input.value;
if (input.value.trim().length>0){
    const array = update();
    if (!array.includes(input.value)){
    let newtask = document.createElement("div");
    newtask.classList.add("task");
    let newtext = document.createElement("span");
    newtext.classList.add("text");
    newtext.textContent = inputvalue;
    let newtrash = document.createElement("button");
    newtrash.textContent = "🗑️";
    newtrash.classList.add("trash");
    let newedit = document.createElement("button");
    newedit.textContent = "✏️";
    newedit.classList.add("edit");

    input.value = "";

    tasks.insertBefore(newtask, tasks.firstChild);
    newtask.appendChild(newtext);
    newtask.appendChild(newedit);
    newtask.appendChild(newtrash);
    update();
    storedata();
    confirm.textContent ="Task created successfully."
    confirm.style.color = "green";
    setTimeout(() =>{
        confirm.textContent ="";
    }, 5000)}
    else{
        input.value = "";
        confirm.textContent = "You already have a task with this name.";
        confirm.style.color = "red";
    }}



else{
    input.value = "";
    confirm.style.color = "red";
    confirm.textContent = "Please type a task";
}

}})



function storedata(){
    const tasksarray = [];
    document.querySelectorAll(".task .text").forEach(text =>{
        tasksarray.push(text.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasksarray));
}

function loaddata(){
    const savedtasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    savedtasks.forEach(tasktext => {

    let newtask = document.createElement("div");
    newtask.classList.add("task");

    let newtext = document.createElement("span");
    newtext.classList.add("text");
    newtext.textContent = tasktext;

    let newtrash = document.createElement("button");
    newtrash.textContent = "🗑️";
    newtrash.classList.add("trash");

    let newedit = document.createElement("button");
    newedit.textContent = "✏️";
    newedit.classList.add("edit");

    tasks.appendChild(newtask);
    newtask.appendChild(newtext);
    newtask.appendChild(newedit);
    newtask.appendChild(newtrash);}
    )};