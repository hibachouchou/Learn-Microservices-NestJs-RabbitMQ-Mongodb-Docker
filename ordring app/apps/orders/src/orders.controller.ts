import { JwtAuthGuard } from '@app/common';
import { Controller, Post,Body, Get, UseGuards, Req } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order-request';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {
    return this.ordersService.createOrder(request, req.cookies?.Authentication);
  }
@Get()
async getAllOrders(){
return this.ordersService.getAllOrders()
}
}
