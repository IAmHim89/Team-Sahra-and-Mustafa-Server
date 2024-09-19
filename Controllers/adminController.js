//! Admin Controller
//Import Necessary packages here
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/adminModel");

// Secret key for JWT (should be stored in environment variables for production)

// POST Request - Admin Registration (Signin)
router.post("/signup", async (req, res) => {
  try {
    // Create a new admin by hashing the password
    const newAdmin = await Admin.create({
      adminName: req.body.adminName, // Admin's username
      password: bcrypt.hashSync(req.body.password, 12), // Hash the password before saving
    });

    // Generate a JWT token for the new admin
    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "2 days", // Token will expire in 2 days
    });

    // Send successful response back with created admin and token
    res.status(200).json({
      Created: newAdmin,
      Msg: "Success, Admin Created!",
      Token: token, // return token here for future authentication
    });
  } catch (err) {
    //handles the errors like duplicate admin
    res.status(500).json({
      Error: err.code === 11000 ? "Admin Already exists" : err.message,
    });
  }
});

// Post Request  - Admin Login/Sing in

router.post("/signin", async (req, res) => {
  try {
    const { adminName, password } = req.body; // Extract admin's username and password from the request body

    // Find the admin by adminName in the database
    const admin = await Admin.findOne({ adminName: adminName });

    // If no admin found with that name, throw an error
    if (!admin) {
      throw new Error("Incorrect admin name or password");
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, admin.password);

    // If passwords don't match, throw an error
    if (!passwordMatch) {
      throw new Error("Incorrect admin name or password");
    }

    // Generate a JWT token if the login is successful
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
      expiresIn: "1 day", // Token will expire in 1 day
    });
    res.json({ token });

    // Send success response with the admin data and token
    res.status(200).json({
      Msg: "Admin signed in!", // Success message
      Admin: admin, // return admin info
      Token: token, // return token
    });
  } catch (err) {
    //error handling for incorrect login details or server
    res.status(500).json({
      Error: err.message, // return error message to client
    });
  }
});
// export router for main server file deployment
module.exports = router;
