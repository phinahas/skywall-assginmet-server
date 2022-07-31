const express = require('express')
const router = express.Router();
const movieHelpers = require('../helpers/movieHelpers')

router.post('/add-movies',(req,res)=>{
    console.log(req.body);
    movieHelpers.createMovie(req.body).then((response)=>{
        res.json({success:"Added"})
    })

})


module.exports = router;