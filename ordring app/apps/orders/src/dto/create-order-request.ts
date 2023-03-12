import { IsNumber,IsPositive ,IsNotEmpty,IsString,IsPhoneNumber} from "class-validator";

export class CreateOrderRequest{

@IsString()
@IsNotEmpty()
name : string ;

@IsNumber()
@IsPositive()
@IsNotEmpty()
price: number;

@IsPhoneNumber()
@IsNotEmpty()
phoneNumber:string ;

}