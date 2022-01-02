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
                `<div class="entry-container box column" onclick="backlog.checkContainerVisibility(${this.backlogTasks.indexOf(task)})">
                    <div class="row entry-top-container">
                        <div class="urgency-color urgency-${task.urgency}"></div>
                        <span class="responsive-header">Assigned to:</span>
                        <div class="assigned-to-container row">
                            <img class="assigned-to-image" src="${task.assignedTo.image}">
                            <div class="column assigned-to-details">
                                <span class="assigned-to-name">${task.assignedTo.name}</span>
                                <span class="assigned-to-mail">${task.assignedTo.mail}</span>
                            </div>
                        </div>
                        <span class="responsive-header">Due Date:</span>
                        <div class="category-container">
                            <span>${this.capitalizeFirstLetter(task.dueDate)}</span>
                        </div>
                        <span class="responsive-header">Title:</span>
                        <div class="details-container">
                            <span>${this.capitalizeFirstLetter(task.title)}</span>
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
                    <div class="add-to-board-container" onclick="event.stopPropagation(); backlog.addToBoard(${task.timeOfCreation})">Add To Board</div>
                    </div>
                </div>`
            )
        })
    }

    /**
     * Check container visibility and expand or collapse container
     */
    checkContainerVisibility(index) {
        if(document.getElementById('expanded-' + index).classList.contains('hide')) {
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
        for(let i = 0; i < this.backlogTasks.length; i++) {
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
     * Capitalize first letter to display from JSON
     */
    capitalizeFirstLetter(str) {
        return str[0].toUpperCase() + str.slice(1);
    };
};
