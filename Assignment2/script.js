document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    let tasks = [];

    taskForm.onsubmit = function (event) {
        event.preventDefault();

        const taskTitle = document.getElementById("taskTitle").value.trim();
        const taskPriority = document.getElementById("taskPriority").value;
        const taskStatus = document.querySelector('input[name="taskStatus"]:checked').value;

        if (taskTitle === "") return;

        const task = {
            id: Date.now(),
            title: taskTitle,
            priority: taskPriority,
            status: taskStatus
        };

        tasks.push(task);

        renderTask(task);

        taskForm.reset();
    };

    function renderTask(task) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.dataset.id = task.id;

        const taskText = document.createElement("span");
        taskText.textContent = `${task.title} [${task.priority}]`;
        if (task.status === "Completed") taskText.classList.add("completed");

        const buttonsDiv = document.createElement("div");

        const completeBtn = document.createElement("button");
        completeBtn.className = "btn btn-success btn-sm me-2";
        completeBtn.textContent = "Complete";
        completeBtn.onclick = () => markTaskComplete(task.id);

        const removeBtn = document.createElement("button");
        removeBtn.className = "btn btn-danger btn-sm";
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => removeTask(task.id);

        buttonsDiv.appendChild(completeBtn);
        buttonsDiv.appendChild(removeBtn);

        li.appendChild(taskText);
        li.appendChild(buttonsDiv);
        taskList.appendChild(li);
    }

    function markTaskComplete(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.status = "Completed";
            const taskItem = document.querySelector(`li[data-id='${taskId}'] span`);
            taskItem.classList.add("completed");
        }
    }

    function removeTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        document.querySelector(`li[data-id='${taskId}']`).remove();
    }
});
