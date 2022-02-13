import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        minlength: 2,
        maxlength: 64,
        default: 'Guest'
    },
    customerPhone: {
        type:String,
        minlength: 2,
        maxlength: 64,
        required:true
    },
    customerEmail: {
        type:String,
        default: ''
    },
    customerOTP: {
        type:String,
        required:true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    modifiedDate: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
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

export const Customer = mongoose.model('Customer', customerSchema);