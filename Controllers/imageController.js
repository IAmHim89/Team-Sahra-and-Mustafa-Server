const router = require("express").Router();
const Admin = require("../Models/adminModel");
const Image = require("../Models/imageModel");

router.post("/uploadImg", async (req, res) => {
  try {
    const images = new Image({
      name: req.body.name,
      mgyFile: req.body.myFile,
    });

    const uploadedImg = await images.save();
    console.log(uploadedImg);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err.message,
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allImages = await Image.find();
    res.status(200).json({ allImages });
  } catch (err) {
    res.status(200).json({
      Error: err.message,
    });
  }
});

module.exports = router;
