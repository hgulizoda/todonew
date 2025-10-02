let tasks = [];

const tasksBox = document.querySelector(".toDo-box_bottom");
const input = document.getElementById("input");
const addBtn = document.getElementById("add");

const date = document.getElementById("date");
const now = new Date();
date.innerHTML = now.toLocaleDateString();

addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return alert("You have to write something!");

  tasks.push({ id: Date.now(), name: taskText, status: false });
  renderTasks();
  input.value = "";
}

function renderTasks() {
  tasksBox.innerHTML = "";
  tasks.forEach((todo) => {
    const task = document.createElement("div");
    task.classList.add("task");
    task.dataset.id = todo.id;

    const left = document.createElement("div");
    left.classList.add("left");

    const check = document.createElement("div");
    check.classList.add("check");
    const checkSpan = document.createElement("span");
    checkSpan.innerHTML = "✔";
    if (todo.status) checkSpan.classList.add("checked");
    check.appendChild(checkSpan);

    const taskText = document.createElement("p");
    taskText.textContent = todo.name;
    if (todo.status) taskText.classList.add("checked");

    left.append(check, taskText);

    const right = document.createElement("div");
    right.classList.add("right");

    const erase = document.createElement("button");
    erase.classList.add("delete");
    erase.textContent = "Delete";

    const edit = document.createElement("button");
    edit.classList.add("edit");
    edit.textContent = "Edit";

    right.append(erase, edit);
    task.append(left, right);
    tasksBox.appendChild(task);
  });
}

tasksBox.addEventListener("click", (e) => {
  const taskDiv = e.target.closest(".task");
  if (!taskDiv) return;
  const id = Number(taskDiv.dataset.id);
  const todo = tasks.find((t) => t.id === id);

  if (e.target.classList.contains("delete")) {
    tasks = tasks.filter((t) => t.id !== id);
    renderTasks();
  }

  if (e.target.classList.contains("edit")) {
    input.value = todo.name;
    updatedId = todo.id;
    addBtn.textContent = "Save";
    tasks.filter((todo) => todo.id !== id);
  }

  if (e.target.closest(".check")) {
    todo.status = !todo.status;
    renderTasks();
  }
});

addBtn.innerHTML = "Add";
