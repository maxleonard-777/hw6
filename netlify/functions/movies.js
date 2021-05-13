// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre
  
  // create a new object to hold the movie data
  let moviesToReturn = {}

  // start with an empty Array for the movies
  moviesToReturn.movies = []

  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Invalid search!` // a string of data
    }
  }
  else {
    let returnValue = {
      numResults: 0,
      movies: []
    }

    for (let i=0; i < moviesFromCsv.length; i++) {
    // store each movie in memory
    let movie = moviesFromCsv[i]
    // check if the year equals user entered year and genere is included in the genre description, if so:
    if (movie.genres.includes(genre) && listing.startYear == year) {
      // add the listing to the Array of listings to return
      moviesToReturn.movies.push(movie)
    }

  // add the number of movies to the returned movies Object
  moviesToReturn.count = moviesToReturn.movies.length

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(moviesToReturn) // a string of data
    }
  }
}