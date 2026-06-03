import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protectRoute = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Access denied. Token missing." });
        }

        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
        
        // 1️⃣ Fetch the user from the database
        const existingUser = await User.findById(decodedPayload.id).select("-password");

        // 2️⃣ 🛡️ SAFETY CHECK: If the user was deleted from the DB, block the ghost token!
        if (!existingUser) {
            return res.status(401).json({ message: "Authentication failed. User account no longer exists." });
        }

        // 3️⃣ Inject the verified user cleanly into the request object
        req.user = existingUser;
        next();

    } catch (err) {
        return res.status(401).json({ message: "Authentication failed. Token is invalid or expired." });
    }
};