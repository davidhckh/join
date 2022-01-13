'use strict';

let popup = new PopUp("Task created successfully and moved to backlog!", "3%", "3%", 0.2, 2.2, 8);
setURL('http://gruppe-142.developerakademie.net/smallest_backend_ever');

let helper = new Helper();
let selectedUser;
let selectedIcon;
let selectedArray = [];

/**
 * creates array with the values of input fields
 * @returns {array} array with the values of the input elements
 */
function defineElements() {
    let elements = [];
    elements[0] = document.getElementById('taskTitle').value;
    elements[1] = document.getElementById('taskCategory').value;
    elements[2] = document.getElementById('taskUrgency').value;
    elements[3] = document.getElementById('taskDescription').value;
    elements[4] = document.getElementById('taskDate').value;
    return elements;
}
/**
 * function grabs all input elements and adds addEventListener to prevent default behaviour of 
 * the form tag. it calls the data from server. if all form elemnts are filled out
 * a new task is pushed into allTasks and moved to backlog.
 */
async function addNewTask() {

    let elements = defineElements();
    let assignedTo = selectedArray;
    document.getElementById('taskForm').addEventListener('submit', function (evt) {
        evt.preventDefault();
    })

    
    if (formIsFilled()) {
        await helper.getDataFromServer();
        popup.show();
        helper.allTasks.push(new Task(elements[0], elements[1], elements[2], elements[3], elements[4], assignedTo));
        helper.uploadToServer();
        resetFields();
    }
    
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
/**
 * checks if all relevant input fields are filled
 * @returns {bolean} true if all input fields are filled, else false
 */
function formIsFilled() {
    let elements = defineElements();
    if (!elements[0] == "" && !elements[1] == "" && !elements[2] == "" && !elements[3] == "" && !elements[4] == 0) {

        return true;
    }
    else { return false; }

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
/**
 * initializes the page set up
 */
async function init() {

    includeHTML(setupMenuUserDetails());

    /**Get Users from server to setup assign-to container */
    await helper.getDataFromServer();
    renderUsers();

    resetFields();
}