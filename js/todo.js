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
    const nodeLi = document.createElement('li');
    // insert every todo item in the li
    let userVal = document.createElement('input');
    userVal.value = todos[i].mytask;
    userVal.id = i;

     // add an id for every element to be able to refer to it
    nodeLi.id = i;

    // create the input element
    let check = document.createElement("INPUT");
    Object.assign(check, {
      type : "checkbox"
    })

    // create delete button element
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent= "X";
    Object.assign(deleteBtn, {
      type : "button",
    })

     // create edit button element
    let editBtn = document.createElement("button");
    editBtn.textContent= "Edit";
    Object.assign(editBtn, {
      type : "button",
    })
    
    //add the event listener to the button
    deleteBtn.addEventListener("click",() => deleteItem(nodeLi));

    //editBtn.addEventListener('click', () => editTask(nodeLi, userVal));

    // append input, deletebtn to nodeLI (li element)
    nodeLi.appendChild(check);
    nodeLi.appendChild(userVal);
    nodeLi.appendChild(editBtn);
    nodeLi.appendChild(deleteBtn);
    
    //Append nodeLi to <ul>-
    document.getElementById("myList").appendChild(nodeLi); 
    
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

/* function editTask(elem, elem2){

    let newTask = document.getElementById(elem2.id).value;
    console.log(newTask)

    todos.splice(elem.id,1, newTask);
    todos.push({ mytask: newTask});
    localStorage.setItem('todos', JSON.stringify(todos));

}  */

// create the delete function that removes the nodeLI when the button in the node is clicked
function deleteItem(elem){
    todos.splice(elem.id,1);
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTasks();
    } 

window.onload=loadTasks() 