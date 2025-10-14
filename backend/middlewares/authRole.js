// In a separate file, e.g., authMiddleware.js
const jwt = require('jsonwebtoken');

const auth = (allowedRoles) => {
  return (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user; // Assuming user info including roles is in the token payload

      // Check if user has an allowed role
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};

module.exports = auth;