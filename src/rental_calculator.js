const Customer = require("./Customer");
const Movie = require("./Movie");
const Rental = require("./Rental");

module.exports = function statement(customer, movies) {
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;
  for (let r of customer.rentals) {
    let movieTitle = movies[r.movieID].title;
    let code = movies[r.movieID].code;

    let movie = new Movie({ id: r.movieID, title: movieTitle, code: code });

    let rental = new Rental(movie, r.days);
    let cost = rental.calculateCost(movie.code, r.days);

    for (let rental of customer.rentals) {
      //add frequent renter points
      frequentRenterPoints++;
      // add bonus for a two day new release rental
      if (movie.code === "new" && rental.days > 2) frequentRenterPoints++;
    }

    //print figures for this rental
    result += `\t${movie.title}\t${cost}\n`;
    totalAmount += cost;
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;
};
