'use strict';

let popup = new PopUp("Task was moved to backlog!", "10%", "15%",0.2,1.2,2.2);



setURL('http://gruppe-142.developerakademie.net/smallest_backend_ever');

let helper = new Helper();
let selectedUser;
let selectedIcon;
let selectedArray = [];


/**
 * function reads the values of input and than pushes a new Task in the helpers allTasks Array.
 */

async function addNewTask() {
    let title = document.getElementById('taskTitle');
    let category = document.getElementById('taskCategory');
    let urgency = document.getElementById('taskUrgency');
    let description = document.getElementById('taskDescription');
    let dueDate = document.getElementById('taskDate');
    let assignedTo = selectedArray;

    document.getElementById('taskForm').addEventListener('submit', function(evt){
        evt.preventDefault();})
   
    await helper.getDataFromServer()
    helper.allTasks.push(new Task(title.value, category.value, urgency.value, description.value, dueDate.value, assignedTo));
    helper.uploadToServer();
    //popup.show();
    if (formIsFilled()) {
        popup.show();
    }
     resetFields();
}




/**
 * function clears the input fields and resets the selecedArray
 */
function resetFields() {
    document.getElementById('taskTitle').value = "";
    document.getElementById('taskCategory').selection = "None";
    document.getElementById('taskUrgency').selection = "Low";
    document.getElementById('taskDescription').value = "";
    document.getElementById('taskDate').value = "";

    selectedArray = [];
    clearSelectedUsers();
}

function formIsFilled() {
    let title = document.getElementById('taskTitle').value;
    let category = document.getElementById('taskCategory').value;
    let urgency = document.getElementById('taskUrgency').value;
    let description = document.getElementById('taskDescription').value;
    let dueDate = document.getElementById('taskDate').value;
    if (!title=="" && !category=="" && !urgency=="" && !description=="" && !dueDate==0) {
       
        return true;
    }
    else {return false;}

}

/**
 * Render users into Assign-To container
 */
function renderUsers() {
    let renderContainer = document.getElementById('taskAssigned')

    renderContainer.innerHTML = ''

    for (let i = 0; i < helper.allUsers.length; i++) {
        renderContainer.innerHTML +=
            `<div id="assign-to-container-${i}" class="assign-to-container column center" onclick="setSelectedUser(${i})">
            <img src="${helper.allUsers[i].image}">
            <span>${helper.allUsers[i].name}</span>
        </div>`
    }
}

/**
 * function pushes the clicked user into the array selected User, if the user is not already
 * alredy selected. if so, it removes selected status of the  clicked user
 * @param {int} index index of clicked users
 */
function setSelectedUser(index) {
    selectedUser = helper.allUsers[index];
    selectedIcon = document.getElementById('assign-to-container-' + index);
    if (!selectedArray.includes(selectedUser)) {
        selectedArray.push(selectedUser);
        selectedIcon.classList.add('selected-assign-to-container');
    }
    else if (selectedArray.includes(selectedUser)) {
        selectedIcon.classList.remove('selected-assign-to-container');
        let finder = selectedArray.indexOf(selectedUser);
        selectedArray.splice(finder, 1);
    }
}

function clearSelectedUsers() {
    for (let i = 0; i < helper.allUsers.length; i++) {
        document.getElementById('assign-to-container-' + i).classList.remove('selected-assign-to-container');
    }
}



async function init() {

    includeHTML(setupMenuUserDetails());

    /**Get Users from server to setup assign-to container */
    await helper.getDataFromServer();
    renderUsers();

    resetFields();
}