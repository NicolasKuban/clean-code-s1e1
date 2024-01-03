//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("main__heading_add");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("list__ul_todo");//ul of #list__ul_todo
var completedTasksHolder=document.getElementById("list__ul_completed");//list__ul_completed


//New task list item
var createNewTaskElement=function(taskString){

  let listItem=document.createElement("li");

  //input (checkbox)
  let checkBox=document.createElement("input");//checkbx
  //label
  let label=document.createElement("label");//label
  //input (text)
  let editInput=document.createElement("input");//text
  //button.edit
  let editButton=document.createElement("button");//edit button

  //button.main__button_delete
  let deleteButton=document.createElement("button");//delete button
  let deleteButtonImg=document.createElement("img");//delete button image

  listItem.className="list__li"
  label.innerText=taskString;
  label.className='main__label';

  //Each elements, needs appending
  checkBox.type="checkbox";
  checkBox.className="main__checkbox"
  editInput.type="text";
  editInput.classList.add("main__input");
  editInput.classList.add("main__input_saved");

  editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
  editButton.classList.add("main__button");
  editButton.classList.add("main__button_edit");

  deleteButton.classList.add("main__button");
  deleteButton.classList.add("main__button_delete");
  deleteButtonImg.className="list__img"
  deleteButtonImg.src='./remove.svg';
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask=function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #main__heading_add:
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var listItem=this.parentNode;

  var editInput=listItem.querySelector('.main__input');
  var label=listItem.querySelector(".main__label");
  var editBtn=listItem.querySelector(".main__button_edit");
  var containsClass=listItem.classList.contains("list__li_edit");
  //If class of the parent is .list__li_edit
  if(containsClass){

    //switch to .list__li_edit
    //label becomes the inputs value.
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }

  //toggle .list__li_edit on the parent.
  listItem.classList.toggle("list__li_edit");
  label.classList.toggle("main__label_edited");
  editInput.classList.toggle("main__input_edited");
  editInput.classList.toggle("main__input_saved");
};


//Delete task.
var deleteTask=function(){
  console.log("Delete Task...");

  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
  console.log("Complete Task...");

  //Append the task list item to the #list__ul_completed
  var listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #list__ul_todo.
  var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  //select ListItems children
  var checkBox=taskListItem.querySelector(".main__checkbox");
  var editButton=taskListItem.querySelector(".main__button_edit");
  var deleteButton=taskListItem.querySelector(".main__button_delete");


  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.