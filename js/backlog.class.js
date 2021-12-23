window.addEventListener('load', function() {
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
        console.log(this.helper.allTasks);
    }
}
