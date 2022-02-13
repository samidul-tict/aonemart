import mongoose, { mongo } from 'mongoose';

const discountSchema = new mongoose.Schema({
    discountPercentage: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    products: [        
       {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
       }  
    ],
    isActive: {
        type: Number,
        enum: [0, 1], // 1 --> published, 0 --> unpublished
        default: 1
    },
    softDelete: {
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
        ref: 'Admin'
    },
    modifiedDate: Date,
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    
})

export const Discount = mongoose.model('Discount', discountSchema);