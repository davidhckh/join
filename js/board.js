let loadedTasks = [{
        'id': 0,
        'title': 'Putzen',
        'category': 'toDo',
        'description': 'description Text',
        'dueDate': '17.01.2022',
        'urgency': 'high',
        'backlogPosition': true,
        'boardPosition': false
    },
    {
        'id': 1,
        'title': 'Backen',
        'category': 'inProgress',
        'description': 'description Text',
        'dueDate': '17.01.2022',
        'urgency': 'high',
        'backlogPosition': true,
        'boardPosition': false
    },
    {
        'id': 2,
        'title': 'Waschen',
        'category': 'toDo',
        'description': 'description Text',
        'dueDate': '17.01.2022',
        'urgency': 'high',
        'backlogPosition': true,
        'boardPosition': false
    },
    {
        'id': 3,
        'title': 'Einkaufen',
        'category': 'toDo',
        'description': 'description Text',
        'dueDate': '17.01.2022',
        'urgency': 'high',
        'backlogPosition': true,
        'boardPosition': false
    },
    {
        'id': 4,
        'title': 'Müll rausbringen',
        'category': 'toDo',
        'description': 'description Text',
        'dueDate': '17.01.2022',
        'urgency': 'high',
        'backlogPosition': true,
        'boardPosition': false
    },
    {
        'id': 5,
        'title': 'Staubsaugen',
        'category': 'toDo',
        'description': 'description Text',
        'dueDate': '17.01.2022',
        'urgency': 'high',
        'backlogPosition': true,
        'boardPosition': false
    }
];

let currentDraggedElement;

/**
 * function which is loaded at first and starts other functions
 */
function boardInit() {
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
 * saves the id of the actual moved task into a local variable
 * @param {number} id - the id from the todo which has startet with dragging 
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * called when the element is dropped
 * changes the category of the task that was moved
 * and call the init function to update the site
 * @param {string} targetCategory - 
 */
function moveTo(targetCategory) {
    loadedTasks[currentDraggedElement]['category'] = targetCategory;
    boardInit();
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
    return `<div draggable="true" ondragstart="startDragging(${task['id']})" ondragend="removeHighlight()" class="dragItem box">${task['title']}</div> `
}

/**
 * filters tasks of the "todo" category and loads the results into the local variable tasks. 
 * deletes the content of the blockToDo and energizes new content from the results of the filtering
 */
function loadTodos() {
    let tasks = loadedTasks.filter(t => t['category'] == 'toDo');
    document.getElementById('BlockToDo').innerHTML = '';
    tasks.forEach(function(task) {
        document.getElementById('BlockToDo').innerHTML += generateBoardTask(task);
    });
}

/**
 * filters tasks of the "inProgress" category and loads the results into the local variable tasks. 
 * deletes the content of the blockInProgress and energizes new content from the results of the filtering
 */
function loadInProgress() {
    let tasks = loadedTasks.filter(t => t['category'] == 'inProgress');
    document.getElementById('BlockInProgress').innerHTML = '';
    tasks.forEach(function(task) {
        document.getElementById('BlockInProgress').innerHTML += generateBoardTask(task);
    });
}

/**
 * filters tasks of the "testing" category and loads the results into the local variable tasks. 
 * deletes the content of the blockTesting and energizes new content from the results of the filtering
 */
function loadTesting() {
    let tasks = loadedTasks.filter(t => t['category'] == 'testing');
    document.getElementById('BlockTesting').innerHTML = '';
    tasks.forEach(function(task) {
        document.getElementById('BlockTesting').innerHTML += generateBoardTask(task);
    });
}

/**
 * filters tasks of the "done" category and loads the results into the local variable tasks. 
 * deletes the content of the blockDone and energizes new content from the results of the filtering
 */
function loadDone() {
    let tasks = loadedTasks.filter(t => t['category'] == 'done');
    document.getElementById('BlockDone').innerHTML = '';
    tasks.forEach(function(task) {
        document.getElementById('BlockDone').innerHTML += generateBoardTask(task);
    });
}