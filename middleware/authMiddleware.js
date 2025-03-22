const jwt = require("jsonwebtoken");

exports. verifyToken = (req, res, next) => {
    console.log("token problem");
    
    const token = req.cookies.token; // ✅ Read token from cookie
    console.log("Token:", token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

exports. verifyAdmin=(req,res,next)=>{
    console.log("admin check");
    const token= req.cookies.token;
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        if(req.user.role=='admin')
            next();
        else
            return res.status(401).json({ message: "Invalid or expired token" });
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}


