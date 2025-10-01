
const express =require('express')
const Patient = require('../models/patient')
const { createpatientSchema,Validate,updatepatientSchema } = require('../validate/validate-patient')
const router=express.Router()


// get all patients
router.get('/',async(req,res)=>{
    const {pagenumber}=req.query;
    const patientPerPage=5;
try{

    const patients=await Patient.find().populate("doctor").skip((pagenumber-1)*patientPerPage).limit(patientPerPage)
    res.status(200).json(patients)
}catch(err){
    res.status(500).json({message:message.err||"server error"})
}
})

//get patient by Id

router.get('/:id',async(req,res)=>{
try{

    const patient=await Patient.findById(req.params.id).populate("doctor","name")
    res.status(200).json(patient)
}catch(err){
    res.status(500).json({message:message.err||"server error"})
}
})


// create patient

router.post('/',async(req,res)=>{
      const errorMsg = Validate(createpatientSchema, req.body);
  if (errorMsg) return res.status(400).send(errorMsg); 
try{
const newpatient=new Patient({
    name:req.body.name,
    age:req.body.age,
    desease:req.body.desease,
    doctor:req.body.doctor
})
    await newpatient.save()
    res.status(200).json(newpatient)
}catch(err){
    res.status(500).json({message:message.err||"server error"})
}
})


//update patient


router.put('/:id',async(req,res)=>{
      const errorMsg = Validate(updatepatientSchema, req.body);
  if (errorMsg) return res.status(400).send(errorMsg); 
try{
 const patient=await Patient.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
      if(!patient){ return res.status(404).json("patient not found")}
    res.status(201).json(patient)
}catch(err){
    res.status(500).json({message:message.err||"server error"})
}
})


// delete patient

router.delete('/:id',async(req,res)=>{
try{
 const patient=await Patient.findByIdAndDelete(req.params.id)
      if(!patient){ return res.status(404).json("patient not found")}
    res.status(201).json("patient has been deleted")
}catch(err){
    res.status(500).json({message:message.err||"server error"})
}
})





module.exports=router
