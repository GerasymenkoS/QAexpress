
const multer = require('multer');
const constant = require('../utils/constant');

const storage = multer.diskStorage({
    destination: __dirname.replace('/lib', '') + constant.PUBLIC_UPLOAD_URL,
    filename(req, file, cb) {
      cb(null, `${+ new Date()}-${file.originalname}`);
    },
});

exports.upload =  multer({ storage })
    
    

   
      
    
