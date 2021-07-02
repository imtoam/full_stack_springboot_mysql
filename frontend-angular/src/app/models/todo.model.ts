export class Todo { // can be interface also
    id: number;
    task: string;
    due: string;
    status: string;

    constructor(){
        this.id = 0;
        this.task = "";
        this.due = new Date(Date.now()).toISOString().slice(0, 10);
        this.status = "pending";
    }
}
