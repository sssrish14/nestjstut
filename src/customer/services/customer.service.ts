import { Injectable} from "@nestjs/common";
import { Model } from "mongoose"; // Ensure you have this import for Model
import { v4 as generateUuid } from 'uuid';
import { Customer } from "../interface/customer.interface";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCustomerDTO } from "../dto/customer.dto";



@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {}

    public async listCustomer(): Promise<Customer[]>{
        return await this.customerModel.find({});
    }

    public async createCustomer(customer): Promise<Customer>{
        const newCustomer = new this.customerModel(customer);
        return await newCustomer.save();
        
    }

    public async updateCustomer(id, customerDto: CreateCustomerDTO): Promise<Customer>{
        const updateCust= this.customerModel.findByIdAndUpdate(id, customerDto, {new: true});
        return updateCust;
        
    }

    public async getCustomer(id: string): Promise<Customer>{
        const customer=await this.customerModel.findById(id).exec();
        return customer;
    }

    public async removeCustomer(id: string): Promise<Customer[]>{
        return await this.customerModel.findByIdAndDelete(id);
    }
}
