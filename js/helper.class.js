class Helper {

    allTasks = [];
    allUsers = [];

    constructor() {

    }

    async getDataFromServer() {
        await downloadFromServer();

        let data = backend.getItem('data');
        console.log(data)
        if(data) {
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
    */
    createNewUser(name, mail, image) {
        if (!image) {
            image = 'assets/empty-profile-picture.png';
        };

        this.allUsers.push(new User(
            name,
            mail,
            image
        ));

        this.uploadToServer();
    }

    /**
     * TBD
     */
    mailExists(mail) {
        console.log(this.allTasks)
        console.log(this.allUsers.find((user) => user.mail == mail))
    }

    getUserDetails(mail) {

    }
}