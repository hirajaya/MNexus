import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
{
    offername:{
        type: String,
        required: true
    },
    offertype:{
        type: String,
        required: true
    },
    offermonth:{
        type: String,
        required: true
    },
    offercode:{
        type: String,
        required: true,
    },
    offeramount:{
        type: Number,
        required: true,
    },
    offerdescription:{
        type: String,
        required: true
    }
  },{ timestamps: true }
)

const Offer = mongoose.model('Offer', offerSchema)

export default Offer