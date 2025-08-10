import { Request, Response, NextFunction } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
interface Myreq extends Request {
    user?: {
        id: string
    };
}
export const authmiddleware = (req: Myreq, res: Response, next: NextFunction) => {
    try {

        const header = req.headers.authorization;
        if (!header) {
            res.status(400).json({ msg: "invalid header token" });
            return;
        }
        const token = header && header.split(" ")[0];
        const decode = Jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = decode._id;
        next();
    } catch (e) {
        res.status(500).json({ msg: `server down ${e}` })
    }

}