const db = require("../config/connection");
const collection = require("../config/collections");
const objectId = require("mongodb").ObjectID;
const jwt = require("jsonwebtoken");
const tokenSecret = require("../tokenSecret");
const token = jwt.sign({id:"phinahas"},tokenSecret.tokenSecret);

module.exports = {

  getToken:()=>{
    return new Promise(async (resolve, reject) => {
      resolve({token:token})
    })
  },

  createMovie: (movie) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.MOVIES)
        .insertMany(movie)
        .then(() => {
          resolve();
        });
    });
  },

  getMovies2010: () => {
    return new Promise(async (resolve, reject) => {
      let movies = await db
        .get()
        .collection(collection.MOVIES)
        .find({ yearOfRelease: { $gte: 2010 } })
        .toArray();

      await movies.sort((a, b) => {
        let ma = a.movieName.toLowerCase();
        let mb = b.movieName.toLowerCase();

        if (ma < mb) {
          return -1;
        }
        if (ma > mb) {
          return 1;
        }
        return 0;
      });

      resolve(movies);
    });
  },

  getMoviesRating : ()=>{
    return new Promise(async (resolve, reject) =>{

      let movies = await db.get().collection(collection.MOVIES).find({rating:{$gte:8.0}}).toArray();
      //console.log(movies);
      resolve(movies);

    })
  },

  getMovieWithActors : (actors)=>{
    return new Promise(async (resolve, reject)=>{

      let movies = await db.get().collection(collection.MOVIES).find({cast:{$all:[actors.actor1,actors.actor2]}}).toArray();
      //console.log(movies);
      if(movies.length===0){
        reject("No moives found in our database")
      }else{
        resolve(movies);
      }

    })
  }
};
