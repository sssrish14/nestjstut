import { IsDefined, IsEmail, IsNotEmpty, IsString} from "class-validator";
export class UserDto{

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsDefined()
    username: string;
}

export class UserParamsDto{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}