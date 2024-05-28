import {Router} from 'express'

const router = Router();


router.get('/info', (req, res) =>{
    res.render('quienesSomos/info')
});


export default router