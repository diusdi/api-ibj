const jwt = require("jsonwebtoken");
const config = require("../configs/secret");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.secret, (err, user) => {
    req.user = user;

    next();
  });
};
