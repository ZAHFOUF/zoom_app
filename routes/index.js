const express=require('express')
const R=express.Router()
const crypto=require('crypto')
const mysql=require("./mysql")


// GET REQ

R.get("/",(req,res)=>{
    if (req.query.action == "pass") {
        res.render("index",{create:"pass",id:req.query.id})
    }else{
        res.render("index",{create:"off"})
    }

})

//POST REQ

R.post("/",(req,res)=>{
        var id=crypto.randomUUID()
        var room_name=req.body.roomname
        var number=req.body.number
        var password='null'
        if (req.body.haveapassword == "on") {
            var password=req.body.password
        }
        var sql=`INSERT INTO room VALUES ('${id}', '${room_name}', '${number}' ,'${password}'); `
        addtodb(sql)
    
        res.render("index",{create:"on",id:id})
})


module.exports = R




/*---------------------- functions ------------------------------------------*/


function addtodb (sql) {
    mysql.query(sql, function (err, result) {
        if (err) throw err;
        return result
    })

}


