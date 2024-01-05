var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var db=require("../utils/mongoose");
var moment=require("moment"); 
const _=require('lodash');
const bcrypt=require("bcrypt");

const adminLoginSchema=new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    password:{
        type:String
    },
    mobileNumber:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:"Email id is already in use",
        required:true
    },
    address:{
        type:String
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    pinCode:{
        type:String
    },
    picture:{
        type:String,
        default:'default.png'
    },
    updatedAt:{
        type:Number,
        default:()=>moment().valueOf()
    },
    createdAt:{
        type:Number,
        default:()=>moment().valueOf()
    },
    status:{
        type:String,
        enum:['active','inactive']  
    },
    role:{
        type:String,
        enum:['admin','guestUser'],
        default:'admin'
    },
    allowLogin:{
        type:String,
        default:true
    },
    timezone:{
        type:String,
        default:function(){
            return this.country=="India"?'asia/kolkata':"Asia/Bangkok";
        }
    },
    country:{type:String,default:'India'}

});


adminLoginSchema.pre('save', async function (next) {
    this.email = this.email.toLowerCase();
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const saltRounds = 10; // Adjust the number of salt rounds as needed
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});




module.exports=db.db1.model('adminMaster',adminLoginSchema);
