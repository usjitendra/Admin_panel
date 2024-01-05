const express = require("express");
const routers = express.Router();
const bcrypt = require('bcrypt');
const app = express();
const Admin_Login_Model = require("../../../../model/adminLoginModel");
const {emailvalidation}=require("../Validation/validation")
const { body, validationResult } = require('express-validator');
const auth_seceret_key=require("../../../../utils/constent");
// const auth=require("../../../../helper/authValidation");

routers.use((req, res, next) => {
    const new_auth = req.headers.auth;
    if (auth_seceret_key.auth_secreat_key==new_auth){
        next();
    }
    else {
        res.send({ status: 401, massage: "auth key does not match" });
    }

})

Admin_Login_Model.findOne({}).then(async (resul) => {
    if (!resul) {
        let adminData = {
            firstName: "jitendra",
            lastName: "Management",
            password: "1234567",
            mobileNumber: "6387056457",
            email: "ukjitendra@gmail.com",
            address: "Saraykalidar",
            state: "UTTER PARDESH",
            city: "JAUNPUR",
            pincode: "222161",
        }
         Admin_Login_Model.create(adminData).then((err, result) => {
            console.log("create Admin");
        });
        //console.log(ab);
    }
})

routers.route("/admin/login").post(emailvalidation,async (req, res) => {

     const errors=validationResult(req);
     console.log(errors);
      if(!errors.isEmpty()){
        return res.status(400).send({status:400,massage: errors});
      }
    try {
        // console.log("thise is admin login....")
        const { email, password } = req.body;
        const admin = await Admin_Login_Model.findOne({ email: email });
        // console.log(admin);
        if(!admin){
            return res.status(401).json({status:404,massage:"invalid user Id"})
        }
            const match=await bcrypt.compare(password,admin.password)
       if(match){
          return res.status(200).json({status:200,massage:"user logine succesfull",data:admin,token:auth.generate_token(admin._id)});
       }
        return res.status(404).json({status:404,massage:"Password does not match"});   

    } catch (error) {
   console.error(error)
   }
   
})


module.exports = routers;
