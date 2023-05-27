const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()
require('./db/connect')

const viewsPath = path.join(__dirname, '../views')
const staticpath = path.join(__dirname,'../public')

app.use(express.static(staticpath))
app.set('view engine','hbs')
app.set('views',viewsPath)

// console.log(path.join(__dirname,'../public'));

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})