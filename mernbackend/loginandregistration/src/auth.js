const jwt = require('jsonwebtoken')
const collection = require('./mongoose')

const auth = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        const verifyuser = jwt.verify(token,process.env.SECRET)
        // console.log(verifyuser);
        const user = await collection.findOne({_id:verifyuser._id})
        // console.log(user);
        req.token = token
        req.user = user
        next()
    } catch (error) {
        console.log(error);
    }
}
module.exports = auth