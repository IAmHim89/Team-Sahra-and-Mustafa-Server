const router = require("express").Router();
const Admin = require("../Models/adminModel");
const Image = require("../Models/imageModel");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/uploadImg", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).send("please upload file!");
    }
    console.log(file);
    const images = new Image({
      name: req.body.name,
      myFile: file,
    });

    const uploadedImg = await images.save();
    console.log(uploadedImg);
    res.status(200).json({
      Status: "Upload Completed!",
    });
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
    res.status(500).json({
      Error: err.message,
    });
  }
});

module.exports = router;
