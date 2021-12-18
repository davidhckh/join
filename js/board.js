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

function boardInit() {
    loadTodos();
    loadInProgress();
    loadTesting();
    loadDone();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function startDragging(id) {
    currentDraggedElement = id;
}

function moveTo(targetCategory) {
    loadedTasks[currentDraggedElement]['category'] = targetCategory;
    boardInit();
}

function addHighlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

function removeHighlight() {
    document.getElementById('BlockToDo').classList.remove('dragAreaHighlight');
    document.getElementById('BlockInProgress').classList.remove('dragAreaHighlight');
    document.getElementById('BlockTesting').classList.remove('dragAreaHighlight');
    document.getElementById('BlockDone').classList.remove('dragAreaHighlight');
}

function generateBoardTask(task) {
    return `<div draggable="true" ondragstart="startDragging(${task['id']})" ondragend="removeHighlight()" class="dragItem box">${task['title']}</div> `
}


function loadTodos() {
    let tasks = loadedTasks.filter(t => t['category'] == 'toDo');
    document.getElementById('BlockToDo').innerHTML = '';
    tasks.forEach(function(task) {
        document.getElementById('BlockToDo').innerHTML += generateBoardTask(task);
    });
}

function loadInProgress() {
    let tasks = loadedTasks.filter(t => t['category'] == 'inProgress');
    document.getElementById('BlockInProgress').innerHTML = '';
    tasks.forEach(function(task) {
        document.getElementById('BlockInProgress').innerHTML += generateBoardTask(task);
    });
}

function loadTesting() {
    let tasks = loadedTasks.filter(t => t['category'] == 'testing');
    document.getElementById('BlockTesting').innerHTML = '';
    tasks.forEach(function(task) {
        document.getElementById('BlockTesting').innerHTML += generateBoardTask(task);
    });
}

function loadDone() {
    let tasks = loadedTasks.filter(t => t['category'] == 'done');
    document.getElementById('BlockDone').innerHTML = '';
    tasks.forEach(function(task) {
        document.getElementById('BlockDone').innerHTML += generateBoardTask(task);
    });
}