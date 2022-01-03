let backlog;

/**
 * Setup Backlog on load
 */
window.addEventListener('load', function () {
    backlog = new Backlog();
});

class Backlog {
    renderContainer = document.getElementById('render-container');

    constructor() {
        setURL('http://gruppe-142.developerakademie.net/smallest_backend_ever');

        this.helper = new Helper();

        this.setup();

        // this.helper.createNewUser('Aron', 'aron@gmail.com', 'assets/dummies/dummy-0.png')
        // this.helper.createNewUser('Bron', 'bron@gmail.com', 'assets/dummies/dummy-1.png')
        // this.helper.createNewUser('Cron', 'cron@gmail.com', 'assets/dummies/dummy-2.png')
        // this.helper.createNewUser('Dron', 'dron@gmail.com', 'assets/dummies/dummy-3.png')
    }

    /**
     * Render after load
     */
    async setup() {
        await this.helper.getDataFromServer();

        this.filterTasks();
        this.render();
    };

    /**
     * Filter tasks to only items with state === 'backlog'
     */
    filterTasks() {
        this.backlogTasks = this.helper.allTasks.filter((task) => task.state === 'backlog');
    }

    render() {
        this.renderContainer.innerHTML = '';

        this.backlogTasks.forEach((task) => {
            this.renderContainer.insertAdjacentHTML('beforeend',
                `<div class="entry-container box column category-color-${task.category}" onclick="backlog.checkContainerVisibility(${this.backlogTasks.indexOf(task)})">
                    <div class="row entry-top-container">
                        <div class="urgency-color urgency-${task.urgency}"></div>
                        <span class="responsive-header">Assigned to:</span>
                        <div class="assigned-to-container row">
                            ${this.renderAssignedToContainer(task)}
                        </div>
                        <div class="row sub-top-container">
                            <div class="due-date-container">
                                <span class="responsive-header">Due Date:</span>
                                <div>
                                    <span>${this.capitalizeFirstLetter(this.reformatDate(task.dueDate))}</span>
                                </div>
                            </div>
                            <div class="title-container">
                                <span class="responsive-header">Title:</span>
                                <div >
                                    <span>${this.capitalizeFirstLetter(task.title)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="expanded-${this.backlogTasks.indexOf(task)}" class="expanded-entry-container row hide">
                        <div class="column expanded-category-container">
                            <h5>Category:</h5>
                            <span>${this.capitalizeFirstLetter(task.category)}</span>
                        </div>
                    <div class="column">
                        <h5>Description:</h5>
                        <span>${task.description}</span>
                    </div>
                    <div class="row entry-button-container">
                        <a class="add-to-board-container center" onclick="event.stopPropagation(); backlog.addToBoard(${task.timeOfCreation})">Add To Board</a>
                        <a class="delete-item-container center" onclick="event.stopPropagation(); backlog.deleteTask(${task.timeOfCreation});">
                            <img src="assets/trash-icon.png">
                        </a>
                    </div>
                    </div>
                </div>`
            )
        })
    }

    renderAssignedToContainer(task) {
        let content = '';

        for(let i = 0; i < task.assignedTo.length; i ++) {
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
    checkContainerVisibility(index) {
        if (document.getElementById('expanded-' + index).classList.contains('hide')) {
            this.expandContainer(index);
        } else {
            this.collapseContainer(index);
        };
    }

    expandContainer(index) {
        this.collapseAllContainers();

        document.getElementById('expanded-' + index).classList.remove('hide');
    }

    collapseAllContainers() {
        for (let i = 0; i < this.backlogTasks.length; i++) {
            this.collapseContainer(i);
        };
    }

    collapseContainer(index) {
        document.getElementById('expanded-' + index).classList.add('hide');
    }

    /**
     * Add Item to board and upload to server + render after
     */
    addToBoard(timeOfCreation) {
        const item = this.helper.filterTaskIDs(this.helper.allTasks, timeOfCreation)[0];
        const itemIndex = this.helper.allTasks.indexOf(item);

        this.helper.allTasks[itemIndex].state = 'to-do';

        this.filterTasks();
        this.render();
        this.helper.uploadToServer();
    };

    /**
     * Delete item permanently and upload to server + render after
     */
    deleteTask(timeOfCreation) {
        const item = this.helper.filterTaskIDs(this.helper.allTasks, timeOfCreation)[0];
        const itemIndex = this.helper.allTasks.indexOf(item);

        this.helper.allTasks.splice(itemIndex, 1);

        this.filterTasks();
        this.render();
        this.helper.uploadToServer();
    }




    
    /**
     * Capitalize first letter to display from JSON
     */
    capitalizeFirstLetter(str) {
        return str[0].toUpperCase() + str.slice(1);
    };

    /**
     * function to change dateformat
     * @param {string} dateStr - datestring in Format yyyy-mm-dd
     * @returns datestring in format dd.mm.yy
     */
    reformatDate(dateStr) {
        let dArr = dateStr.split("-");

        return dArr[2] + "." + dArr[1] + "." + dArr[0].substring(2);
    }
};
