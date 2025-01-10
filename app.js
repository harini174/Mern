var express=require("express");
const mongoose=require("mongoose");
const {v4: uuidv4 } = require("uuid");//import uuid
const app=express();
//Middleware
app.use(express.json())

// const students=[{
//     id:1,
//     name:"Jaxson",
//     age:19
// },{
//     id:2,
//     name:"Grace",
//     age:19
// }]
//connecting db
mongoose.connect("mongodb://localhost:27017/expense")
    .then(()=>{console.log("Connected")});
//returns a promise(resolve or reject)

//creating schema
const expenseSchema=new mongoose.Schema({
    id:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    amount:{type:Number,required:true}
});

//model creation
const Expenses=mongoose.model("Expenses",expenseSchema)
app.get("/api/expenses",async(req,res)=>{
    try{
    const expenses = Expenses.find();
    res.status(200).json(expenses);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    }catch(error){
        res.status(500).json({message:"ERROR"});
    }
});
app.get("/api/expenses/:id",async(req,res)=>{
    try{
    const {id} = req.params;
    const expenses=await Expenses.findOne({id});
    if(!expenses){
        res.status(404).json({message:"ERROR"});
    }
    res.status(200).json(expenses);
}
catch(err){
    res.status(500).json({message:"error"});
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
   
});

app.post("/api/expenses",async(req,res)=>{ 
    
    const{title,amount}=req.body;
    try{
      const newExpense = new Expenses ({
         id: uuidv4(),
         title,//title:title are same
         amount

    });
    const savedExpense = await newExpense.save()
    res.status(200).json(savedExpense)
    }
    catch (err){
    res.status(500).json({message:"ERROR IN CREATING EXPENSE"});

}
});
app.put("/api/expenses/:id",async(req,res)=>{
    const {id}=req.params;
    const {title,amount}=req.body;
    try{
        const updateexpense=await Expenses.findOneAndUpdate({id},{title,amount});//new true creates a new data if the the id doesnt exist
    if(!updateexpense){
        return res.status(404).json({message:"Expense not found"})
    }
    res.status(200).json(updateexpense)
}
    catch(err){
        res.status(500).json({message:err.message})
    }

});
app.delete("/api/expenses/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const deleteExpense=await Expenses.deleteOne({id});
        if(!deleteExpense){
            return res.status(404).json({message:"Expense not found"})
        }
    res.status(200).json({message:"Expense deleted"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})





/*
app.get("/api/sayhello",(req,res)=>{
    res.send("Hello, World!");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    res.end();
    }) 

app.get("/api/students",(req,res)=>{
    res.status(200).json(students)
})

app.get("/api/students/:id",(req,res)=>{
    const {id}=req.params;
    const student=students.find((student)=>student.id==id);
    if(!student){
        res.status(404).json({message:"student not found"});
    }
    else{
        res.status(200).json(student);
        console.log(student);
    }
})

*/
app.listen(3000,()=>{
    console.log("Server is running on Port 3000")
})
