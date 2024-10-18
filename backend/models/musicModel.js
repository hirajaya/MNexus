import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
    title: { required: true, type: String },
    composer: { required: true, type: String },
    rLabel: { required: true, type: String }, 
    genre: { required: true, type: String },
    rdate:{ required: true, type: Date},
    audioTrack: {
        type: String, 
        required: true,
    },
    AID: {
        type: String,
        required: true,
        ref: 'Artist' 
    }
}, { timestamps: true });

const Music = mongoose.model('Music', musicSchema);
export default Music;
