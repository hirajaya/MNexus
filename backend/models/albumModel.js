import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    albumtitle: { required: true, type: String },
    rLabel: { required: true, type: String }, 
    genre: { required: true, type: String },
    rdate:{ required: true, type: Date},
    price: { required: true, type: Number },
    AID: {
        type: String,
        required: true,
        ref: 'Artist' 
    }
}, { timestamps: true });

const Album = mongoose.model('Album', albumSchema);
export default Album