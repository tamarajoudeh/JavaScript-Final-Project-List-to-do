let tasks = []

function addTask() {
    let input = document.getElementById("taskInput")
    let taskName = input.value
    if (taskName != "") {
        let task = {
            name: taskName,
            done: false
        }
        tasks.push(task)
        saveTasks()
        input.value = ""
        showAll()
    }
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function loadTasks() {
    let saved = localStorage.getItem("tasks")
    if (saved) {
        tasks = JSON.parse(saved)
    }
}

function showAll() {
    showTasks(tasks)
}

function showCompleted() {
    let doneTasks = tasks.filter(t => t.done)
    showTasks(doneTasks)
}

function showIncomplete() {
    let notDone = tasks.filter(t => !t.done)
    showTasks(notDone)
}

function showTasks(taskArray) {
    let list = document.getElementById("taskList")
    list.innerHTML = ""

    for (let i = 0; i < taskArray.length; i++) {
        let li = document.createElement("li")
        let check = document.createElement("input")
        check.type = "checkbox"
        check.checked = taskArray[i].done

        check.onchange = function () {
            taskArray[i].done = this.checked
            saveTasks()
        }

        let span = document.createElement("span")
        span.textContent = taskArray[i].name

        let delBtn = document.createElement("button")
        delBtn.textContent = "Delete"
        delBtn.onclick = function () {
            tasks.splice(tasks.indexOf(taskArray[i]), 1)
            saveTasks()
            showAll()
        }

        li.appendChild(check)
        li.appendChild(span)
        li.appendChild(delBtn)

        list.appendChild(li)
    }
}

loadTasks()
showAll()
