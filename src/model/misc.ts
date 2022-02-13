import mongoose from 'mongoose'

const miscSchema = new mongoose.Schema({
   
    slabName:{
        type: String,
        require : true 
    },
    slabDescription:{
        type: String,
        require : true
    },
    slabPercentage:{
        type: String,
        require : true
    },
    slabPoint:{
        type: Number,
        require : true
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

export const Misc = mongoose.model('Misc', miscSchema); 