const express = require('express')
const router = express.Router();
const movieHelpers = require('../helpers/movieHelpers')

router.post('/add-movies',(req,res)=>{
    //console.log(req.body);
    // let movieSchema = {
    //     movieName:"",
    //     movieDirector:"",
    //     yearOfRelease:null,
    //     rating:null,
    //     cast:[]
    // }
    movieHelpers.createMovie(req.body).then((response)=>{
        res.json({success:"Added"})
    })

})

router.get('/movies-2010',(req,res)=>{
    movieHelpers.getMovies2010().then((response)=>{
        res.status(200).json({success:"true",data:response})

    })
   
})

router.get('/movies-rating-8.0',(req,res)=>{
    
    movieHelpers.getMoviesRating().then((response)=>{
        res.status(200).json({success:"true",data:response})
    })

})

router.post('/movies-cast-search',(req,res)=>{

    movieHelpers.getMovieWithActors(req.body).then((response)=>{
        res.status(200).json({success:"true",data:response})
    }).catch((error)=>{
        
        res.status(404).json({error:error})
    })
})


module.exports = router;