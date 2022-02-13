import mongoose from 'mongoose';

const paymentStatusSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order'
    },
    paymentId: {
        type: String,
        required: true
    },
    paymentMode: {
        type: String,
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    paymentStatus: {
        type: String,
        required: true, 
    },
    profileId: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
})

export const PaymentStatus = mongoose.model('PaymentStatus', paymentStatusSchema)