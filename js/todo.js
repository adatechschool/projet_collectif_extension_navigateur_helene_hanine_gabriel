const boutton = document.getElementById("button")
boutton.addEventListener("click", addTask);

function addTask(){
    // recuperate the value of the user input
  let task = document.getElementById("addTask").value
    // create the "li" element
    let nodeLi = document.createElement("li")
    // add the value 
    let check = document.createElement("INPUT")
    Object.assign(check, {
      type : "checkbox"
    })
    let btn = document.createElement("button");
    btn.innerHTML= "X"
    Object.assign(btn, {
      type : "button",
      value: "delete",
      //onClick : nodeLi.removeChild()
    })
    nodeLi.appendChild(check)
    const textnode = document.createTextNode(task)
    nodeLi.appendChild(textnode)
    nodeLi.appendChild(btn)
   
    
 

   document.getElementById("myList").appendChild(nodeLi);
}

// function deleteItem(){
    
//    const list = document.getElementById("myList");
//   list.removeChild(list.ElementChild);

  
// }
  //console.log(task)
