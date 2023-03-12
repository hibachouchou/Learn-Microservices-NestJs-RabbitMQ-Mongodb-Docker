import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from './constants/services';
import { CreateOrderRequest } from './dto/create-order-request';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
 constructor(private readonly orderRepository:OrdersRepository,
  @Inject(BILLING_SERVICE) private billingClient: ClientProxy,){}

 

async createOrder(request: CreateOrderRequest, authentication: string) {
  //return this.orderRepository.create(request)
  const session = await this.orderRepository.startTransaction();
  try {
    const order = await this.orderRepository.create(request, { session });
    await lastValueFrom(
      this.billingClient.emit('order_created', {
        request,
        Authentication: authentication,
      }),
    );
    await session.commitTransaction();
    return order;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  }
}

  async getAllOrders(){
return this.orderRepository.find({})
  }
}
