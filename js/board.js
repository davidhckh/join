let loadedTasks = [{
        'id': 0,
        'name': 'Tina',
        'title': 'Putzen',
        'category': 'design',
        'description': 'description Text',
        'dueDate': '17.01.2022',
        'urgency': 'middle',
        'backlogPosition': true,
        'boardPosition': 'inProgress'
    },
    {
        'id': 1,
        'name': 'Margreth',
        'title': 'Backen',
        'category': 'development',
        'description': 'description Text',
        'dueDate': '17.01.2022',
        'urgency': 'low',
        'backlogPosition': true,
        'boardPosition': 'testing'
    },
    {
        'id': 2,
        'name': 'Marvin',
        'title': 'Waschen',
        'category': 'management',
        'description': 'description Text',
        'dueDate': '17.01.2022',
        'urgency': 'high',
        'backlogPosition': true,
        'boardPosition': 'toDo'
    },
    {
        'id': 3,
        'name': 'Günther',
        'title': 'Einkaufen',
        'category': 'none',
        'description': 'description Text',
        'dueDate': '17.01.2022',
        'urgency': 'middle',
        'backlogPosition': true,
        'boardPosition': 'inProgress'
    },
    {
        'id': 4,
        'name': 'Hans',
        'title': 'Müll rausbringen',
        'category': 'design',
        'description': 'description Text',
        'dueDate': '17.01.2022',
        'urgency': 'low',
        'backlogPosition': true,
        'boardPosition': 'toDo'
    },
    {
        'id': 5,
        'name': 'Peter',
        'title': 'Staubsaugen',
        'category': 'management',
        'description': 'description Text',
        'dueDate': '17.01.2022',
        'urgency': 'high',
        'backlogPosition': true,
        'boardPosition': 'toDo'
    }
];

let currentDraggedElement;
let currentTaskUrgencyColor;
let currentTaskCategoryColor;


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
    loadedTasks[currentDraggedElement]['boardPosition'] = targetCategory;
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
    return `
    <div draggable="true" ondragstart="startDragging(${task['id']})" ondragend="removeHighlight()" class="dragItem box category-color-${task['category']}">
                    <div class="boardUrgency urgency-${task['urgency']}">
                    </div>
                    <div class="boardImg">
                    </div>
                    <div class="boardText">
                        <div class="textName">${task['name']} </div>
                        <div class="textTitle">${task['title']}</div>
                    </div>
                </div>
    `
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
    let tasks = loadedTasks.filter(t => t['boardPosition'] == 'toDo');
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
    let tasks = loadedTasks.filter(t => t['boardPosition'] == 'inProgress');
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
    let tasks = loadedTasks.filter(t => t['boardPosition'] == 'testing');
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
    let tasks = loadedTasks.filter(t => t['boardPosition'] == 'done');
    clearBoard('BlockDone');
    tasks.forEach(function(task) {
        document.getElementById('BlockDone').innerHTML += generateBoardTask(task);
    });
}