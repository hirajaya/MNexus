import Inquiry from '../models/inquiryModel.js';

const createInquiry = async (req, res) => {
    try {
        const { orderID, description } = req.body;
        const proofImage = req.file ? req.file.path : null;

        const newInquiry = new Inquiry({ orderID, description, proofImage });
        await newInquiry.save();
        res.status(201).json(newInquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().populate('orderID');
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInquiryById = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id)
            .populate({
                path: 'orderID',
                populate: {
                    path: 'user',
                    select: 'username', 
                },
            });

        if (inquiry) {
            res.json(inquiry);
        } else {
            res.status(404);
            throw new Error('Inquiry not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getInquiriesByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        const inquiries = await Inquiry.find()
            .populate({
                path: 'orderID',
                match: { user: userId }, 
            });

        const userInquiries = inquiries.filter(inquiry => inquiry.orderID !== null);

        if (!userInquiries || userInquiries.length === 0) {
            return res.status(404).json({ message: 'No inquiries found for this user' });
        }

        res.status(200).json(userInquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateInquiry = async (req, res) => {
    try {
        const updatedInquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInquiry) return res.status(404).json({ message: 'Inquiry not found' });
        res.status(200).json(updatedInquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteInquiry = async (req, res) => {
    try {
        const deletedInquiry = await Inquiry.findByIdAndDelete(req.params.id);
        if (!deletedInquiry) return res.status(404).json({ message: 'Inquiry not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const approveInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        inquiry.isApproved = true;
        inquiry.isDenied = false;
        await inquiry.save();

        res.status(200).json({ message: 'Inquiry approved successfully', inquiry });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const denyInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        inquiry.isDenied = true;
        inquiry.isApproved = false;
        await inquiry.save();

        res.status(200).json({ message: 'Inquiry denied successfully', inquiry });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getApprovedInquiries = async (req, res) => {
    try {
      const { status } = req.query; 
  
      let inquiries;
      if (status === 'approved') {
        inquiries = await Inquiry.find({ isApproved: true });  
      } else if (status === 'denied') {
        inquiries = await Inquiry.find({ isDenied: true });    
      } else {
        inquiries = await Inquiry.find();                      
      }
  
      res.status(200).json(inquiries);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
};


export {createInquiry,getAllInquiries,getInquiryById,updateInquiry,deleteInquiry, getInquiriesByUserId, approveInquiry, denyInquiry, getApprovedInquiries}
