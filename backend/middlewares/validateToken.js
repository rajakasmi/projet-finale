const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  try {
    // Récupération du token depuis le header Authorization
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    // Vérification et décodage du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attache l'utilisateur décodé à la requête
    req.user = decoded; // contient _id, email, role
    next();
  } catch (error) {
    console.error("Token validation error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = validateToken;
