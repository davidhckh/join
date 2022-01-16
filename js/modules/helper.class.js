class Helper {

    allTasks = [];
    allUsers = [];

    constructor() {

    }

    async getDataFromServer() {
        await downloadFromServer();

        let data = backend.getItem('data');

        if (data) {
            this.allTasks = data.allTasks;
            this.allUsers = data.allUsers;
        }
    }

    /**
    * uploads the current version of array allTasks and allUsers to the backend
    */
    uploadToServer() {
        backend.setItem('data', {
            allTasks: this.allTasks,
            allUsers: this.allUsers
        });
    }


    /**----------------------------------- Tasks ---------------------------------------------- */

    /**
     * 
     * @param {array} array mainly this.allTasks
     * @param {int} id timeOfCreation of the task u want to search for
     * @returns the task with the given id
     */
    filterTaskIDs(array, id) {
        return array.filter(task => task.timeOfCreation == id);
    }

    /**
     * let u edit a task in the array allTasks
     * @param {int} taskID timeOfCreation of the task u want to edit the
     * @param {string} taskSection section of the task u want to edit
     * @param {string} manipulation ur editation to the task at the taskSection
     */
    updateStatus(taskID, taskSection, manipulation) {
        let index = this.allTasks.findIndex(task => task.timeOfCreation == taskID);
        this.allTasks[index][taskSection] = manipulation;
        this.uploadToServer();
    }

    /**
     * the function delets the task with the task id selected
     * @param {int} taskID timeOfCreatioon of the task u want to deleteOneTask
     */
    deleteOneTask(taskID) {
        let index = this.allTasks.findIndex(task => task.timeOfCreation == taskID);
        this.allTasks.splice(index, 1);
        this.uploadToServer();
    }

    /**
     * delets all tasks stored in the key allTasks
     */
    deleteAllTasks() {
        backend.deleteItem('allTasks');
        this.allTasks = [];
    }


    /**----------------------------------- Users ---------------------------------------------- */

    /**
     * uploads the current version of array allUsers to the backend.
     * @param {*} name - name of the user
     * @param {*} mail - mail of the user
     * @param {*} image - image of the user
     * @param {*} password - password of the user
     */
    async createNewUser(name, mail, image, password) {
        await this.getDataFromServer();

        if (!this.mailExists(mail)) {
            this.allUsers.push(new User(
                name,
                mail,
                image,
                password
            ));

            this.uploadToServer();
        }
    }

    /**
     * Checks if mail exists to prevent duplicate users
     * @param {*} mail - The mail that needs to be checked
     */
    mailExists(mail) {
        if (this.allUsers.find((user) => user.mail == mail)) {
            return true;
        } else {
            return false;
        };
    }
}