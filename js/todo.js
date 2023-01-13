const boutton = document.getElementById("button")
boutton.addEventListener("click", addTask);
let userInp = document.getElementById("addTask")

let listItems = []

function addTask(){
    // recuperate the value of the user input
    let task = userInp.value

    listItems.push(task)
    // create the "li" element
    let nodeLi = document.createElement("li")
    // create the input element
    let check = document.createElement("INPUT")
    Object.assign(check, {
      type : "checkbox"
    })

    // create button element
    let btn = document.createElement("button");
    btn.innerHTML= "X"
    Object.assign(btn, {
      type : "button"
    })
    //add the event listener to the button
    btn.addEventListener("click", deleteItem)
    // append input, btn to nodeLI (li element)
    nodeLi.appendChild(check)
    const textnode = document.createTextNode(task)
    nodeLi.appendChild(textnode)
    nodeLi.appendChild(btn)
   
    // store an item in the local storage
    
    //Append nodeLi to <ul>
    document.getElementById("myList").appendChild(nodeLi);

   console.log(task)

    // create the delete function that removes the nodeLI when the button in the node is clicked
  function deleteItem(){
        const list = document.getElementById("myList");
        list.removeChild(nodeLi);
    }  
    
    localStorage.setItem('todoItems', JSON.stringify(listItems))

}




 