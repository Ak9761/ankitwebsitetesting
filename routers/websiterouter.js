const express = require('express')
const router = new express.Router()

const collection = require('../src/connection.js')
router.use(express.json())
router.use(express.urlencoded({extended:false}))


router.get('/',(req,res)=>{
    res.render('index.pug')
})
router.get('/about',(req,res)=>{
    res.render('about.pug')
})
router.get('/contact',(req,res)=>{
    res.render('contact.pug')
})
router.get('/services',(req,res)=>{
    res.render('services.pug')
})
const { body, validationResult } = require('express-validator');

router.post('/form', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
], async (req, res) => {
  const validatedData = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  };

  try {
    const newData = new collection(validatedData);
    await newData.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(400).send('Bad Request');
  }
});


module.exports = router