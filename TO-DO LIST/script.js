document.addEventListener('DOMContentLoaded', () =>{
const addButton = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#row input");
const taskContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) =>{
    countValue.textContent = taskCount;
};

const addTask = () =>{
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if(!taskName){
        setTimeout(()=>{
            error.style.display = "block";
        },200);
        return;
    }
    const task = `<div class = "task">
    <input type = "checkbox" class="task-check">
    <span class="taskName">${taskName}</span>
    <button class="edit">
    <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="delete">
    <i class="fa-solid fa-trash"></i>
    </button>
    </div>`;

    taskContainer.insertAdjacentHTML("beforeend", task);
    taskCount++;
    displayCount(taskCount);

    newTaskInput.value = '';
    attachEventListeners();
};

    const attachEventListeners = () =>{
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(button =>{
        button.onclick = () =>{
            button.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };
    });

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach(editBtn =>{
        editBtn.onclick = (e) =>{
            let targetElement = e.target;
            if(!(e.target.classList.contains("edit"))){
                targetElement = e.target.closest(".edit");
            }
            newTaskInput.value = targetElement.previousElementSibling.innerText;
            targetElement.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };
    });

    const taskCheck = document.querySelectorAll(".task-check");
    taskCheck.forEach((checkBox) =>{
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
            if(checkBox.checked){
                taskCount--;
            }else{
                taskCount++;
            }
            displayCount(taskCount);
        };
    });
};
    
if (addButton) {
    addButton.addEventListener("click", addTask);
} else {
    console.error('Button with id "add-btn" not found.');
}
attachEventListeners();

});
window.onload = () =>{
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = '';
};