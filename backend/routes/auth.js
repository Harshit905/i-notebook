const express=require('express');
var bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User=require("../models/User");
const router=express.Router();
var jwt = require('jsonwebtoken');
// router.use(express.json());

const JWT_SECRET="Harry is a good guy";

//create a user using: POST "/api/auth".

router.post('/createuser',[
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password','password must be atleast 5 characters').isLength ({ min: 5 })
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
try {
    
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error:"email already exists"})
    }
    user=await User.create ({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        })
        
        
        // .then (user => res.json (user))
        // .catch(err=> {console.log(err)
            // res.json({error: 'Please enter a unique value for email', message: err.message})})
            const data={
                user:{
                    id:user.id
                }
            }
            const authToken= jwt.sign(data,JWT_SECRET);
            console.log(authToken)
 res.json(authToken)
} catch (error) {
    console.error(error);
        res.status(500).json({ message: 'Server error' });
}
})


module.exports=router;