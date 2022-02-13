import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
   
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        require : true,
        ref: 'Customer'
    },
    addressId:{
        type: mongoose.Schema.Types.ObjectId,
        require : true,
        ref: 'Location'
    },
    paymentModeId:{
        type: String,
        require : true
    },
    taxAmount:{
        type: Number,
        require : true
    },
    orderQuantity :{
        type: Number,
        required:true,
        default: 0
    },
    orderGrandTotal:{
        type: Number,
        required:true,
    },
    deliveryCharge: {
        type: Number, 
        required: true, 
        default: 0
    },
    orderSubTotal: {
        type: Number,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    modifiedDate: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    isActive: {
        type: Number,
        enum: [0, 1], // 1 --> published, 0 --> unpublished
        default: 0
    },
    softDelete: {
        type: Number,
        enum: [0, 1], 
        default: 0
    }
})

export const Order = mongoose.model('Order', orderSchema); 