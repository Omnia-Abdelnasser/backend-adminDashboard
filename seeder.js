
const ConnectToDB = require('./config/db')
const patients = require('./data')
const Patient = require('./models/patient')
const dotenv=require('dotenv')
dotenv.config()

//connect to db
ConnectToDB()

//import student
const importPatient=async()=>{
    try{
await Patient.insertMany(patients);
console.log("patient imported")
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}


// remove student

const removePatient=async()=>{
    try{
await Patient.deleteMany()
console.log("patient removed")
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

if (process.argv[2]==="-import"){
    importPatient()
}
else if(process.argv[2]==="-remove"){
    removePatient()
}