const multer = require('multer');

//configurar multer para subir archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'book_image-' + Date.now() + '.' + filetype);
    }
});
const upload = multer({storage: storage});

module.exports = upload;