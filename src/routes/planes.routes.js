import { Router } from "express";
import pool from "../database.js";
import multer from "multer";
import path from "path";

const router = Router();

//router.get('/inscripciones', (req, res) =>{
//    res.render('planes/inscripciones')
//});

router.get('/inscripciones', async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM planes");
        res.render("planes/inscripciones", {planes: result});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});




export default router;