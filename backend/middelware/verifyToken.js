const jwt  = require("jsonwebtoken");
const password = "admin"
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization; 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        })
    }
    const token = authHeader.split(' ')[1];
    // const token = req.cookies.access_token;
    try {
        const decode = jwt.verify(token,password );
        req.user = decode;
        next();
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = verifyToken