class Task {
    title;
    category;
    description;
    dueDate;
    urgency;
    backlogPosition = true;
    timeOfCreation;

    constructor(title, category, urgency, description, dueDate, assignedTo) {
        this.title = title;
        this.category = category;
        this.description = description;
        this.dueDate = dueDate;
        this.urgency = urgency;
        this.assignedTo = assignedTo
        this.setState();
        this.timeStamp();
    }


    setTitle(newTitle) {
        this.title = newTitle;
    }

    setCategory(newCategory) {
        this.Category = newCategory;
    }

    setDescription(newDescription) {
        this.description = newDescription;
    }

    setDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    setUrgency(newUrgency) {
        this.urgency = newUrgency;
    }

    setState() {
        this.state = 'backlog';
    }

    /**
     * the object should memorize when it was created
     */

    timeStamp() {
        this.timeOfCreation = new Date().getTime();
    }
}