import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Req, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/user';
import { UserDto, UserParamsDto } from './dto/user.dto';
import { HttpExceptionFilter } from './filter';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(
    @Param('id',ParseIntPipe)id: number,
    @Query('sort') sort: boolean,
    @Body() data: UserDto,
    @Req() req: Request
  ): User[] {
    return this.userService.getUsers();
  }



  @Get('/:email')
  @UseFilters(new HttpExceptionFilter())
  async getUser(@Param()params: UserParamsDto, @Req() req: Request):Promise<User>{ //@Req for accessing body 
    try{
      return await this.userService.getUser(params.email);
    }catch(err)
    {
      throw new BadRequestException('test');
    }
    
  }

  @Post()
  @UsePipes(new ValidationPipe())
  postUser(@Body() user: UserDto): User {
    return this.userService.addUser(user);
  }

  @Delete('/:email')
  deleteUser(@Param()params: UserParamsDto): User[] {
    return this.userService.deleteUser(params.email);
  }
}

