import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true 
    },
    email: {
        type: String,
        required:true 
    },
    phone: {
        type: String,
        required:true     
    },
    password: {
        type: String,
        required:true
    },
    createdDate: { type: Date, default: Date.now },
    createdBy: {
        type: String,
        default : '1'
    },
    modifiedDate: Date,
    modifiedBy: {
     type: String,
     default : '1'
    },
    isActive: {
        type: String,
        enum: ['0', '1'],
        default: '1'
    },
    softDelete: {
        type: String,
        enum: ['0', '1'],
        default: '0'
    }
})
export const Admin = mongoose.model('Admin', adminSchema);
