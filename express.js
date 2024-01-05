const express=require("express");
const app=express();
const bodyParser = require("body-parser");
let fileUpload = require("express-fileupload");
const config=require("../../../bin/config");
const AdminLoginServer=require("../AdminLoginService/Controller/adminLoginController");




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload({ dlimits: { fileSize: 50 * 1024 * 1024 } }));




app.use('/',AdminLoginServer);


const port=config.serverList.AdminLoginServer.port;


app.listen(port,()=>{
   console.log(`Admin login Servise start on ${port}`);
})