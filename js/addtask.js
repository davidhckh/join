let tasks=[];


function addNewTask() {
    let title=document.getElementById('taskTitle').value;
    console.log('i test the title',title);
    let category=document.getElementById('taskCategory').value;
    let urgency=document.getElementById('taskUrgency').value;
    let description=document.getElementById('taskDescription').value;
    let dueDate=document.getElementById('taskDate').value;
    tasks.push(new Task(title,category,urgency,description,dueDate));

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
