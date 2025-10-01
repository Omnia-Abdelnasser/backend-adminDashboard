
const express=require('express');
const { RegisterValidate, LoginValidate,Validate } = require('../validate/validate-user');
const User = require('../models/user');
const jwt=require('jsonwebtoken')
const bcrypt=require("bcrypt")
const router=express.Router()


// register user

router.post('/register',async(req,res)=>{
const errorMsg = Validate(RegisterValidate, req.body);
  if (errorMsg) return res.status(400).send(errorMsg);
  
  let user=await User.findOne({email:req.body.email})
  if(user){
    return  res.status(400).json("you have been already registered")
  }
const salt =await bcrypt.genSalt(10)
req.body.password=await bcrypt.hash(req.body.password,salt)

try{
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    await user.save()
    const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRETKEY,{expiresIn:"1d"})
    const {password,...other}=user._doc

    res.status(201).json({...other,token})
}

  catch(err){
res.status(500).json({message:err.message||"server error"})
  }

})

// login user

router.post('/login',async(req,res)=>{
const errorMsg = Validate(LoginValidate, req.body);
  if (errorMsg) return res.status(400).send(errorMsg);
  
  try{

  
  let user=await User.findOne({email:req.body.email})
  if(!user){
   return res.status(400).json("invalid email or password")
  }
const IsPasswordMatch=await bcrypt.compare(req.body.password,user.password)
  if(!IsPasswordMatch){
   return  res.status(404).json("invalid email or password")
  }
  const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRETKEY,{expiresIn:"1d"})
    const {password,...other}=user._doc

    res.status(200).json({...other,token})

}catch(err){
res.status(500).json({message:err.message||"server error"})
  }

})

// forget password
router.post('/forgetpassword',async(req,res)=>{
    try{
let user=await User.findOne({email:req.body.email})
if(!user){
    return res.status(404).json("user not found")
}
const token=jwt.sign({id:user._id},process.env.SECRETKEY,{expiresIn:"1d"})
res.status(200).json({link:`http://localhost:3000/resetpassword/${user._id}/${token}`})

}catch(err){
res.status(500).json({message:err.message||"server error"})
}
})

// reset password
router.post('/resetpassword/:id/:token',async(req,res)=>{
    const {id,token}=req.params
    try{
        const decoded=jwt.verify(token,process.env.SECRETKEY)
        if(decoded.id!==id){
            return res.status(403).json("invalid token")
        }
        const user=await User.findById(id)
        if(!user){
            return res.status(404).json("user not found")
        }
        user.password=await bcrypt.hash(req.body.password,10)
        await user.save()
        res.status(200).json("password reset successfully")
    }catch(err){
        res.status(500).json({message:err.message||"server error"})
    }
})


module.exports=router