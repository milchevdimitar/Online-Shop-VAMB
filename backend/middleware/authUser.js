import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    console.log("Auth middleware triggered!");
    const token = req.header("token");

    if (!token) {
        console.log("No token provided!");
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token verified:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Invalid token!");
        res.status(403).json({ message: "Invalid token" });
    }
};

export default auth