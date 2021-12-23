window.addEventListener('load', function () {
    let backlog = new Backlog();
})

class Backlog {
    renderContainer = document.getElementById('render-container');

    constructor() {
        this.renderContainer.innerHTML = '';

        setURL('http://gruppe-142.developerakademie.net/smallest_backend_ever');

        this.helper = new Helper();

        this.setup();
    }

    async setup() {
        await this.helper.getDataFromServer();

        this.render();
    }


    render() {
        this.renderContainer.innerHTML = '';
        
        this.helper.allTasks.forEach((task) => {
            this.renderContainer.insertAdjacentHTML('beforeend',
                `<div class="entry-container box row">
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
                    <span class="responsive-header">Details:</span>
                    <div class="details-container">
                        <span>${this.capitalizeFirstLetter(task.description)}</span>
                    </div>
                </div>`
            );
        });
    }

    capitalizeFirstLetter(str) {
        return str[0].toUpperCase() + str.slice(1);
    }
}
