import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user';

@Injectable()
export class UserService {
    public users: User[]=[]

  getUsers(): User[]{
    return this.users;
  }

  async getUser(email:String): Promise<User>{
    const UserData= this.users.filter(i => i.email ==email);
    if(UserData && Array.isArray(UserData) && UserData.length>0){
        return Promise.resolve(UserData[0]);
    }
    throw new NotFoundException('User Not Found');
  }

  addUser(user: User): User{
    this.users.push(user);
    return user;
  }

  deleteUser(email: string): User[]{
    const remainingUser= this.users.filter(i=>i.email!==email);
    this.users=remainingUser;
    return this.users;
  }
}
