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
        this.renderContainer.innerHTML = '';

        setURL('http://gruppe-142.developerakademie.net/smallest_backend_ever');

        this.helper = new Helper();

        this.setup();

        this.helper.createNewUser('test', 'tes2t@test.de')
        this.helper.createNewUser('test', 'tes2dasdasdt@test.de')


        console.log(this.helper)
    }

    /**
     * Render after load
     */
    async setup() {
        await this.helper.getDataFromServer();

        this.render();
    };

    render() {
        this.renderContainer.innerHTML = '';
        this.helper.allTasks.forEach((task) => {
            if(task.state === 'backlog') {
                this.renderContainer.insertAdjacentHTML('beforeend',
                `<div class="entry-container box row" onclick="backlog.addToBoard(${task.timeOfCreation})">
                    <div class="urgency-color urgency-${task.urgency}"></div>
                    <span class="responsive-header">Assigned to:</span>
                    <div class="assigned-to-container row">
                        <img class="assigned-to-image" src="assets/empty-profile-picture.png">
                        <div class="column assigned-to-details">
                            <span class="assigned-to-name">Max Mustermann</span>
                            <span class="assigned-to-mail">max.mustermann@google.de</span>
                        </div>
                    </div>
                    <span class="responsive-header">Category:</span>
                    <div class="category-container">
                        <span>${this.capitalizeFirstLetter(task.category)}</span>
                    </div>
                    <span class="responsive-header">Title:</span>
                    <div class="details-container">
                        <span>${this.capitalizeFirstLetter(task.title)}</span>
                    </div>
                    <div class="add-to-board-container">+</div>
                </div>`
            );
            };
        });
    };

    /**
     * Add Item to board and upload to server + render after
     */
    addToBoard(timeOfCreation) {
        const item = this.helper.filterTaskIDs(this.helper.allTasks, timeOfCreation)[0];
        const itemIndex = this.helper.allTasks.indexOf(item);

        this.helper.allTasks[itemIndex].state = 'to-do';

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
