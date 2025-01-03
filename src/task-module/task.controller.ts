import { Body, Controller, Delete, Get, Param, ParseBoolPipe, Post, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './interface/task';
import { Response } from 'express';
import { QueryParamDto, TaskDto, TaskParamDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
/*one way 
  @Get()
  async getAllTask():Promise<Task[]>{
    return this.taskService.getAllTasks();
  }
    */
   @Get()
   @UsePipes(new ValidationPipe())
   async getAllTask(@Res() res: Response){
    const data=await this.taskService.getAllTasks();
    return res.status(200).send(data);
   }

   
   @Get('/filter/data')
   @UsePipes(new ValidationPipe({ whitelist: false, transform: true}))
   async filterTaskById( @Query('filter', ParseBoolPipe) filter: boolean, @Res() res: Response){
    const data=await this.taskService.filterTask(filter);
    return res.status(200).send(data);
   }

   @Get('/:id')
   @UsePipes(new ValidationPipe())
   async getTaskById(@Param() reqParam: TaskParamDto, @Res() res: Response){
    const data=await this.taskService.getTask(reqParam.id);
    return res.status(200).send(data);
   }

   @Delete('/:id')
   @UsePipes(new ValidationPipe())
   async deleteTaskById(@Param() reqParam: TaskParamDto, @Res() res: Response){
    const data=await this.taskService.deleteTask(reqParam.id);
    return res.status(200).send(data);
   }

   @Post()
   @UsePipes(new ValidationPipe())
   async createTask(@Body() task: TaskDto, @Res() res: Response){
    console.log(task);
    const data=await this.taskService.addTask(task);
    return res.status(200).send(data);
   }
 
}
