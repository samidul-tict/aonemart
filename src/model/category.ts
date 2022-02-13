import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        default: "0"
    },
    categoryName: {
        type: String,
        minlength: 2,
        maxlength: 64,
        required:true
    },
    categoryDescription: {
        type:String,
        minlength: 2,
        default: null

    },
    categoryImage: {
        type: String,
     //   minlength: 2,
        default: null
    },
    categoryType: {
        type: String,
        enum: ["0", "1" , "2"], // 0 --> No Sub Cat, 1 --> Single Sub Cat, 2 --> Double Cat
        default: "0"
    },
    subCategoryFlag: {
        type: Number,
        enum: [0, 1], // 0 -->  !subCategory, 1 --> subCategory
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
        enum: [0, 1], // 0 --> unpublished, 1 --> published
        default: 0
    },
    softDelete: {
        type: Number,
        enum: [0, 1], 
        default: 0
    }
})

categorySchema.index({ categoryName: 'text' })

export const Category = mongoose.model('Category', categorySchema);