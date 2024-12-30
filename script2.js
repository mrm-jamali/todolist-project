const taskInput = document.querySelector("#task-input")
const dateInput = document.querySelector("#data-input")
const addBtn = document.querySelector("#add")
const editBtn = document.querySelector("#edit")
const alertmassage = document.querySelector("#alert-massage")
const todosBody = document.querySelector("tbody")
const deleteAllBtn = document.getElementById("delete-All")
const filterbtns=document.querySelectorAll(".fiter-todos")



let todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos)

const generateId = () => {
    return Math.round(Math.random() * Math.random() * Math.pow(10, 15)).toString();

}

generateId()

const showAlert = ((type, massage) => {
    alertmassage.innerHTML = ""
    const alert = document.createElement("p")
    alert.innerText = massage
    alert.classList.add("alert")
    alert.classList.add(`alert-${type}`)
    // alert.classList.add(`alert-${type}`)
    alertmassage.append(alert)

    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);

})


const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
}


const showTodos = (data) => {
    const todoList=data ? data : todos;
    todosBody.innerHTML = ""

    console.log(todoList)
    if (!todoList.length) {
        todosBody.innerHTML = "<tr><td colspan='4'>No task found</td></tr>"
        return
    }

    todoList.forEach(todo => {
        todosBody.innerHTML += `
         <tr>
          <td>${todo.task}</td>
          <td>${todo.date || "no date"}</td>
          <td>${todo.complated ?  "completed" : "pending"}</td>
          <td>
          <button onclick="editHandeler('${todo.id}')">edit</button>
          <button onclick="toggleHandeler('${todo.id}')">${todo.complated ? "undo" : "do"}</button>
          <button onclick="deleteHandeler('${todo.id}')">delete</button>
          </td>
         </tr>

        `

    });
}

const deleteHandeler = (id) => {
    console.log(id)
    const newTodo = todos.filter((todo) => todo.id !== id);
    console.log(newTodo)
    todos = newTodo
    saveToLocalStorage()
    showTodos()
    showAlert("success", "this todo was deleted")

}


const toggleHandeler = (id) => {
    console.log(id)
    const newTodo = todos.map((todo) => {
            if (todo.id === id) {
                return{
                    ...todo,
                    complated:!todo.complated,
                }
            } else {
                return todo
            }

        }
      )

    const todo=todos.find((todo)=>todo.id===id)
    console.log(todo)
    
      todos=newTodo
      saveToLocalStorage()
      showTodos()
      showAlert("success","todos have chandef susseffly")
}

const addTask = () => {

    const task = taskInput.value;
    const date = dateInput.value
    const todo = {
        id: generateId(),
        task,
        date,
        complated: false
    }
    if (task) {
        todos.push(todo)
        saveToLocalStorage();
        showTodos();
        console.log(todos)
        // showTodos();
        taskInput.value = "";
        dateInput.value = "";
        showAlert("success", "its ok")
    } else {

        showAlert("error", "plz fill the blanks")
    }

}


const deleteAllHandelete = () => {
    if (todos.length) {
        todos = []
        saveToLocalStorage()
        showTodos()
        showAlert("success", "all todos cleared sucessfully")
    } else {
        showAlert("error", "no todos to cleared")
    }


}

const editHandeler=id=>{
    console.log(id)
    const todo=todos.find((todo)=>todo.id===id)
    console.log(todo)
    taskInput.value=todo.task
    dateInput.value=todo.date
    addBtn.style.display="none"
    editBtn.style.display="inline-block"
    editBtn.dataset.id=id

}
const applyEditHandeler=(event)=>{
    const id=event.target.dataset.id
    
    const todo=todos.find(todo=>todo.id===id)
    todo.task=taskInput.value
    todo.date=dateInput.value
    taskInput.value="";
    dateInput.value="";
    addBtn.style.display="inline-block"
    editBtn.style.display="none";
    saveToLocalStorage()
    showTodos()
    showAlert("success","todo was edited sussefully")
}
const filterHandeler=(event)=>{
  let filterTodo=null
  const filter=event.target.dataset.filter;
switch (filter) {
    case "pending":
        filterTodo=todos.filter((todo) =>todo.complated===false);
        break;
    case "complated":
        filterTodo=todos.filter((todo) =>todo.complated===true);
        console.log(filterTodo)
        break;
    default: 
        filterTodo=todos;
        break;
}
showTodos(filterTodo)


}

window.addEventListener("load",()=> showTodos())
addBtn.addEventListener("click", addTask)
deleteAllBtn.addEventListener("click", deleteAllHandelete)
editBtn.addEventListener("click",applyEditHandeler)
filterbtns.forEach((button)=>{
    button.addEventListener("click",filterHandeler)
})