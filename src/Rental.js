class Rental {
  constructor({ movie, days }) {
    this.movie = movie;
    this.days = days;
  }

  calculateCost(code, days) {
    let thisAmount = 0;

    // determine amount for each movie
    switch (code) {
      case "regular":
        thisAmount = 2;
        if (days > 2) {
          thisAmount += (days - 2) * 1.5;
        }
        break;
      case "new":
        thisAmount = days * 3;
        break;
      case "children":
        thisAmount = 1.5;
        if (days > 3) {
          thisAmount += (days - 3) * 1.5;
        }
        break;
      default:
        throw new Error("Invalid move type:" + code);
    }
    return thisAmount;
  }
}

module.exports = Rental;
