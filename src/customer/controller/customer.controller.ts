import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { Response } from 'express';
import { CreateCustomerDTO } from '../dto/customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Get()
  async getAllCustomers(@Res() res: Response){
    const data= await this.service.listCustomer();
    res.status(HttpStatus.OK).json(data);
  }

  @Post()
  async createCustomers(@Res() res: Response, @Body() customerParam: CreateCustomerDTO ){
    const data= await this.service.createCustomer(customerParam);
    res.status(HttpStatus.OK).json(data);
  }

  @Get('customer/:customerid')
  async getCustomerById(@Res() res: Response, @Param('customerid')id: string) {
    const data= await this.service.getCustomer(id);
    res.status(HttpStatus.OK).json(data);
  }

  @Delete('/')
  async delete1CustomerById(@Res() res: Response, @Query('customerid')id: string) {
    const data= await this.service.removeCustomer(id);
    res.status(HttpStatus.OK).json(data);
  }

  @Put('/:customerid')
  async updateCustomerById(@Res() res: Response,@Param('customerid') id: string, @Body() customerData: CreateCustomerDTO) {
    const data= await this.service.updateCustomer(id, customerData);
    res.status(HttpStatus.OK).json(data);
  }
}
