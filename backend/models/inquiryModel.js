import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
    orderID: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Order', required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    proofImage: { 
        type: String 
    }, 
    isApproved: {
        type: Boolean,
        required: true,
        default: false,
    },
    isDenied:{
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: { 
        type: Date, 
        default: Date.now },
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
