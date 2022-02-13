import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        minlength: 2,
        maxlength: 64,
        required:true
    },
    productDescription: {
        type:String,
        minlength: 2,
        required:true
    },
    productNumber: {
        type:String,
        minlength: 2,
        required:true
    },
    productImage: {
        type: Array,
        default: []
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    isOrdered: {
        type: Number,
        default: 0
    },
    // CategoryName: {
    // type: String,
    // minlength: 2,
    // maxlength: 64,
    // required:true
    // },
    taxId:{
        type: String,
        default: 0
    },
    minQty: {
        type: Number,
        default: 0,
        required: true
    },
    qtyLeftInStock: {
        type: Number,
    },
    qtyTotalInStock: {
        type: Number,
    },
    sellerName: {
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
    isFeatured: {
        type: Number,
        enum: [0, 1], // 1 --> not featured, 0 --> featured
        default: 0
    },
    isAdded:{
        type: Number,
        enum: [0, 1], // 1 --> added, 0 --> not added
        default: 0
    },
    isFav:{
        type: Number,
        enum: [0, 1], // 1 --> favorite, 0 --> not favorite
        default: 0
    },
    isStock:{
        type: Number,
        enum: [0, 1], // 1 --> in stock, 0 --> no stock
        default: 1
    },
    price:{
        type: Number,
        required:true,
        default: 0
    },
   discountedPrice:{
        type: Number,
        default: 0
    },
    discount:{
        type: Number,
        default: 0
    },
   
    discountFlag:{
        type: Number,
        enum: [0, 1], // 1 --> available, 0 --> not available
        default: 0
    },
    sku:{
        type: String,
        required:true,
        default: null
    },
    quantity :{
        type: Number,
        required:true,
        default: 0

    },
    softDelete: {
        type: Number,
        enum: [0, 1], 
        default: 0
    }
})

productSchema.index({ productName: 'text' })

export const Product = mongoose.model('Product', productSchema);