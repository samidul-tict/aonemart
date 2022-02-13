import mongoose from 'mongoose'

const orderDetailsSchema = new mongoose.Schema({
   
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        require : true,
        ref: 'Order'
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        require : true,
        ref: 'Product'
    },
    productName: {
        type: String,
        minlength: 2,
        maxlength: 64,
        required:true
    },
    productDescription: {
        type:String,
        minlength: 2,
        required:true
    },
    productNumber: {
        type:String,
        minlength: 2,
        required:true
    },
    productImage: {
        type: Array,
        default: []
    },
    productQuantity :{
        type: Number,
        required:true,
        default: 0

    },
    productPrice:{
        type: Number,
        required:true,
        default: 0
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

export const OrderDetails = mongoose.model('OrderDetails', orderDetailsSchema); 