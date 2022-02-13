import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
   
    paymentMode: {
        type: Number,
        enum: [0, 1], // 1 --> Online, 0 --> COD
        default: 0
    },
    paymentModeName: {
        type: String,
        require: true
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

export const Payment = mongoose.model('Payment', paymentSchema); 