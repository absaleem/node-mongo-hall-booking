const express = require("express");
const Hallbookingrouter = require("./router/Hallbookingrouter");
const mongo_connection = require("./connect");
const dotenv=require("dotenv");

dotenv.config();
mongo_connection.connect();

const app=express();
app.use(express.json());

app.use('/',(req,res,next)=>{
    var auth={ authorised:true };

    if(auth.authorised){
     next(); 
    }else{
     res.send([
        {
            'msg':'not authorised'
        }
     ]);
   }
}); 

app.use('/hallbooking',Hallbookingrouter); 

app.listen(process.env.PORT);
