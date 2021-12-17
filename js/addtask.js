let tasks=[];

/**
 * function reads the values of input and than pushes a new Task in tasks.
 */

function addNewTask() {
    let title=document.getElementById('taskTitle').value;
    console.log('i test the title',title);
    let category=document.getElementById('taskCategory').value;
    let urgency=document.getElementById('taskUrgency').value;
    let description=document.getElementById('taskDescription').value;
    let dueDate=document.getElementById('taskDate').value;
    tasks.push(new Task(title,category,urgency,description,dueDate));

    title="";
    category="";
    urgency="";
    description="";
    dueDate="";

}


class Task{
    title;
    category;
    description;
    dueDate;
    urgency;
    backlogPosition=true;
    boardPosition=false;

    constructor(title,category,description,dueDate,urgency){
        this.title=title;
        this.category=category;
        this.description=description;
        this.dueDate=dueDate;
        this.urgency=urgency;
    }
}

/**
 * functions checks every frequenz miliseconds if the form was filled out (!!!!NO VALIDATION YET!!!!)
 * 
 * @param {int} frequenz - amount of checks per 1000 seconds
 */

function isFilledOut(frequenz){
    setInterval(() => {
        let buttonContainer=document.getElementById('buttonContainer');
        let buttonCreate=document.getElementById('buttonCreate');
        let buttonCancel=document.getElementById('buttonCancel')

        let title=document.getElementById('taskTitle').value;
        let category=document.getElementById('taskCategory').value;
        let urgency=document.getElementById('taskUrgency').value;
        let description=document.getElementById('taskDescription').value;
        let dueDate=document.getElementById('taskDate').value;

        if(title && category && urgency && description && dueDate)
        {
            buttonContainer.classList.remove("hide");
            buttonCreate.classList.remove("hide");
            buttonCancel.classList.remove("hide");
        }

        else {
            buttonContainer.classList.add("hide");
            buttonCreate.classList.add("hide");
            buttonCancel.classList.add("hide");
        }


    },frequenz);
}


function init(){
    let checkFrequenz=50;
    includeHTML();
    isFilledOut(checkFrequenz);
}