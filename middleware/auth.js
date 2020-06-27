import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

dotenv.config();

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({error: 'invalid token'});
    }
}

export default auth;
