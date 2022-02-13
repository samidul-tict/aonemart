import mongoose from 'mongoose';

const taxSchema = new mongoose.Schema({
    taxPercentage: {
        type: Number,
        default: 0
    },
    appliedOn: {
        type: Number,
        enum: [0, 1], // 0 <-- subtotal, 1 <-- grandTotal
        default: 0
    },
    shippingCharge: {
        type: Number,
        default: 0
    },
    shippingAppliedOn: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    minOrderValue: {
        type: Number,
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
        default: 1
    },
    softDelete: {
        type: Number,
        enum: [0, 1], 
        default: 0
    }
})

export const Tax = mongoose.model('Tax', taxSchema);