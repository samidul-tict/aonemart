import mongoose, { Schema } from 'mongoose';

const disputeSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Order'
    },
    customerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    message: {
        type: String,
        required: true
    },
    isActive: {
        type: Number,
        enum: [0, 1],
        default: 0
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
})

export const Dispute = mongoose.model('Dispute', disputeSchema)