import express from "express";
import mysql from "mysql";
import cors from 'cors';

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"*******",
    database:"test"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
   res.json("Hello, this is the backend") 

app.get("/photos", (req,res)=>{
    const q = "SELECT * FROM photos"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/photos", (req,res)=>{
    const q = "INSERT INTO photos (`title`,`desc`,`year`,`cover`) VALUES (?)"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.year,
        req.body.cover
    ]

    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/photos/:id", (req,res)=>{
    const photoId =req.params.id;

    const q = "DELETE FROM photos WHERE id = ?"
    
    db.query(q,[photoId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("photo has been deleted successfully.")
    })
})

app.put("/photos/:id", (req,res)=>{
    const photoId =req.params.id;

    const q = "UPDATE photos SET `title` = ?,`desc` = ?,`year` = ?,`cover` = ? WHERE id =?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.year,
        req.body.cover
    ];
    
    db.query(q,[...values, photoId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("photos has been updated successfully")
    })
})

})
app.listen(8800, ()=>{
    console.log("Connect to backend!")
})
