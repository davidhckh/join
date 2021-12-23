class Helper {

    allTasks = [];

    constructor() {
        this.getDataFromServer();
    }

     async getDataFromServer(){
        await downloadFromServer();
       this.allTasks=backend.getItem('allTasks') || [];
    }

    
    /**
     * uploads the current version of array allTasks to the backend. they key is allTasks.
     */
    uploadToServer() {
        backend.setItem('allTasks',this.allTasks);
    }

    /**
     * 
     * @param {array} array mainly this.allTasks
     * @param {int} id timeOfCreation of the task u want to search for
     * @returns the task with the given id
     */

    filterIDs (array,id) {
        return array.filter(task => task.timeOfCreation == id);
    }

    /**
     * let u edit a task in the array allTasks
     * @param {int} taskID timeOfCreation of the task u want to edit the
     * @param {string} taskSection section of the task u want to edit
     * @param {string} manipulation ur editation to the task at the taskSection
     */

    updateStatus(taskID,taskSection,manipulation) {
      let index = this.allTasks.findIndex(task => task.timeOfCreation == taskID);
      this.allTasks[index][taskSection] = manipulation;
      this.uploadToServer();
    } 

    /**
     * the function delets the task with the task id selected
     * @param {int} taskID timeOfCreatioon of the task u want to deleteOneTask
     */

    deleteOneTask(taskID){
        let index = this.allTasks.findIndex(task => task.timeOfCreation == taskID);
        this.allTasks.splice(index,1);
    }

    /**
     * delets all tasks stored in the key allTasks
     */

    deleteAllTasks(){
        backend.deleteItem('allTasks');
        this.allTasks=[];
    }
}