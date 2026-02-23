const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "You are not Authorized to perform this request" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Your token is either expired or invalid." });

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
