setURL('http://gruppe-142.developerakademie.net/smallest_backend_ever');

let helper = new Helper();
let renderContainer;
let backlogTasks = [];

async function setup() {
    renderContainer = document.getElementById('render-container');

    await helper.getDataFromServer();

    filterTasks();
    render();
}

function filterTasks() {
    backlogTasks = helper.allTasks.filter((task) => task.state === 'backlog');
}

function render() {
    renderContainer.innerHTML = '';

    backlogTasks.forEach((task) => {
        renderContainer.insertAdjacentHTML('beforeend',
            `<div class="entry-container box column category-color-${task.category}" onclick="checkContainerVisibility(${backlogTasks.indexOf(task)})">
                <div class="row entry-top-container">
                    <div class="urgency-color urgency-${task.urgency}"></div>
                    <span class="responsive-header">Assigned to:</span>
                    <div class="assigned-to-container row">
                        ${renderAssignedToContainer(task)}
                    </div>
                    <div class="row sub-top-container">
                        <div class="due-date-container">
                            <span class="responsive-header">Due Date:</span>
                            <div>
                                <span>${capitalizeFirstLetter(reformatDate(task.dueDate))}</span>
                            </div>
                        </div>
                        <div class="title-container">
                            <span class="responsive-header">Title:</span>
                            <div >
                                <span>${capitalizeFirstLetter(task.title)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="expanded-${backlogTasks.indexOf(task)}" class="expanded-entry-container row hide">
                    <div class="column expanded-category-container">
                        <h5>Category:</h5>
                        <span>${capitalizeFirstLetter(task.category)}</span>
                    </div>
                <div class="column">
                    <h5>Description:</h5>
                    <span>${task.description}</span>
                </div>
                <div class="row entry-button-container">
                    <a class="add-to-board-container center" onclick="event.stopPropagation(); addToBoard(${task.timeOfCreation})">Add To Board</a>
                    <a class="delete-item-container center" onclick="event.stopPropagation(); deleteTask(${task.timeOfCreation});">
                        <img src="assets/trash-icon.png">
                    </a>
                </div>
                </div>
            </div>`
        )
    })
}

function renderAssignedToContainer(task) {
    let content = '';

    for (let i = 0; i < task.assignedTo.length; i++) {
        content += `
        <div class="column center">
            <img class="assigned-to-image" src="${task.assignedTo[i].image}">
            <span class="assigned-to-name">${task.assignedTo[i].name}</span>
        </div>
        `;
    }

    return content;
}

/**
* Check container visibility and expand or collapse container
*/
function checkContainerVisibility(index) {
    if (document.getElementById('expanded-' + index).classList.contains('hide')) {
        this.expandContainer(index);
    } else {
        this.collapseContainer(index);
    };
}

function expandContainer(index) {
    collapseAllContainers();

    document.getElementById('expanded-' + index).classList.remove('hide');
}

function collapseAllContainers() {
    for (let i = 0; i < backlogTasks.length; i++) {
        collapseContainer(i);
    };
}

function collapseContainer(index) {
    document.getElementById('expanded-' + index).classList.add('hide');
}





/**
 * Add Item to board and upload to server + render after
 */
function addToBoard(timeOfCreation) {
    const item = helper.filterTaskIDs(helper.allTasks, timeOfCreation)[0];
    const itemIndex = helper.allTasks.indexOf(item);

    helper.allTasks[itemIndex].state = 'to-do';

    filterTasks();
    render();
    helper.uploadToServer();
};

/**
 * Delete item permanently and upload to server + render after
 */
function deleteTask(timeOfCreation) {
    const item = helper.filterTaskIDs(helper.allTasks, timeOfCreation)[0];
    const itemIndex = helper.allTasks.indexOf(item);

    helper.allTasks.splice(itemIndex, 1);

    filterTasks();
    render();
    helper.uploadToServer();
}








function capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
};

/**
 * function to change dateformat
 * @param {string} dateStr - datestring in Format yyyy-mm-dd
 * @returns datestring in format dd.mm.yy
 */
function reformatDate(dateStr) {
    let dArr = dateStr.split("-");

    return dArr[2] + "." + dArr[1] + "." + dArr[0].substring(2);
}
