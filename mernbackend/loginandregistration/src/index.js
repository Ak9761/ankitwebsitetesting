require('dotenv').config();
const express = require('express')
const port = process.env.PORT || 3000
const path = require('path')
const app = express()
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const hbs = require('hbs')
const templatepath = path.join(__dirname,'../templates')
const cookieParser = require('cookie-parser')
app.set('view engine', 'hbs')
app.set('views',templatepath)
const collection = require('./mongoose')
const { config } = require('dotenv')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const auth = require('./auth')


app.get('/',(req,res)=>{
    res.render('registration')
})
app.get('/secret',auth,(req,res)=>{
    // console.log(`the cookies data is${req.cookies.jwt}`);
    res.render('secret')
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/logout', auth , async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((currentelement) =>{
            return currentelement.token != req.token
        })
        res.clearCookie('jwt')
        await req.user.save()
        res.render('login')
    } catch (error) {
        console.log(error);
    }
})
app.get('/logoutall', auth , async(req,res)=>{
    try {
        req.user.tokens = []
        res.clearCookie('jwt')
        await req.user.save()
        res.render('login')
    } catch (error) {
        console.log(error);
    }
})
app.get('/home',(req,res)=>{
    res.render('index')
})

app.post('/Registration', async (req,res)=>{
    const data = {
        name:req.body.name,
        password:req.body.password
    }
    const newData = new collection(data);
    const token = await newData.generateAuthToken()
    res.cookie('jwt',token,{
        expires:new Date(Date.now()+3600000),
        httpOnly:true
    })
    await newData.save();
    res.render('index')
})

app.post('/login',async(req,res)=>{
    try {
        const check = await collection.findOne({name:req.body.name})
        const ismatch = await bcrypt.compare(req.body.password,check.password)
        const token = await check.generateAuthToken()
        
        res.cookie('jwt',token,{
            expires:new Date(Date.now()+3600000),
            httpOnly:true
        })
        
        if (ismatch) {
            res.render('index')
        }
        else{
            res.send('wrong password')
        }
    } catch (error) {
        res.send('wrong details');
    }
})

app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})