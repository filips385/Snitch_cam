const CriminalController=require('../Controllers/criminal_controller');
const multer=require('multer');
const multerStorage = multer.memoryStorage();
const Criminal=require('../Models_Node/Criminals')

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
 
    app.post('/CreateCriminal', [
        CriminalController.createCriminal
     ]);

     app.post('/:id/uploadphoto',upload.single('photo'),async (req, res,next) => {
    
        const Kriminal=await Criminal.findById(req.params.id);
        let image=toBuffer(Kriminal[0].photo.buffer);
        require('fs').writeFileSync('./penis.jpeg', Buffer.from(image))
        console.log(image);

        Criminal.findByIdAndUpdate(req.params.id,{photo:image}).then(res.send("bravoo")).catch(err => console.log(err))
     })    

    app.get('/criminals/',[
        CriminalController.getAllCriminals
    ])

}