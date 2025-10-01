const jwt=require('jsonwebtoken')

// verify token
function verifyToken(req,res,next){

const token =req.headers.token
if(token){
    try{

        const decoded=jwt.verify(token,process.env.SECRETKEY)
        req.user=decoded
        next()
    }catch(error){
res.status(401).json({message:"invalid token"})
    }  
}
else{
    res.status(401).json({message:"no token provided"})
}
}

//verify token and authorize
 async function verifyTokenandothoraize(){
verifyToken(req,res,()=>{

    if(req.user.id==req.params.id||req.user.isAdmin){
        next()
    }
    else return res.status(403).json({message:"you are not allowed"})
})
      
 
}

//verify token and admin
async function verifyTokenandAdmin(){
verifyToken(req,res,()=>{

    if(req.user.isAdmin){
        next()
    }
    else return res.status(403).json({message:"you are not allowed"})
})
      
   
}
module.exports={verifyTokenandAdmin,verifyTokenandothoraize}

