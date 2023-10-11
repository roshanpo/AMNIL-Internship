const multer = require('multer');
const Images = require("../models/image.js");
const path = require('path');

const isImage = (file) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  return allowedExtensions.includes(fileExtension);
};

//multer storage
const Storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./uploads',)},
  filename:(req,file,cb)=>{
    cb(null, Date.now() + "--" + file.originalname);}
})
//multer middleware
const upload = multer({
  storage:Storage,
  fileFilter: (req, file, cb) => {
    if (isImage(file)) {
        cb(null, true);
    } else {
        cb(new Error(`Only image files are allowed`));
    }
  }
}).single('image');



module.exports = upload;






