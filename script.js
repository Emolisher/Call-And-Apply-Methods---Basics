'use strict';
//Call And Apply methods

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    //book: function () {}
    book(flightNumm, namee) {
        console.log(
        `${namee} booked a seat on ${this.airline} flight ${this.iataCode}${flightNumm}`
        );
        this.bookings.push({flight: `${this.iataCode}${flightNumm}`, namee })
        },
    };
    lufthansa.book(239, 'Emil Yordanoff');
    lufthansa.book(635, 'Yordan Yordanoff');
    console.log(lufthansa);


const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

const book = lufthansa.book;

// Won't work:
// book(23, 'Sarah Williams');
// now it's a regular fn call - & in such THIS is undefined (in strict mode) --- it's not a method anymore

//CALL METHOD
// we need to set the THIS manually (tell it what the THIS keyword is)
//3 fn methods --- call, apply & bind

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

//in a call method - this keywords is set as the 1st argument of call method

book.call(lufthansa, 444, 'Michael Jordan');
console.log(lufthansa);

//APPLY METHOD - does the same, just doesn't rcv a list of arguments after the THIS (444, Michael Jordan) , but takes an array & passes it to the fn

const flightData = [583, 'George Cooper'];
book.apply(eurowings, flightData);
console.log(eurowings);

//Apply - not used that much, we have a better method
//namely call + spread operator (the args fm the array)

book.call(eurowings, ...flightData);


//BIND METHOD - most important of the 3

const bookEW = book.bind(eurowings);
const bookLH = book.apply(lufthansa);
//this will always be set to eurowings
bookEW(23, 'Steve Nash');

//partial application :
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Bam Adebayo');
bookEW23('Jimmy Butler');

//with EvenListeners :
lufthansa.planes = 300;
lufthansa.buyPlane = function() {
    console.log(this);

    this.planes++
    console.log(this.planes);
};
//down here :  this will be lufthansa
// lufthansa.buyPlane();

document.querySelector('.buy').addEventListener
('click', lufthansa.buyPlane.bind(lufthansa));
//this keyword points to the button element
//it is the evenListener in that example (yet another example that this is set dynamically)
//why we need bind

// Partial Application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
//addVAT = value => value + value * 0.23;

console.log(addVAT(100));
//this could be done with default parameters but
//like this we make a new fn

//we can write it as a fn returning a new fn:
const addTaxRate = function (rate) {
    return function(value) {
        return value + value * rate;
    }
}
const addVAT2 = addTaxRate(0.23);
console.log(addVAT(100));

