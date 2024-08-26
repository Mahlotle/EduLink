const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.status(401).json({ error: "User not logged in!" });
  }

  try {
    const validToken = verify(accessToken, "importantsecret");

    req.user = validToken; // Attach the decoded token payload to the request object
    return next();
  } catch (err) {
    // Differentiate between JWT errors
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ error: "Token expired!" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ error: "Invalid token!" });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

module.exports = { validateToken };
