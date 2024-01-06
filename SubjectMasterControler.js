const express=require("express");
const router=express.Router();
const authValidation=require("../../../../helper/authValidation");
const subjectMasterModel = require("../../../../model/subjectMasterModel");
const auth_seceret_key=require("../../../../utils/constent");
const moment = require('moment');
// console.log(auth_seceret_key.auth_secreat_key,"aaaaaaaaaaajjjjj");

router.use((req,res,next)=>{
    const new_auth=req.headers.auth;
    // console.log(new_auth ,"2222222222222222222222222")
    if(auth_seceret_key.auth_secreat_key==new_auth){
        next()
    }else{
        return res.send({status:400,massage:"auth key does not match"});

    }
})


router.route("/subject",authValidation).get((req,res)=>{
    const page= parseInt(req.query.page);
    const perPage=parseInt(req.query.limit);
    const skeepCount=(page-1)*perPage;  
    try{
    subjectMasterModel.find({}).skip(skeepCount).limit(perPage).lean()
        .then((resData) => {
            for(let i=0;i<resData.length;i++){
                resData[i].updateAt=moment(resData[i].updateAt).format('YYYY-MM-DD HH:MM:ss');
                resData[i].createdAt=moment(resData[i].createdAt).format('YYYY-MM-DD HH:mm:ss')
            }
            res.send({status:200,data:resData , message:"success"});

        })
        
        .catch((error) => {
            
            res.status(500).send({status:500,message:error.message,send:"aaaaaaa"});
        })
    } catch (error){
        console.log(error);
        res.send({status:500, message:error.message,send:'cccccccccc'})
    }
    // console.log("thise is subject controler..");

})

router.route("/subject/add",authValidation).post((req,res)=>{
          console.log("student add");
          const data=req.body;
          console.log(data);
          try{
             const body=req.body;
            let data={
                subjectName:body.subjectName,
                 subjectKey:body.subjectKey,
                  selectClass:body.selectClass,
                  subjectJustForGrade:body.subjectJustForGrade,
                  subjectSequence:body.subjectSequence
            }
            subjectMasterModel.create(data)
            .then(()=>{
                res.status(200).send({massage:200,status:"Subject add seccusefull"});
            })
            .catch((errors)=>{
                res.status(400).send({massage:400,error:errors});
            })

          }catch(errors){
           res.status(400).send({massage:400,errors});
          }
})

  router.route("/subject/findone/id",authValidation).put((req,res)=>{
         const body=req.body;
        //  console.log(body._id);
        try{
        subjectMasterModel.findOne({_id:body._id}).then((resdata)=>{
            res.status(200).send({data:resdata,massage:"data find succesfull"})
        }).catch((errors)=>{
            res.status(400).send({error:errors});
        })
    }catch(errors){
         res.status(400).send({error:errors});
    }
  })

     router.route("/subject/update/:id",authValidation).put((req,res)=>{
          const body=req.body;
          console.log(req.params.id);
          subjectMasterModel.findByIdAndUpdate({_id:req.params.id},{
            $set:{
                subjectName:body.subjectName,
                subjectKey:body.subjectKey,
                 selectClass:body.selectClass,
                 subjectJustForGrade:body.subjectJustForGrade,
                 subjectSequence:body.subjectSequence
            }
          }).then((result)=>{
            res.status(200).send({subject_update:result})
          }).catch((errors)=>{
            res.status(400).send({error:errors});
          })
     })



      router.route("/subject/dellite/:id",authValidation).delete((req,res)=>{
        
          try{ 
           subjectMasterModel.findByIdAndDelete({_id:req.params.id}).then((data)=>{
            res.status(200).send({status:200,delete:data,massage:"deta delite succesfull"})
           }).catch((errors)=>{
            res.status(400).send({error:errors});
           })
        }catch(errors){
                res.status(400).send({status:400,error:errors});
        }
      })
module.exports=router;