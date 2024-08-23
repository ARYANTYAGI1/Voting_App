const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'ARYAN#123';

const generateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
    };
    const options = {
        expiresIn: '1h',
    };
    const token = jwt.sign(payload, JWT_SECRET, options);
    return token;
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
      console.log('Error', error)
    }
};

const validateToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = {
    generateToken,
    verifyToken,
    validateToken
};
