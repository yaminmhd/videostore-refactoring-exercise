const Customer = require("./Customer");
const Movie = require("./Movie");
const Rental = require("./Rental");

function getTotalCost(rentals) {
  let totalAmount = 0;
  for (let rental of rentals) {
    let cost = rental.calculateCost();
    totalAmount += cost;
  }
  return totalAmount;
}

module.exports = function statement(customerRecord, movies) {
  const customer = new Customer({ name: customerRecord.name });

  let rentals = customerRecord.rentals.map(
    rental =>
      new Rental({
        movie: new Movie({
          id: rental.movieID,
          title: movies[rental.movieID].title,
          code: movies[rental.movieID].code
        }),
        days: rental.days
      })
  );

  function calculateFrequentRenterPoints(rentals) {
    let frequentRenterPoints = 0;
    for (let rental of rentals) {
      frequentRenterPoints++;
      if (rental.checkEligiblityForBonusPoints()) frequentRenterPoints++;
    }
    return frequentRenterPoints;
  }

  let result = `Rental Record for ${customer.name}\n`;
  for (let rental of rentals) {
    let movie = rental.movie;
    let cost = rental.calculateCost();
    result += `\t${movie.title}\t${cost}\n`;
    // let movieTitle = movies[r.movieID].title;
    // let code = movies[r.movieID].code;
    // let movie = new Movie({ id: r.movieID, title: movieTitle, code: code });
    //let rental = new Rental(movie, r.days);
  }

  //print figures for this rental
  //let totalAmount = getTotalCost(rentals);

  result += `Amount owed is ${getTotalCost(rentals)}\n`;
  result += `You earned ${calculateFrequentRenterPoints(
    rentals
  )} frequent renter points\n`;
  return result;
};
