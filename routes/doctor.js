
const express=require('express')
const Doctor = require('../models/doctor')
const { createdoctorSchema,Validate, updatedoctorSchema } = require('../validate/validate-doctor')
const router=express.Router()



// get all doctors

router.get('/',async(req,res)=>{
 try{
     const doctor = await Doctor.find()
    res.status(200).json(doctor)
 }catch(err){
res.status(500).json({message:"server error"||err})
 }

})

// get doctor by Id
router.get('/:id',async(req,res)=>{
 try{
     const doctor = await Doctor.findById(req.params.id)
    res.status(200).json(doctor)
 }catch(err){
res.status(500).json({message:"server error"||err})
 }

})

// create new doctor

router.post('/',async(req,res)=>{
     const errorMsg = Validate(createdoctorSchema, req.body);
  if (errorMsg) return res.status(400).send(errorMsg);
 try{
    const doctor= new Doctor({
       name:req.body.name ,
       age:req.body.age,
       email:req.body.email,
       specialty:req.body.specialty
    })
    await doctor.save()
    res.status(201).json(doctor)
 }catch(err){
res.status(500).json({message:"server error"||err})
 }

})

// update doctor
router.put("/:id", async (req, res) => {
  const errorMsg = Validate(updatedoctorSchema, req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});


//delete doctor

router.delete('/:id',async(req,res)=>{
 try{
     const doctor = await Doctor.findByIdAndDelete(req.params.id)
     if(!doctor){
        res.status(404).json("Doctor not found")
     }

    res.status(200).json("doctor has been deleted")
 }catch(err){
res.status(500).json({message:"server error"||err})
 }

})


module.exports=router