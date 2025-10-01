const mongoose=require('mongoose')
 async function ConnectToDB(){
    try{
        await mongoose.connect(process.env.MOnGO_URL)
        console.log("connected to Mongodb")
    }catch(err){
console.log("not connected to mongodb",err)
    }
}
module.exports=ConnectToDB