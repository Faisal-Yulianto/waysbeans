import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../libs/jwt";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'unauthorized' });
        return;
    }

    try {
        const decoded = verifyToken(token);
        console.log("Decoded Token:", decoded); 
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification error:", error); 
        res.status(401).json({ message: 'invalid token' });
        return;
    }
};
