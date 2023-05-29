const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ak9899772:lovetolife123@cluster0.rf2yfxn.mongodb.net/?retryWrites=true&w=majority').then(()=>{
      console.log('connection successfully');
  }).catch((err)=>{
      console.log(err);
  })

  const loginschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const collection = new mongoose.model('collection3',loginschema)
module.exports = collection