//const fs = require('fs')

//var server=http.createServer((req,res)=>{

//fs.readFile('./sample.json','utf8',(err,data)=>{
    //if(err){
        //console.log("CANNOT OPEN FILE......")
      //  return
    //}
  //  const users = JSON.parse(data);
//});
//const fs = require("fs"); 
//}/);
fs.readFile('./sample.json','utf8',(err,data)=>{
    if(err){
        console.log("CANNOT OPEN FILE......")
        return;
    }
 const jsonData = JSON.parse(data);
 const filteredData = jsonData.filter((user)=>user.amount > 1500)
 fs.writeFile("./Data.json",JSON.stringify(filteredData),(err)=>{
    if(err){
        console.log("ERROR WRITING FILE");
        return;
    }
}); 
});

