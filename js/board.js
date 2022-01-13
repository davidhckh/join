let loadedTasks = [];
let helper;
let popup;
let allowChange = false;
let currentDraggedElement;
let currentTaskUrgencyColor;
let currentTaskCategoryColor;
let ragging = false;
let language = 'english';
let languages = {
    'german': [{
        'taskDelete': 'Aufgabe endgültig entfernen',
        'taskBackToBacklog': 'Aufgabe in das Backlog verschieben',
        'taskInformation': 'Klicken für mehr Informationen ein- und ausblenden',
        'taskAssignedTo': 'Zugewiesen an: ',
        'taskUrgency': 'Dringlichkeit: ',
        'taskCategory': 'Kategorie: ',
        'taskDescription': 'Beschreibung: '
    }],
    'english': [{
        'taskDelete': 'Permanently remove the task',
        'taskBackToBacklog': 'Move task to backlog',
        'taskInformation': 'Click to show or hide for more information',
        'taskAssignedTo': 'Assigned to: ',
        'taskUrgency': 'Urgency: ',
        'taskCategory': 'Category: ',
        'taskDescription': 'Description: '
    }]
};

/**
 * function which is loaded at first and starts other functions
 */
async function boardInit() {
    loadedTasks = [];
    await loadServerData();
    loadTodos();
    loadInProgress();
    loadTesting();
    loadDone();
}

function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * called when an element starts dragging
 * saves the timeOfCreation of the actual moved task into a local variable
 * @param {number} timeOfCreation - the time of creation, which is used as id, from the task which has startet with dragging 
 */
function startDragging(timeOfCreation) {
    currentDraggedElement = timeOfCreation;
}

/**
 * called when the element is dropped
 * changes the category of the task that was moved
 * and call the init function to update the site
 * @param {string} targetCategory
 */
async function moveTo(targetCategory) {
    helper.updateStatus(currentDraggedElement, 'state', targetCategory);
    let task = loadedTasks.findIndex(task => task.timeOfCreation == currentDraggedElement)
    task.state = targetCategory;
    reloadColumns();
}

/**
 * changes the category of the task that was clicked on
 * and call the init function to update the site
 * @param {number} id 
 * @param {string} targetCategory 
 */
async function btnMoveTo(id, targetCategory) {
    helper.updateStatus(id, 'state', targetCategory);
    let task = loadedTasks.findIndex(task => task.timeOfCreation == id)
    task.state = targetCategory;
    reloadColumns();
}

/**
 * shows a popup when a task is moved to another category
 * @param {string} targetCategory 
 */
function showPopup(message) {
    popup = new PopUp(message, '3%', '3%', 0.2, 2.2, 8);
    popup.show();
}

/**
 * hides the send to button of the task in which it is already
 * @param {array} task 
 */
function hideMoveBtn(task) {
    document.getElementById(task.state + task['timeOfCreation']).classList.add('hide');
}

/**
 * when a task is in category 'to-do' you are able to send it back to backlog
 * @param {number} timeOfCreation - the time of creation, which is used as id, from the task which will be send to backlog 
 */
async function sendTaskToBacklog(timeOfCreation) {
    helper.updateStatus(timeOfCreation, 'state', 'backlog');
    allowChange = false;
    reloadColumns();
    showPopup('Task moved to backlog');
}

/**
 * when a task is in category 'done' you are able to delete it with this
 * function
 * sets allowChange to false, so it will be not allowed to show further informations
 * @param {number} timeOfCreation - the time of creation, which is used as id, from the task which will be deleted
 */
async function deleteTask(timeOfCreation) {
    allowChange = false;
    helper.deleteOneTask(timeOfCreation);
    showPopup('Task deleted');
    boardInit();
}

/**
 * function to reload all columns when a task has changed
 */
async function reloadColumns() {
    loadTodos();
    loadInProgress();
    loadTesting();
    loadDone();
}

/**
 * called when dragged element is over an category
 * highlight the category over which the dragged task is held
 * @param {string} id 
 */
function addHighlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

/**
 * called when dragged element left a category and element is dropped 
 * removes the highlight from all category
 */
function removeHighlight() {
    document.getElementById('BlockToDo').classList.remove('dragAreaHighlight');
    document.getElementById('BlockInProgress').classList.remove('dragAreaHighlight');
    document.getElementById('BlockTesting').classList.remove('dragAreaHighlight');
    document.getElementById('BlockDone').classList.remove('dragAreaHighlight');
}

/**
 * toggles the display to none. 
 * so the further informations can be shown or hide
 * when it is allowed to show info
 * @param {number} timeOfCreation - the time of creation, which is used as id, from the task which will show more information
 */
function toggleHide(timeOfCreation) {
    if (allowChange) {
        document.getElementById(timeOfCreation).classList.toggle('hide');
    }
    allowChange = true;
}

/**
 * generates a html element which contains the informations from a task
 * @param {array} task 
 * @returns a html element as string
 */
