import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Customer'
    },
    addressName: {
        type: String,
        minlength: 2,
        maxlength: 64,
        required:true
    },
    addressType: {
        type: String,
        required:true
    },
    state: {
        type: String,
        minlength: 0,
        maxlength: 64,
        required: false
    },
    district: {
        type: String,
        minlength: 0,
        maxlength: 64,
        required:false
    },
    city: {
        type: String,
        minlength: 2,
        maxlength: 64,
        required:true
    },
    houseNo: {
        type: String,
        minlength: 2,
        maxlength: 64,
        required:true
    },
    street: {
        type: String,
        minlength: 2,
        maxlength: 64,
        required:true
    },
    pincode: {
        type: String,
        minlength: 2,
        maxlength: 64,
        required:true
    },
    customerPhone: {
        type: String,
        minlength: 0,
        maxlength: 10,
        required:false
    },
    customerEmail: {
        type: String,
        minlength: 2,
        maxlength: 64,
        required:true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
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

export const Location = mongoose.model('Location', locationSchema);