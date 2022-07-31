const db = require("../config/connection");
const collection = require("../config/collections");
const objectId = require("mongodb").ObjectID;

module.exports = {
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
  }
};
