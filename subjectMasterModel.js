const mongoose=require("mongoose");
const schema=mongoose.Schema;
const db=require("../utils/mongoose");
const moment=require("moment");

const subjectSchema=new schema({
 subjectName:{
    type:String,
    default:"",
 },
 subjectKey:{
    type:String,
    default:""
 },
  selectClass:{
    type:String,
    required:true
  },
  subjectJustForGrade:{
    type:Boolean,
    required:false
  },
  subjectSequence:{
    type:Number,
    default:1
  },
  updateAt:{
    type:Number,
    default:()=>moment().valueOf()
  },
  createdAt:{
    type:Number,
    default:()=>moment().valueOf()
  },

});

module.exports=db.db1.model('subjectMaster',subjectSchema);