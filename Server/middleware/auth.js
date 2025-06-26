// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const authMiddle = async (req, res, next) => {
//   const { token } = req.headers;
//   if (!token) {
//     return res.status(401).json({ error: "Please signin first" });
//   }
//   jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
//     if (err) {
//       return res.status(401).json({ error: "Invalid token, Signin again" });
//     }
//     req.user = decode;
//     next();
//   });
// };

// module.exports = { authMiddle };