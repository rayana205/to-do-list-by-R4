document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
  
    
    loadTasks();
  
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const title = document.getElementById("title").value.trim();
      const description = document.getElementById("description").value.trim();
  
      
      if (title.length < 5 || title.length > 25) {
        alert("Judul harus antara 5 hingga 25 karakter.");
        return;
      }
      if (description.length < 20 || description.length > 100) {
        alert("Deskripsi harus antara 20 hingga 100 karakter.");
        return;
      }
  
      
      const task = { title, description, done: false };
      saveTask(task);
  
      
      taskForm.reset();
  
      
      loadTasks();
    });
  
    function saveTask(task) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function loadTasks() {
      taskList.innerHTML = "";
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
      tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.done) {
          taskElement.classList.add("done");
        }
  
        taskElement.innerHTML = `
          <div>
            <h3>${task.title}</h3>
            <p>${task.description}</p>
          </div>
          <div>
            <button onclick="toggleTask(${index})">${task.done ? "Undo" : "Done"}</button>
            <button onclick="deleteTask(${index})">Hapus</button>
          </div>
        `;
  
        taskList.appendChild(taskElement);
      });
    }
  
    window.toggleTask = (index) => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks[index].done = !tasks[index].done;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };
  
    window.deleteTask = (index) => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    };
  });