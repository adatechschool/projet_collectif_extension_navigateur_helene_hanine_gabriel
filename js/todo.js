const boutton = document.getElementById("button")
boutton.addEventListener("click", addTask);
let userInp = document.getElementById("addTask")
const list = document.getElementById('myList');

// recuperate the todos from the local storage
let todos = JSON.parse(localStorage.getItem('todos')) || []


function loadTasks(){

    list.innerHTML= " "

    // loop through the todos
    for (let i = 0; i < todos.length; i++) {
    // create element li
    const nodeLi = document.createElement('li');
    // insert every todo item in the li
    nodeLi.textContent = todos[i].mytask;
    nodeLi.id = i; // add an id for every element to be able to refer to it


    // create the input element
    let check = document.createElement("INPUT")
    Object.assign(check, {
      type : "checkbox"
    })

    // create delete button element
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent= "X"
    Object.assign(deleteBtn, {
      type : "button"
    })
    
    //add the event listener to the button
    deleteBtn.addEventListener("click", deleteItem)

    // create the delete function that removes the nodeLI when the button in the node is clicked
      function deleteItem(){
        const list = document.getElementById("myList");
        todos.splice(nodeLi.id,1)
        list.removeChild(nodeLi);
        localStorage.setItem('todos', JSON.stringify(todos))
    } 

    // append input, deletebtn to nodeLI (li element)
    nodeLi.appendChild(check);
    nodeLi.appendChild(deleteBtn);
    
    //Append nodeLi to <ul>
    document.getElementById("myList").appendChild(nodeLi); 
    
        // Save the to-dos to local storage
    localStorage.setItem('todos', JSON.stringify(todos));


    }
}


function addTask(){
    let task = userInp.value.trim()
    // Add the new to-do to the list
    todos.push({ mytask: task});

    // Clear the input
    userInp.value = '';

    loadTasks();
}


loadTasks()

