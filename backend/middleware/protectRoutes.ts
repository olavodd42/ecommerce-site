const jwt = require("jsonwebtoken");
import { Response, NextFunction } from "express";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: "Token ausente." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido/expirado." });
    }
    req.user = user;
    next();
  });
};
