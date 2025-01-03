import { Module } from "@nestjs/common";
import { CustomerController } from "src/customer/controller/customer.controller";
import { CustomerModule } from "src/customer/customer.module";
import { CustomerService } from "src/customer/services/customer.service";


@Module({
    imports: [CustomerModule],
    controllers: [CustomerController],
    providers: [CustomerService],
})

export class TaskModule{}