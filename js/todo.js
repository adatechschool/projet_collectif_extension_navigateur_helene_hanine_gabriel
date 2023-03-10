const boutton = document.getElementById("addButton");
boutton.addEventListener("click", addTask);
let userInp = document.getElementById("addTask");
const list = document.getElementById('myList');

// recuperate the todos from the local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function loadTasks(){

    list.innerHTML= " ";

    // loop through the todos
    for (let i = 0; i < todos.length; i++) {
    // create element li
    const nodeDiv = document.createElement('div');
    // insert every todo item in the li
    let userVal = document.createElement('input');
    userVal.value = todos[i].mytask;
    userVal.type="text"
    userVal.id = i;
    userVal.classList.add('taskfield')
     // add an id for every element to be able to refer to it
    nodeDiv.id = i;

    // create the input element
    let check = document.createElement("INPUT");
    Object.assign(check, {
      type : "checkbox",
      id:"checkbox"
    })

    // create delete button element
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent= "X";
    Object.assign(deleteBtn, {
      type : "button",
    })
    deleteBtn.classList.add('delBtn')
     // create edit button element
    let editBtn = document.createElement("button");
    editBtn.textContent= "E";
    Object.assign(editBtn, {
      type : "button",
    })
    editBtn.classList.add('edBtn')
    //add the event listener to the button
    deleteBtn.addEventListener("click",() => deleteItem(nodeDiv));


    editBtn.addEventListener('click', () => editTask(userVal));


    // append input, deletebtn to nodeDiv (div element)
    nodeDiv.appendChild(check);
    nodeDiv.appendChild(userVal);
    nodeDiv.appendChild(editBtn);
    nodeDiv.appendChild(deleteBtn);
    
    //Append nodeDiv to <ul>-
    document.getElementById("myList").appendChild(nodeDiv); 
    
        // Save the to-dos to local storage
    localStorage.setItem('todos', JSON.stringify(todos));


    }
}


function addTask(){
    let task = userInp.value.trim();
    // Add the new to-do to the list
    todos.push({ mytask: task});
    
    // Clear the input
    userInp.value = '';
    loadTasks();
    
  }

  function editTask(elem){

    let newTask = elem.value
    //console.log(newTask)
   
    todos.splice(elem.id, 1 , {mytask: newTask});
    localStorage.setItem('todos', JSON.stringify(todos));
}  

// create the delete function that removes the nodeDiv when the button in the node is clicked
function deleteItem(elem){
    todos.splice(elem.id,1);
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTasks();
    } 

window.onload=loadTasks() 