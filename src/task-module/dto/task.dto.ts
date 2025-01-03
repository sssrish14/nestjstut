import { Transform } from "class-transformer";
import { IsBoolean, isDefined, IsDefined, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class TaskDto{
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;

}
export class TaskParamDto{
    @IsUUID()
    @IsDefined()
    id: string;
}

export class QueryParamDto{
    @IsDefined()
    @IsBoolean()

    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        //return value; // Fallback for non-string values (e.g., direct boolean inputs)
    })
    filter: boolean;

    @IsDefined()
    @IsString()
    name: string;
}