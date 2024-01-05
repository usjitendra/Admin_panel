const express = require("express");
const cluster = require("cluster")
const os = require("os");
const proxy=require("express-http-proxy");
const path = require('path');
const bodyParser = require("body-parser");
let fileUpload = require("express-fileupload");
const mongoose=require("mongoose");
const nunjucks  = require('nunjucks');
const cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
const cors = require('cors');
var flash = require('connect-flash');


const config=require("../bin/config");
// console.log(config);

if (cluster.ismaster) {
    const numcores = os.cpus().length;

    for (let i = 0; i <= numcores; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`worker${worker.process.pid}has exited`)
        cluster.fork();
    })
}
else {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(cookieSession({
        name: 'session',
        keys: ["schoolmanagement"],
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }));
    app.use(flash());
    
    app.use(express.json());
    app.use(fileUpload({ dlimits: { fileSize: 50 * 1024 * 1024 } }));


    //view engine setup
    app.use(express.static(path.join(__dirname, '../public')));
    nunjucks.configure('./web_portal/views', {
    autoescape: false,
    express   : app,
    watch: true
    });
    app.set('view engine', 'html');


    app.use('/studentmastersevice',proxy('localhost:'+config.serverList.StudentMasterServer.port));
    app.use('/aminservice',proxy('localhost:'+config.serverList.AdminLoginServer));

    
    var webController = require('../web_portal/controller/index')();
    require('../web_portal/routes/index')(app, webController);


    const port = config.serverList.RootServer.port;
    app.listen(port, () => {
        console.log(`Main sever port start on ${port}`);
    })

}

