
import {Order} from '../model/order';
import {OrderDetails} from '../model/orderDetails';
import { Product } from '../model/product';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Dispute } from '../model/raiseDispute'
import { PaymentStatus } from '../model/paymentStatus'
import { Payment } from '../model/payment';

let objectId = mongoose.Types.ObjectId

const addOrderController = async (req : any, res : any, next : any) => {
   
    const productData = req.body.cartdata;
  
    try {
        let order = new Order({
            "customerId":req.body.customerId,
            "addressId":req.body.addressId,
            "paymentModeId":req.body.paymentModeId,
            "taxAmount":req.body.taxAmount,
            "orderQuantity":req.body.orderQuantity,
            "orderGrandTotal":req.body.orderGrandTotal,
            "deliveryCharge": req.body.deliveryCharge,
            "orderSubTotal": req.body.orderSubTotal
        })
        
        productData.forEach(async (el: any) => {
            let orderDetails = new OrderDetails({
                "orderId": order._id,
                "productId": el._id,
                "productName": el.productName,
                "productDescription": el.productDescription,
                "productNumber": el.productNumber,
                "productImage": el.productImage,
                "productQuantity": el.quantity,
                "productPrice": el.price
            })
            
            let product = await Product.findById(new objectId(el._id));
            let leftStock = product.qtyLeftInStock - el.quantity;
            if (leftStock > 0) {
                await Product.findByIdAndUpdate(el._id, { $inc: { isOrdered: 1 }, $set: { qtyLeftInStock: leftStock } })
                await order.save();
                await orderDetails.save()
            } else if (leftStock < 0) {
                res.status(400).json({ status: 400, message: `${el.productName} Quantity exceeds required amount` })
                return 
            } else if (leftStock === 0) {
                await Product.findByIdAndUpdate(el._id, { $inc: { isOrdered: 1 }, $set: { qtyLeftInStock: leftStock, isStock: 0 } })
                await order.save();
                await orderDetails.save()
            }
        })

        let payment = new PaymentStatus({
            orderId: order._id,
            paymentId: 'n/a',
            paymentMode: req.body.paymentModeId,
            profileId: 'n/a',
            customerId: req.body.customerId,
            paymentStatus: 'pending',
            createdBy: req.body.customerId
        })
        await payment.save()

        

        return res.status(200).json({
            status: 200,
            message: 'Order Placed Successfully',
            orderId: order._id
        })
    } catch (error) {
        console.log(error)
          res.send({ error });
    }
}


const getOrderController = async (req : any, res : any, next : any) => {
    let { id } = req.params
    try {
    let orderList = await Order.aggregate([
        { $match: { customerId: new objectId(id) } }, //filter the orders with respect to customerId
        { $sort: { createdDate: -1 } },
        { 
            $lookup: {
                from:  'orderdetails',
                localField: '_id',
                foreignField: 'orderId',
                as: 'orderDetails'
            },             
        },
        {
            $lookup: {
                from: 'locations',
                localField: 'addressId',
                foreignField : '_id',
                as: 'address'
            }
        },
        {
            $lookup: {
                from: 'paymentstatuses',
                let: { localId: "$_id"},
                pipeline: [
                    {
                        $match: { $expr: { $eq: ["$$localId", "$orderId"] } }
                    },                   
                ],
                as: 'paymentStatus'
            }
        },
        { $unwind: '$address' }, //only return the address object,
        { $unwind: '$paymentStatus' }, 
        { $project: { addressId: 0 } } //remove the addressId proprty
    ])
       res.status(200).json(orderList)
    } catch (error) {
        console.log(error)
          res.send({ error });
    }
}

//router.put('/update-status/:id', [auth, admin], async (req, res) => {
    const changeOrderStatusForAdmin = async (req : any, res : any, next : any) => {
    let order = await PaymentStatus.findById(req.params.id)
  
    if (!order)
      return res.status(404).send({ message: "Order with following id not found !" });
  
      order.paymentStatus = order.paymentStatus === "pending" ? "success" : "pending";
      order.save();
  
    // auditFunc({
    //   admin: req.user._id,
    //   title: 'Admin Status Changed',
    //   description: `Status of ${admin.name} changed to  ${admin.isActive}`,
    //   ip: req.ip
    // })
  
    res.send({ message: "Order Status Successfully Updated" });
  }

const getAllOrdersForAdmin = async (req: any, res: any, next: any) => {
    console.log('log')
    try {
        let allOrders = await Order.aggregate([
            { $match: { isActive: 0, softDelete: 0 } },
            { 
                $lookup: {
                    from:  'orderdetails',
                    localField: '_id',
                    foreignField: 'orderId',
                    as: 'orderDetails'
                },             
            },
            {
                $lookup: {
                    from: 'locations',
                    localField: 'addressId',
                    foreignField : '_id',
                    as: 'address'
                }
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customerId',
                    foreignField : '_id',
                    as: 'customer'
                }
            },
            {
                $lookup: {
                    from: 'disputes',
                    localField: '_id',
                    foreignField: 'orderId',
                    as: 'disputes'
                }
            },
            {
                $lookup: {
                    from: 'paymentstatuses',
                    let: { localId: "$_id"},
                    pipeline: [
                        {
                            $match: { $expr: { $eq: ["$$localId", "$orderId"] } }
                        },                   
                    ],
                    as: 'paymentStatus'
                }
            },
            { $unwind: '$address' },
            { $unwind: '$customer' },
            { $unwind: '$paymentStatus' },
            { $project: { addressId: 0, customerId: 0 } },
            { $sort: { createdDate: -1 } }, 
        ])

        res.status(200).send(allOrders)
    } catch (error) {
        console.log(error)
          res.send({ error });
    }
}


const getOrderDetailsControllerById = async (req : any, res : any, next : any) => {
    try {
       let orderDetailsList = await OrderDetails.find({ orderId : req.params.id }) ; 
       console.log('asd',orderDetailsList);
       res.status(200).json(orderDetailsList)
    } catch (error) {
        console.log(error)
          res.send({ error });

    }

}

const raiseDisputeOnOrderId = async (req: Request, res: Response) => {
    const reqObj = {
        orderId: req.body.orderId,
        customerId: req.body.customerId,
        message: req.body.message,
        createdBy: req.body.customerId,
        isActive: 1
    }
    try {
        const dispute = new Dispute(reqObj);
        await dispute.save()
        res.status(200).json({ status: 200, message: 'dispute raised successfully'  })
    } catch (error) {
        console.log(error)
          res.send({ error });
    }

}

export {addOrderController,getOrderController,getOrderDetailsControllerById, 
    getAllOrdersForAdmin, raiseDisputeOnOrderId, changeOrderStatusForAdmin}  ; 


function ordetails(data:any) {
    return new Promise(async (resolve, reject) => {
        let arr2 :any = []
        let orderDetailsList = await OrderDetails.find() ;
        console.log('asgjhhjhjhjddd',orderDetailsList);
        orderDetailsList.map((od:any)=>{
            arr2.push(od)
        })
            return resolve(arr2)
            reject(new Error());
        })
    }
