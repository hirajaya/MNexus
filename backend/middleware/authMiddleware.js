import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Artist from "../models/artistModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      if (user) {
        req.user = user;
        return next();
      }

      const artist = await Artist.findById(decoded.userId).select("-password");
      if (artist) {
        req.artist = artist;
        return next();
      }

      res.status(401);
      throw new Error("Not authorized, user not found.");
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

const authorizeSalesM = (req, res, next) => {
  if (req.user && req.user.isSalesM) {
    return next();
  } else {
    res.status(401).send("Not authorized as a Sales Manager.");
  }
};

const authorizeInventoryM = (req, res, next) => {
  if (req.user && req.user.isInventoryM) {
    return next();
  } else {
    res.status(401).send("Not authorized as an Inventory Manager.");
  }
};

const authorizeOrderM = (req, res, next) => {
  if (req.user && req.user.isOrderM) {
    return next();
  } else {
    res.status(401).send("Not authorized as an Order Manager.");
  }
};

const authorizeArtist = (req, res, next) => {
  if (req.artist) {
    return next();
  } else {
    res.status(401).send("Not authorized as an artist.");
  }
};

export {
  authenticate,
  authorizeAdmin,
  authorizeSalesM,
  authorizeInventoryM,
  authorizeOrderM,
  authorizeArtist,
};
