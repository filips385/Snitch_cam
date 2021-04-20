const CriminalController=require('../Controllers/criminal_controller');
const multer=require('multer');
const multerStorage = multer.memoryStorage();
const Criminal=require('../Models_Node/Criminals')
const AuthController=require('../Controllers/authentication/auth_controller')
const verifyUser=require('../Controllers/authentication/verifyUser.middleware')
const ValidationMiddleware=require('../Controllers/authentication/auth.validation.middleware')


const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 10 * 1024 * 1024 }
});


function toBuffer(ab) {
  var buf = Buffer.alloc(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
      buf[i] = view[i];
  }
  return buf;
}

exports.routesConfig = (app) =>{
 
    app.post('/CreateCriminal', upload.single('photo'),async (req, res,next) =>{
    //  ValidationMiddleware.validJWTNeeded;
     // verifyUser.isAdmin;
      const Kriminal=await Criminal.createOne(req.body);
      console.log(req.file);
      let image=toBuffer(req.file.buffer);
      require('fs').writeFileSync('./penis.jpeg', Buffer.from(image))
      Criminal.findByIdAndUpdate(Kriminal.id,{photo:image}).then(res.send("bravoo")).catch(err => console.log(err))

    });

     app.post('/:id/uploadphoto',upload.single('photo'),async (req, res,next) => {
    //    ValidationMiddleware.validJWTNeeded;
    //    CriminalController.isAdmin;
        const Kriminal=await Criminal.findById(req.params.id);
  
        let image=toBuffer(req.file.buffer);
        console.log(image);
        require('fs').writeFileSync('./penis.jpeg', Buffer.from(image))
        console.log(image);

        Criminal.findByIdAndUpdate(req.params.id,{photo:image}).then(res.send("bravoo")).catch(err => console.log(err))
     })    

    app.get('/criminals/',[
       // ValidationMiddleware.validJWTNeeded,
        CriminalController.getAllCriminals
    ])

}