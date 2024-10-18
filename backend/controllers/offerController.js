import Offer from "../models/offersModel.js";

const createOffer = async (req, res) => {
    try {
        const { offername, offertype, offermonth, offercode, offeramount, offerdescription } = req.body;

        if (!offername || !offertype || !offermonth || !offercode || !offeramount || !offerdescription) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newOffer = new Offer({
            offername,
            offertype,
            offermonth,
            offercode,
            offeramount,
            offerdescription
        });

        await newOffer.save();
        res.status(201).json(newOffer);

    } catch (error) {
        res.status(500).json({ message: 'Error creating offer', error: error.message });
    }
};

const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find(); 
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching offers', error: error.message });
    }
};

const getOfferById = async (req, res) => {
    try {
        const offerId = req.params.id; 
        const offer = await Offer.findById(offerId); 
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching offer', error: error.message });
    }
};

const updateOffer = async (req, res) => {
    try {
        const offerId = req.params.id;
        const { offername, offertype, offermonth, offercode, offeramount, offerdescription } = req.body;

        const offer = await Offer.findById(offerId);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        offer.offername = offername || offer.offername;
        offer.offertype = offertype || offer.offertype;
        offer.offermonth = offermonth || offer.offermonth;
        offer.offercode = offercode || offer.offercode;
        offer.offeramount = offeramount || offer.offeramount;
        offer.offerdescription = offerdescription || offer.offerdescription;

        const updatedOffer = await offer.save();
        res.status(200).json(updatedOffer);

    } catch (error) {
        res.status(500).json({ message: 'Error updating offer', error: error.message });
    }
};

const deleteOffer = async (req, res) => {
    try {
        const offerId = req.params.id;

        const offer = await Offer.findByIdAndDelete(offerId);

        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        res.status(200).json({ message: 'Offer deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting offer', error: error.message });
    }
};



export {createOffer, getAllOffers, getOfferById, updateOffer, deleteOffer}
