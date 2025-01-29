const jsonwebtoken = require("jsonwebtoken");
import { Response, NextFunction } from "express";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Extrai o token

  if (!token) {
    return res.status(401).json({ error: "Acesso não autorizado. Token ausente." });
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET || "defaultSecret"); // Decodifica o token
    req.user = decoded; // Salva os dados do token no req.user
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};
