import { Injectable } from "@nestjs/common";
import { Task } from "./interface/task";
import { TaskStoreService } from "./task-store.service";
import { v4 as generateUuid } from 'uuid';



@Injectable()
export class TaskService{
    constructor(private readonly TaskStoreService: TaskStoreService ){}
    
    public async addTask(task: Task): Promise<Task>{
        task.uuid = generateUuid();
        task.completed=false;
        task.description='dummy';
        task.owner='Srishti';
        task.duration=2;
       return this.TaskStoreService.addTask(task);
    }

    public async getTask(id: string): Promise<Task>{
        return this.TaskStoreService.getTask(id);
    }

    public async deleteTask(id: string): Promise<Task[]>{
        return this.TaskStoreService.deleteTask(id);
    }

    public async getAllTasks(): Promise<Task[]>{
        return this.TaskStoreService.getAllTasks();
    }
    public async filterTask(filter): Promise<Task[]>{
        return this.TaskStoreService.filterTask(filter);
    }

}

function uuidv4(): any {
    throw new Error("Function not implemented.");
}
