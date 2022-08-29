const express=require('express')
const R=express.Router()
const mysql=require("./mysql")

R.get("/",(req,res)=>{
    var sql=`SELECT password,name,number FROM room WHERE id='${req.query.id}'`
    mysql.query(sql,(err,result)=>{
        console.log(req.query.id);
        if (result[0].password !="null") {
            console.log("Yes");
            res.redirect(`/?action=pass&id=${req.query.id}`)
        }else if(result[0].password == "null"){
            res.render("room",{name:result[0].name,number:result[0].number,id:req.query.id})
            

        }
    })

    

})

R.post("/",(req,res)=>{
    console.log(req.body);
    if(req.body.action == "scan"){
        var sql=`SELECT name FROM room WHERE id='${req.body.id}' AND password='${req.body.password}'`
         mysql.query(sql,(err,result)=>{
            if (result[0]) {
                var sql=`SELECT password,name,number FROM room WHERE id='${req.body.id}'`
                mysql.query(sql,(err,result)=>{
                res.render("room",{name:result[0].name,number:result[0].number,id:req.query.id})
                    
                })














            }else if (!result[0]){
                res.redirect(`/?action=pass&id=${req.body.id}`)
             }
         })
    
     }
    
})





module.exports = R