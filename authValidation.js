// const auth="abcd";
const jwt = require('jsonwebtoken');
 const auth_secreat_key=require("../utils/constent");
 
// console.log("aaaaaaaaaaaaaa..................a : ",auth_secreat_key.auth_secreat_key)
// Token generate_token function....
const generate_token=(id)=>{
    console.log(id);
    const jwtsecret_key =  auth_secreat_key.auth_secreat_key;                   // process.env.JWT_SECRET_KEY||'jitendra'
     let date={
        time:Date(),
        userID:id,
     }
     const token=jwt.sign(date,jwtsecret_key);
     return ({token:token});
   }



  const validateBearerToken=async(req,res,next)=>{
      try{
            let token=req.headers.authorization;
            if(token){
            token=token.split("Bearer ")[1];
            jwt.verify(token,jwtsecret_key,async(err,decodedValue)=>{
                if(err){
                    return res.status(401).send({status:401,massage:err['message']});
                }
                else{
                    next();
                }
            })
        }else{
            return res.status(401).send({status:401,massage:err['massege']});
        }
        }catch(error){
           return res.status(401).send({status:401,massage:err['massege']});
        }
  }

   const fileMOve=(req,cb)=>{
         const file=req;
        
         file.mv(`${__dirname}/../images/${file.name}`,err=>{
            if(err){
                 cb(err)
            }
             cb(null,{file: `{public/${file.name}}`})
         })
   }


  module.exports={
    generate_token,
    validateBearerToken,
   fileMOve
  }