//!variable calls
const Admin = require("../Models/adminModel");
const jwt = require("jsonwebtoken");

//! validate session function

const validateSession = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    console.log("current header provided with request", auth);
    if (!auth) throw new Error("Unauthorized");

    const token = auth.split(" ")[1];

    if (!token) throw new Error("Unauthorized");

    //!Status of token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    console.log("decrypted payload:", decoded);

    //verify (string,secret)
    console.log(decoded);
    const admin = await Admin.findById(decoded.id);

    if (!admin) throw new Error("Admin not found!");
    console.log("User making request", admin);
    req.admin = admin;

    return next();
  } catch (err) {
    res.status(500).json({
      Error: err.message,
    });
  }
};

module.exports = validateSession;
