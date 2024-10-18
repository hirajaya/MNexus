import Promotion from '../models/promotionModel.js';
import Product from '../models/productModel.js';

const createPromotion = async (req, res) => {
  const { product1, product2, promotionType,description, deduction, validFrom, validTo } = req.body;

  try {
    const prod1 = await Product.findById(product1);
    const prod2 = await Product.findById(product2);

    if (!prod1 || !prod2) {
      return res.status(404).json({ message: 'One or both products not found' });
    }

    const promotion = new Promotion({
      product1,
      product2,
      promotionType,
      description,
      deduction,
      validFrom,
      validTo,
    });

    const createdPromotion = await promotion.save();
    res.status(201).json(createdPromotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find().populate('product1').populate('product2');
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPromotionById = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id).populate('product1 product2', 'name');

    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }

    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updatePromotion = async (req, res) => {
  const { product1, product2, promotionType,description,deduction, validFrom, validTo } = req.body;

  try {
    const promotion = await Promotion.findById(req.params.id);

    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }

    promotion.product1 = product1 || promotion.product1;
    promotion.product2 = product2 || promotion.product2;
    promotion.promotionType = promotionType || promotion.promotionType;
    promotion.description = description || promotion.description;
    promotion.deduction = deduction || promotion.deduction;
    promotion.validFrom = validFrom || promotion.validFrom;
    promotion.validTo = validTo || promotion.validTo;

    const updatedPromotion = await promotion.save();
    res.status(200).json(updatedPromotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.deleteOne({ _id: req.params.id });
    if (promotion.deletedCount === 1) {
      res.status(200).json({ message: 'Promotion deleted successfully' });
    } else {
      res.status(404).json({ message: 'Promotion not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting promotion', error });
  }
};


export { createPromotion, getPromotions, getPromotionById, updatePromotion, deletePromotion };
