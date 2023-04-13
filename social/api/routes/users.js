import express from "express";

const router = express.Router()

// example
router.get("/test", (req,res)=>{
    res.send("it works!")
})



export default router