require('dotenv').config();
const mongoose=require('mongoose');
const express=require('express');
const cors=require('cors');
const path = require('path');
const face=require('./faceRecognition')
bodyParser = require('body-parser');
const app = express();
const PORT=process.env.PORT
const uri=process.env.DB;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 


app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);
})

app.get('/',(req,res,next)=>{
    face.load()
    next()
})

app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.options('*',cors());

mongoose.connect(uri,
    { useNewUrlParser: true, 
      useUnifiedTopology: true}
    )
.then(console.log("Connected to DB"))
.catch(err=>console.log(err));

const UserRouter=require('./Routes/user_routes')
const CriminalRouter=require('./Routes/criminal_routes')
const AlertRoutes=require('./Routes/alerts_routes')
UserRouter.routesConfig(app)
CriminalRouter.routesConfig(app)
AlertRoutes.routesConfig(app)