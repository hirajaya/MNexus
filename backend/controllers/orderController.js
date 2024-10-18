import Order from "../models/orderModel.js";
import Driver from "../models/driverModel.js";
import Product from "../models/productModel.js";

function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const deliveryPrice = itemsPrice > 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);

  const totalPrice = (
    itemsPrice +
    deliveryPrice +
    parseFloat(taxPrice)
  ).toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    deliveryPrice: deliveryPrice.toFixed(2),
    taxPrice,
    totalPrice,
  };
}

const createOrder = async (req, res) => {
  try {
    const { orderItems, deliveryAddress, paymentMethod } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }

    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      if (!matchingItemFromDB) {
        res.status(404);
        throw new Error(`Product not found: ${itemFromClient._id}`);
      }

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    const { itemsPrice, taxPrice, deliveryPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      deliveryAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      deliveryPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id username");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const countTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const calculateTotalSales = async (req, res) => {
  try {
    const orders = await Order.find();
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    res.json({ totalSales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const calculateTotalSalesByDate = async (req, res) => {
  try {
    const salesByDate = await Order.aggregate([
      {
        $match: {
          isPaid: false, 
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }, 
          },
          totalSales: { $sum: "$totalPrice" }, 
          orderCount: { $sum: 1 }, 
        },
      },
    ]);

    console.log('Sales By Date:', salesByDate); 
    res.json(salesByDate); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const findOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markOrderAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updateOrder = await order.save();
      res.status(200).json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      const driver = await Driver.findById(req.body.driverId);

      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }

      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.driver = driver._id;

      const updatedOrder = await order.save();

      res.status(200).json({
        message: "Order marked as delivered and assigned to driver",
        order: updatedOrder,
      });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getOrderCountByUser = async (req, res) => {
  try {
    const orderCountByUser = await Order.aggregate([
      {
        $group: {
          _id: "$user",
          orderCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users", 
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          _id: 0,
          username: "$userDetails.username",
          email: "$userDetails.email",
          orderCount: 1,
        },
      },
    ]);

    res.json(orderCountByUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const calculateTotalProfits = async (req, res) => {
  try {
    const orders = await Order.find().populate("orderItems.product", "price");

    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const totalCosts = orders.reduce((sum, order) => {
      return sum + order.orderItems.reduce((itemSum, item) => {
        return itemSum + (item.price * item.qty);
      }, 0);
    }, 0);

    const totalProfit = (totalSales - totalCosts).toFixed(2);

    res.json({ totalSales, totalCosts, totalProfit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: "$orderItems.product",
          count: { $sum: "$orderItems.qty" },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $project: {
          _id: 0,
          productId: "$productDetails._id",
          productName: "$productDetails.name",
          count: 1,
        },
      },
    ]);

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTotalSalesByArtist = async (req, res) => {
  try {
    const totalSalesByArtist = await Order.aggregate([
      { $unwind: "$orderItems" },
      {
        $lookup: {
          from: "products",
          localField: "orderItems.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $lookup: {
          from: "artists",
          localField: "productDetails.artist",
          foreignField: "_id",
          as: "artistDetails",
        },
      },
      { $unwind: "$artistDetails" },
      {
        $group: {
          _id: "$artistDetails.AID",
          totalSales: { $sum: { $multiply: ["$orderItems.qty", "$orderItems.price"] } },
        },
      },
      {
        $lookup: {
          from: "artists",
          localField: "_id",
          foreignField: "AID",
          as: "artistInfo",
        },
      },
      { $unwind: "$artistInfo" },
      {
        $project: {
          _id: 0,
          AID: "$_id",
          artistName: "$artistInfo.name",
          totalSales: 1,
        },
      },
      { $sort: { totalSales: -1 } },
    ]);

    res.json(totalSalesByArtist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
  updateOrderToDelivered,
  getOrderCountByUser,
  calculateTotalProfits,
  getTopProducts,
  getTotalSalesByArtist
};
