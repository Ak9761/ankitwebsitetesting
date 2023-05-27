require('dotenv').config();
const SECRETKEY = process.env.SECRET
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
    password:{
        type:String,
        required:true
    },
    tokens:[{
            token:{
                type:String,
                required:true
            }
        }]
})
loginschema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()},SECRETKEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token
    } catch (error) {
        console.log(error);
    }
}
loginschema.pre('save', async function(next){
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

const collection = new mongoose.model('collection1',loginschema)
module.exports = collection