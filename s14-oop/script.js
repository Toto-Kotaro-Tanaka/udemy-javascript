"use strict";

const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Bad practice and never do this - creating method in constructor
    // this.calcAge = function() {
    //     console.log(2037 - this.birthYear);
    // };
};

const jonas = new Person("Jonas", 1991); // new keyword (operator) for constructor

/* 
4 steps
1. New empty object is created
2. function is called, this = {}
3. { } linked to prototype
4. function automatically return {}
*/

const mathilde = new Person("Mathilde", 1989);
const jack = new Person("Jack", 1994);

console.log(jonas, mathilde, jack);

const jay = "Jay";

console.log(jonas instanceof Person); // true
console.log(jay instanceof Person); // false

console.log(Person.prototype);

// Prototypes
Person.prototype.calcAge = function() {
    console.log(`This is ${this.firstName}'s age: ${2037 - this.birthYear}`);
};

jonas.calcAge();
mathilde.calcAge();
jack.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); // true
console.log(mathilde.__proto__ === Person.prototype); // true
console.log(`this is false: ${Person.prototype === Person}`); // false

// prototype is not === Person. It should have been called ".prototypeOfLinkedObjects" or something like this.

console.log(Person.prototype.isPrototypeOf(jonas)); // true

Person.prototype.species = "Home Sapiens";
console.log(jonas, mathilde);
console.log(jonas.species, mathilde.species);

console.log(jonas.hasOwnProperty("firstName")); // true
console.log(jonas.hasOwnProperty("species")); // false because it is not direct object

console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__); // Object.prototype (Top of prototype chain)
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 8, 6, 4, 8]; // new Array === []
console.log(arr.__proto__); // Each array inherits array methods
console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__);
console.log(arr.__proto__.__proto__.__proto__);

Array.prototype.unique = function() {
    return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector("h1");

// ### Challenge ###

const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;

    console.log(`"${this.make}" is going at ${speed} km`);
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

Car.prototype.accelerate = function() {
    console.log(`"${this.make}" is going at ${this.speed + 10} km`);
};

Car.prototype.brake = function() {
    console.log(`"${this.make}" is going at ${this.speed - 10} km`);
};

bmw.accelerate();
bmw.brake();
mercedes.accelerate();
mercedes.brake();