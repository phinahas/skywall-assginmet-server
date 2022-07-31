const jwt = require("jsonwebtoken");
const tokenSecret = require("./tokenSecret");
module.exports = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    console.log("no");
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const verified = jwt.verify(token, tokenSecret.tokenSecret);
    console.log(verified);
    if (verified.id === "phinahas") {
      next();
    } else {
      res.status(401).json({ message: "Access Denied" });
    }
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
};
