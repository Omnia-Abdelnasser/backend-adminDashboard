
const express=require('express')
const User = require('../models/user')
const bcrypt=require('bcrypt')
const router=express.Router()
const {UpdateValidate,Validate} =require('../validate/validate-user')
//get all users
router.get('/',async(req,res)=>{
try{
    let user=await User.find()
    res.status(200).json(user)
}catch(err){
    res.status(500).json({message:err.message})
}

})

// get user by Id
router.get('/:id',async(req,res)=>{
try{
    let user=await User.findById(req.params.id)
    res.status(200).json(user)
}catch(err){
    res.status(500).json({message:err.message})
}

})

// delete user
router.delete('/:id',async(req,res)=>{
try{
    let user=await User.findByIdAndDelete(req.params.id)
   if(user){
    return res.status(200).json("user has been deleted successfully")
   }
   res.status(404).json("user not found")
}catch(err){
    res.status(500).json({message:err.message})
}

})

// update user

router.put('/:id',async(req,res)=>{

      const errorMsg = Validate(UpdateValidate , req.body);
  if (errorMsg) return res.status(400).send(errorMsg); 
try{
if(req.body.password){
       const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
}
const updateduser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true}).select("-password")

if(!updateduser){
    return res.status(404).json("user not found")
}
res.status(200).json( updateduser)


}catch(err){
   res.status(500).json({message:err.message})  
}

})

















module.exports=router