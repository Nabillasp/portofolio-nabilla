
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");



function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Silakan masukkan tugas terlebih dahulu!");
        taskInput.focus();
        return;
    }


    const li = document.createElement("li");

    li.className =
        "flex items-center gap-3 " +
        "bg-pink-50 border border-pink-100 " +
        "p-4 rounded-xl";


    const span = document.createElement("span");

    span.textContent = taskText;

    span.className =
        "text-gray-700 flex-1";



    const doneButton = document.createElement("button");

    doneButton.type = "button";
    doneButton.textContent = "✓";

    doneButton.className =
        "w-9 h-9 rounded-full " +
        "bg-green-100 text-green-600 " +
        "hover:bg-green-200 " +
        "transition font-bold";


    doneButton.addEventListener("click", function () {

        span.classList.toggle("line-through");
        span.classList.toggle("text-gray-400");

    });



    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.textContent = "✕";

    deleteButton.className =
        "w-9 h-9 rounded-full " +
        "bg-red-100 text-red-500 " +
        "hover:bg-red-200 " +
        "transition font-bold";


    deleteButton.addEventListener("click", function () {

        li.remove();

    });


    li.appendChild(span);
    li.appendChild(doneButton);
    li.appendChild(deleteButton);


    taskList.appendChild(li);


    taskInput.value = "";

    taskInput.focus();
}


addButton.addEventListener("click", addTask);


taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        addTask();

    }

});