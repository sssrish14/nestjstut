import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./interface/task";

@Injectable()
export class TaskStoreService{
    public tasks: Task[]=[];

    public async addTask(task: Task): Promise<Task>{
        this.tasks.push(task);
        console.log(task, this.tasks);
        return Promise.resolve(task);
    }

    public async getTask(id: string): Promise<Task>{
        const task = this.tasks.filter(i=> i.uuid ===id);
        if(task && task.length>0)
        {
            return Promise.resolve(task[0]);
        }
        throw new NotFoundException("Task Not Found");
    }

    public async deleteTask(id: string): Promise<Task[]>{
        const task = this.tasks.filter(i=> i.uuid ===id);
        if(task && task.length===0)
        {
            throw new NotFoundException("Task Not Found");
        }
        const newTask = this.tasks.filter(i=> i.uuid !==id);
        this.tasks= newTask;
        return Promise.resolve(this.tasks);
    }

    public async getAllTasks(): Promise<Task[]>{
        console.log(this.tasks);
        return Promise.resolve(this.tasks);
    }
/*
    public async filterTask(filter): Promise<Task[]>{
        if(!filter)
        {
            return Promise.resolve(this.tasks);
        }
        return Promise.resolve(this.tasks.filter((i: Task)=>{
            return i.duration>0;
        }));
        
    }*/
    public async filterTask(filter: boolean): Promise<Task[]> {
        console.log('Filter:', filter);
        console.log('Tasks before filtering:', this.tasks);
      
        const filteredTasks = this.tasks.filter((task: Task) => {
          return filter ? task.duration > 0 : task.duration <= 0;
        });
      
        console.log('Filtered Tasks:', filteredTasks);
        return Promise.resolve(filteredTasks);
      }
      

}