let loadedTasks = [];
let helper;
let currentDraggedElement;
let currentTaskUrgencyColor;
let currentTaskCategoryColor;

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
 * @param {string} targetCategory - 
 */
async function moveTo(targetCategory) {
    helper.updateStatus(currentDraggedElement, 'state', targetCategory);
    sleep(300);
    boardInit();
}

/**
 * when a task is in category 'done' you are able to delete it with this
 * function
 * @param {number} timeOfCreation - the time of creation, which is used as id, from the task which will be deleted
 */
async function deleteTask(timeOfCreation) {
    helper.deleteOneTask(timeOfCreation);
    sleep(300);
    boardInit();
}

function reloadSite() {

}

/**
 * function to let javascript wait a specific time out
 * @param {number} milliseconds - time in ms to sleep
 */
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
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
 * generates a html element which contains the informations from a task
 * @param {array} task 
 * @returns a html element as string
 */
function generateBoardTask(task) {
    let finishDate = reformatDate(task['dueDate']);
    let returnString = `
    <div draggable="true" ondragstart="startDragging(${task['timeOfCreation']})" ondragend="removeHighlight()" class="dragItem box category-color-${task['category']}">
                    <div class="fl-start">
    <div class="boardUrgency urgency-${task['urgency']}">
                    </div>
                    <div class="boardImg">
                    </div>
                    <div class="boardText">
                        <div class="textName">${task['name']} </div>
                        <div class="textTitle">${task['title']}</div>
                        <div class="textTitle">${finishDate}</div>
                    </div>
                    </div>
                    `;
    if (task.state == 'done') {
        returnString += `<button onclick="deleteTask(${task['timeOfCreation']})" class="taskDeleteBtn"></button>`;
    }
    returnString += `</div>`;
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