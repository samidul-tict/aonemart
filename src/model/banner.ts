import mongoose from 'mongoose'

const bannerSchema = new mongoose.Schema({  
    bannerFlag: {
        type: Number,
        enum: [0, 1], // 1 --> is static, 0 --> slider
    },
    // staticFlag: {
    //     type: Number,
    //     enum: [0, 1], // 1 --> is static, 0 --> not static
    //     default: 0
    // },
    // sliderFlag: {
    //     type: Number,
    //     enum: [0, 1], // 1 --> is static, 0 --> not static
    //     default: 0
    // },
    bannerImage: {
        type: String,
        default: null
    },
    bannerTitle: {
        type: String,
        minlength: 2,
        maxlength: 64,
        required:true
    },
    bannerSubtitle: {
        type: String,
        minlength: 2,
        maxlength: 64,
        required:true
    },
    bannerCategories: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    discount:{
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
        default: 0
    },

    softDelete: {
        type: Number,
        enum: [0, 1], 
        default: 0
    }
})

export const Banner = mongoose.model('Banner', bannerSchema);