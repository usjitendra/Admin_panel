const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const config=require("../../../bin/config");
const SubjectMasterModel=require("../SubjectMasterModelService/controler/SubjectMasterControler")


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(fileUpload({dlimits:{fileSize:50*1024*1024}}))



app.use("/",SubjectMasterModel);





const port=config.serverList.SubjectMaster.port;

app.listen(port,()=>{
    console.log(`Subject Master model Start on port ${port}`);
})