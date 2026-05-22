import express from 'express';
import {ENV} from './lib/env.js'

const app=express();    

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"success from api"
    })
})


// make our app ready for deployment


app.listen(ENV.PORT,()=>{
    console.log("backend is running on port 3000");
})