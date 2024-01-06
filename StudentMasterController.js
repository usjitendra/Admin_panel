const express = require('express');
const 
routers = express.Router();
const app = express();
const jwt = require('jsonwebtoken');

const student_master_model = require("../../../../model/studentMasterModel");
const {                                                                                                                                                                       } = require("../validation/vaildation")
const{validateBearerToken,generate_token}=require("../../../../helper/authValidation");
const { body, validationResult } = require('express-validator');
const moment = require('moment');
const auth_seceret_key=require("../../../../utils/constent")

console.log(" student master : ",auth_seceret_key.auth_secreat_key)


// Admin verify function..
routers.use(function (req, res, next) {
    const new_auth = req.headers.auth;
    // console.log(new_auth);
    if (auth_seceret_key.auth_secreat_key == new_auth) {
        next();
    }
    else {
        res.send({ satus: 401, massage: "auth key does not match" });
    }
})



routers.route("/alldetails").get((req, res) => {
    console.log("student master control...")

    res.send("student mastrer services get method add...");
})

// Student Add function....

routers.route("/student/add", validateBearerToken).post(                                                                                                                                                                    , (req, res) => {
    // routers.route("/student/add").post((req,res)=>{

    const errors = validationResult(req);
     if(!errors.isEmpty()){
        return res.status(400).send({errors:errors.array()});

     }
    try {
        const body = req.body;

        if (body.dob) {
            body.dob = moment(body.dob).unix();
        }
        if (body.joiningDate) {
            body.joiningDate = moment(body.joiningDate).unix();
        }

        //console.log(body.dob);

        const data = {
            firstName: body.firstName,
            lastName: body.lastName,
            regNo: body.regNo,
            currentClass: body.currentClass,
            Idtype: body.Idtype,
            IdNo: body.IdNo,
            gender: body.gender,
            dob: (body.dob * 1),
            religion: body.religion,
            caste: body.caste,
            subcast: body.subcast,
            joiningDate: body.joiningDate,
            mobileNo: body.mobileNo,
            email: body.email,
            studentImage: body.studentImage,
            fatherName: body.fatherName,
            fatherOccupation: body.fatherOccupation,
            fatherEmailID: body.fatherEmailID,
            fatherMobileNo:body.fatherMobileNo,
            motherName: body.motherName,
            motherOccupation: body.motherOccupation,
            motherMobileNo: body.motherMobileNo,
            parentAddress: body.parentAddress,
            parentPermanentAddress: body.parentPermanentAddress,
        }

        //  console.log(body.dob);

        student_master_model.create(data)
            .then(() => {
                res.send("deta succesful up date....")
            })
            .catch((error) => {
                res.send(error);
            })
    } catch (err) {
        console.log(`student save err${err}`);
    }

})

routers.route("/student/fetchAll", validateBearerToken).get((req, res) => {


    student_master_model.find()
        .then((resData) => {
            res.send({ resData })
        })
        .catch((error) => {
            res.status("new error in detabase..").send(error);
        })
})

//Update student api.....
routers.route("/student/fetch/id", validateBearerToken).put((req,res)=>{
    let body= req.body;
    console.log(body._id);
     //res.status(401).json({massage:"fingf"})
     student_master_model.findOne({_id:body._id}).then((resdata)=>{
            if(!resdata){
                return res.send({status:500,message:"Record not found"})
            }else{
                res.send(resdata)
            }
     })

    // const userId=parserInt(req.params.id); 
    // const update=red.body;
    // const userIndex=users.findIndex(user=>user.id===userId);
    // if(userIndex !==-1){
    //     users[userIndex]={...[userIndex],...update}
    //     res.json({massege:"user update seccessfuly"});
    // }
    // else{
    //     res.status(401).json({massage:"user note found.."});
    // }

})

  routers.route("/student/update/:id").put(                                                                                                                                                                    ,(req,res)=>{
      const body=req.body;
    //   console.log(body)
      if (body.dob) {
        body.dob = moment(body.dob).unix();
    }
    if (body.joiningDate) {
        body.joiningDate = moment(body.joiningDate).unix();
    }
    //   console.log(req.params.id);

      student_master_model.findOneAndUpdate({_id:req.params.id},{
        $set:{
            firstName: body.firstName,
        lastName: body.lastName,
        regNo: body.regNo,
        currentClass: body.currentClass,
        Idtype: body.Idtype,
        IdNo: body.IdNo,
        gender: body.gender,
        dob: (body.dob * 1),
        religion: body.religion,
        caste: body.caste,
        subcast: body.subcast,
        joiningDate: body.joiningDate,
        mobileNo: body.mobileNo,
        email: body.email,
        studentImage: body.studentImage,
        fatherName: body.fatherName,
        fatherOccupation: body.fatherOccupation,
        fatherEmailID: body.fatherEmailID,
        motherName: body.motherName,
        motherOccupation: body.motherOccupation,
        motherMobileNo: body.motherMobileNo,
        parentAddress: body.parentAddress,
        parentPermanentAddress: body.parentPermanentAddress,
        }
      }).then(result=>{
        res.status(200).json({student_update:result})
      })
      .catch(error=>{
        console.log(error)
        res.status(500).json({err:error})
      })
    
    
  });

  //Dellite function...

  routers.route("/student/dellite/:id").delete((req,res)=>{
      student_master_model.findByIdAndDelete({_id:req.params.id})
      .then(result=>{
        res.status(200).json({dellite_deta:result});
      }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
      })
    
    })
  
module.exports = routers;