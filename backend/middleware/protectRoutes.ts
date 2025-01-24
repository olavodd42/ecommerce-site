const jsonwebtoken = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Acesso não autorizado. Token ausente." });
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Anexar informações do token ao objeto req
    next(); // Continuar para a próxima função de middleware ou rota
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};