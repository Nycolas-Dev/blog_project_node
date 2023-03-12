import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// Verify the token

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });

};

// Verify if the user is admin or if he modify himself data

export const verifyHimself = (req, res, next) => {
    if (req.user.id === req.body.author || req.user.id === req.body._id || req.user.id === req.body.data.author || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    };
};

// Verify if user is admin

export const verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not an administrator !"));
    }
};