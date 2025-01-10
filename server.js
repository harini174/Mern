//const http = require("http");//module-http(server method to create server)
//const modules=require("./Modules")
//const server = http.createServer((req,res)=>{//first req and res second
//res.writeHead(200,{"Content_Type":"text/plain"});//Header
 //res.write(`ADDITION:${modules.add(10,10)}`);
 //res.write(`SUB:${modules.sub(10,10)}`);
 //res.write(`MULTIPLY:${modules.multi(10,10)}`);//respond end   -  res.end("\n");
// res.write(`DIVISION:${modules.div(10,10)}`);
// res.end();
//});
//server.listen(3000,()=>{
//   console.log("server is running on port http://localhost:3000")
//})
//console.log(modules.add(10,20));

//console.log(modules.subtract(10,20));
//console.log(modules.multiply(10,20));
//console.log(modules.divide(10,20));
//modulus - abstraction and encapulsation
//core-in built modulus-https,local-cretae by ourself-eg-,Third party modulus- should be installed to be use eg-express





const http=require('http');//http is a built-in module in Node.js
const fs = require('fs');
const server=http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/json'});
    //write the data from file.js in the response
    fs.readFile('./sample.json','utf8',(err,data)=>{
        if(err){
            console.log("Cannot open the file");
            return;
        }
        res.write(data);
        res.end();
});
});
server.listen(3000,()=>{
    console.log("Server is running on port 3000");
});