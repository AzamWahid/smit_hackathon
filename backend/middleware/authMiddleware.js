import pkg from "jsonwebtoken";
const { verify } = pkg;

export const verifyToken = (req, res, next) => {
  try {
    console.log(req.cookies);
    const token =
      req.cookies.access_token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });
    console.log(token);
    const decoded = verify(token, process.env.JWT);
    console.log(decoded)
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