function generateBoardTask(task) {
    let finishDate = reformatDate(task['dueDate']);
    let urgency = capitalizeFirstLetter(task['urgency']);
    let category = capitalizeFirstLetter(task['category']);
    let returnString = `
    <div draggable="true" onClick="toggleHide(${task['timeOfCreation']})"
     ondragstart="startDragging(${task['timeOfCreation']})" ondragend="removeHighlight()" 
     class="dragItem box category-color-${task['category']}" title="${languages[language][0].taskInformation}">
                    <div class="fl-start">
    <div class="boardUrgency urgency-${task['urgency']}">
                    </div>
                    <div class="boardText">
                        <div class="taskTop">
                            <div class="taskTopTitle">
                                <div class="boardImg"> </div><div>
                                <div class="textTitle">${task['title']}</div>
                                <div class="textDate">${finishDate}</div>
                            </div>
                        </div>
                        `;
    returnString += addButton(task);
    returnString += `</div>
                        <div id="${task['timeOfCreation']}" class="hide boardDetails">
                            <h5>${languages[language][0].taskAssignedTo}</h5><p>`
    returnString += getAssignedTo(task);
    returnString += `          </p>
                            <br>
                            <h5>${languages[language][0].taskUrgency}</h5><p>${urgency}</p>
                            <br>
                            <h5>${languages[language][0].taskCategory}</h5><p>${category}</p>
                            <br>
                            <h5>${languages[language][0].taskDescription}</h5><p>${task['description']}</p>
                            <br>
                            <h5>Move task to:</h5>
                            <div class="moveToBtns">
                            <button id="to-do${task['timeOfCreation']}" onclick="btnMoveTo(${task['timeOfCreation']},'to-do')" class="taskmoveToBtn" title="To Do">To Do</button>
                            <button id="inProgress${task['timeOfCreation']}" onclick="btnMoveTo(${task['timeOfCreation']},'inProgress')" class="taskmoveToBtn" title="In Progress">In Progress</button>
                            <button id="testing${task['timeOfCreation']}" onclick="btnMoveTo(${task['timeOfCreation']},'testing')" class="taskmoveToBtn" title="Testing">Testing</button>
                            <button id="done${task['timeOfCreation']}" onclick="btnMoveTo(${task['timeOfCreation']},'done')" class="taskmoveToBtn" title="Done">Done</button>
                            </div>
                            </div>
                    </div>
                    </div>
                    </div>`;
    return returnString;
}

/**
 * reads the assigned names from the task and uses it to generate an html code
 * @param {array} task - a single task
 * @returns - html code with the names
 */
function getAssignedTo(task) {
    let assignedTo = '';
    task.assignedTo.forEach(ele => {
        assignedTo += ele['name'] + '<br>';
    })
    return assignedTo;
}

/**
 * returns the html string from a button if the task state is 'done' or 'to-do'
 * in case of 'to-do' returns a button to send the task back to backlog
 * in case of 'done' returns a button to delete the task finally
 * @param {array} task - single task 
 * @returns - html code with the button or an empty string
 */
function addButton(task) {
    let returnString = '';
    if (task.state == 'done') {
        returnString = `<button onclick="deleteTask(${task['timeOfCreation']})" class="taskDeleteBtn" title="${languages[language][0].taskDelete}"></button>`;
    }
    if (task.state == 'to-do') {
        returnString = `<button onclick="sendTaskToBacklog(${task['timeOfCreation']})" class="taskBackToBacklogBtn" title="${languages[language][0].taskBackToBacklog}"></button>`;
    }
    return returnString;
}

/**
 * function to clear a specific block
 * @param {string} blockName - name of the block which will be cleared
 */
function clearBoard(blockName) {
    document.getElementById(blockName).innerHTML = '';
}

/**
 * filters tasks of the "todo" category and loads the results into the local variable tasks. 
 * deletes the content of the blockToDo and energizes new content from the results of the filtering
 */
function loadTodos() {
    let tasks = loadedTasks.filter(t => t['state'] == 'to-do');
    clearBoard('BlockToDo');
    tasks.forEach(function(task) {
        document.getElementById('BlockToDo').innerHTML += generateBoardTask(task);
        hideMoveBtn(task);
    });
}

/**
 * filters tasks of the "inProgress" category and loads the results into the local variable tasks. 
 * deletes the content of the blockInProgress and energizes new content from the results of the filtering
 */
function loadInProgress() {
    let tasks = loadedTasks.filter(t => t['state'] == 'inProgress');
    clearBoard('BlockInProgress');
    tasks.forEach(function(task) {
        document.getElementById('BlockInProgress').innerHTML += generateBoardTask(task);
        hideMoveBtn(task);
    });
}

/**
 * filters tasks of the "testing" category and loads the results into the local variable tasks. 
 * deletes the content of the blockTesting and energizes new content from the results of the filtering
 */
function loadTesting() {
    let tasks = loadedTasks.filter(t => t['state'] == 'testing');
    clearBoard('BlockTesting');
    tasks.forEach(function(task) {
        document.getElementById('BlockTesting').innerHTML += generateBoardTask(task);
        hideMoveBtn(task);
    });
}

/**
 * filters tasks of the "done" category and loads the results into the local variable tasks. 
 * deletes the content of the blockDone and energizes new content from the results of the filtering
 */
function loadDone() {
    let tasks = loadedTasks.filter(t => t['state'] == 'done');
    clearBoard('BlockDone');
    tasks.forEach(function(task) {
        document.getElementById('BlockDone').innerHTML += generateBoardTask(task);
        hideMoveBtn(task);
    });
}

/**
 * initialize a helper class to load Data from Server and push it into the loadadTasks 
 * the address of the server will be setted with the function call setURL
 */
async function loadServerData() {
    helper = new Helper;
    setURL('http://gruppe-142.developerakademie.net/smallest_backend_ever');
    await helper.getDataFromServer();
    helper.allTasks.forEach(task => {
        loadedTasks.push(task);
    });
}

/**
 * function to change dateformat
 * @param {string} dateStr - datestring in Format yyyy-mm-dd
 * @returns datestring in format dd.mm.yy
 */
function reformatDate(dateStr) {
    let dArr = dateStr.split("-");
    return dArr[2] + "." + dArr[1] + "." + dArr[0].substring(2);
}

/**
 * function to set the first letter to uppercase
 * @param {string} string - input string
 * @returns string - first letter uppercase
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}