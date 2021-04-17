const mongoose=require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Schema=mongoose.Schema;

const CriminalSchema=new Schema({

    Name:{
        type:String,
        required:true
    },
    photo:{
        type: Buffer
    }

})

const Criminal=mongoose.model('Criminal',CriminalSchema);



exports.createOne=(data)=>{
    const newCriminal=new Criminal(data);
    return newCriminal.save();
}

exports.findById = (id) => {
    return new Promise((resolve,reject)=>{
        Criminal.find({_id:id}).exec((err,data)=>{
            if(data){
                delete data._id;
                delete data.__v;
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}

exports.saveImage=(img)=>{
    Criminal.sa
}

exports.list=(perPage,Page)=>{
    return new Promise((resolve,reject)=>{
        Criminal.find()
        .limit(perPage)
        .skip(perPage*Page)
        .exec(function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

exports.findByIdAndDelete=(id)=>{
    return new Promise((resolve,reject)=>{
        Criminal.findOneAndDelete({_id:id}).exec(err=>{
            if(err){
                reject(err)
            }else{
                resolve(err)
            }
        });
    })

}


exports.findByIdAndUpdate = (id, CriminalData) => {
    return new Promise((resolve,reject)=>{
        Criminal.findOneAndUpdate({_id:id},CriminalData).exec((err,data)=>{
            if(data){
                resolve(data)
            }else{
                reject(err)
            }

        })
    })

};

module.exports.Criminal;