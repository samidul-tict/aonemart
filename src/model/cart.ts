import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
   
    products: {
        type: Array,
        default: []
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'Customer'
    },
    deviceId:{
        type: String,
        default: null
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
    // price:{
    //     type: Number,
    //     required:true,
    //     default: 0
    // },
    // quantity :{
    //     type: Number,
    //     required:true,
    //     default: 0

    // },
    softDelete: {
        type: Number,
        enum: [0, 1], 
        default: 0
    }
})

export const Cart = mongoose.model('Cart', cartSchema);