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