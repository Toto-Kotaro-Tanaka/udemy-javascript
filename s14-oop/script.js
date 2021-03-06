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

// Static Method
Person.hey = function() {
    console.log("Hey there 🙂");
    console.log(this); // Entire object
};

Person.hey();

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

// ### Challenge 1 ###

const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;

    console.log(`"${this.make}" is going at ${speed} km`);
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

Car.prototype.accelerate = function() {
    this.speed += 10;
    console.log(`"${this.make}" is going at ${this.speed} km`);
};

Car.prototype.brake = function() {
    this.speed -= 5;
    console.log(`"${this.make}" is going at ${this.speed} km`);
};

Car.prototype.accelerateCar = function() {
    this.speed += 20;
    this.charge -= 1;
    console.log(
        `${this.make} is going at ${this.speed} and battery is ${this.charge}`,
    );
};

bmw.accelerate();
bmw.brake();
mercedes.accelerate();
mercedes.brake();

// ES6 Classes JS

// Class expression
const PersonCl1 = class {};

// Class declaration
class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Method will be added to .prototype property
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    greet1() {
        console.log(`Hey, ${this.firstName}, how are you?`);
    }

    get age() {
            return 2037 - this.birthYear;
        }
        // Set a property that already exists
    set fullName(name) {
        if (name.includes(" ")) {
            this._fullName = name;
        } else {
            alert(`${name} is not a full name`);
        }
    }

    get fullName() {
        return this._fullName;
    }

    static hey() {
        console.log("Hey there 🙂");
    }
}
// This is same as greet1 function above
PersonCl.prototype.greet2 = function() {
    console.log(`Hey, ${this.firstName}, how are you?`);
};

const jessica = new PersonCl("Jessica Davis", 1994);
jessica.calcAge();
console.log(jessica.age);
console.log(jessica.__proto__ === PersonCl.prototype); // true

jessica.greet1();
jessica.greet2();

const walter = new PersonCl("Walter White", 1965);

PersonCl.hey();

/* 
1. Classes are NOT hoisted
2. Classes are first-class citizens
3. Classes are executed in strict mode
*/

// Constructor vs Class? - personal preference but if you use Class, it's important to understand concept of constructor

// Getters and Setters are called assessor properties and others normal properties

const account = {
    owner: "Jonas",
    movements: [200, 350, 3520, 400],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        return this.movements.push(mov);
    },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

// Object.create - least used
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steven = Object.create(PersonProto);
steven.name = "Steven";
steven.birthYear = 1988;
console.log(steven);
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1991);
sarah.calcAge();

// ### Challenge 2 ###
class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        this.charge -= 1;
        console.log(
            `"${this.make}" is going at ${this.speed} km and ${this.charge}`,
        );
        return this;
    }

    brake() {
        this.speed -= 10;
        console.log(`"${this.make}" is going at ${this.speed} km`);
        return this;
    }

    get speedUS() {
        return this.speed / 1.6;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
}

const bmwx1 = new CarCl("BMW X1", 120);
bmwx1.accelerate();
bmwx1.accelerate();
bmwx1.accelerate();

bmwx1.brake();
bmwx1.brake();

const mazda = new CarCl("Mazda", 220);
mazda.accelerate();

console.log(mazda.speedUS);
mazda.speedUS = 220;
console.log(mazda.speedUS);

// Inheritance Between "Classes" : Constructor Functions
const PersonInhe = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

PersonInhe.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
};

const Student = function(firstName, birthYear, course) {
    PersonInhe.call(this, firstName, birthYear); // Use call method
    // this.firstName = firstName; // Use above instead of this.
    // this.birthYear = birthYear; // Use above instead of this.
    this.course = course;
};

// Linking prototype
Student.prototype = Object.create(PersonInhe.prototype);
// Student.prototype = PersonInhe.prototype // This is not what we want. Student.prototype should inherit Person.prototype and not to be equal

Student.prototype.introduce = function() {
    console.log(`Hi, my name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof PersonInhe);
console.log(mike instanceof Object);

Student.prototype.constructor = Student; // To fix mike is bing Student object
console.dir(Student.prototype.constructor);

// ### Challenge 3 ###
const EV = function(make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
    console.log(make, speed, charge);
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function(chargeTo) {
    this.charge = chargeTo;
    return this;
};

EV.prototype.accelerateEV = function() {
    this.speed += 20;
    this.charge -= 1;
    console.log(
        `${this.make} is going at ${this.speed} and battery is ${this.charge}`,
    );
};

EV.prototype.constructor = EV;

const tesla = new EV("Tesla", 120, 23);
// tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerateEV();
tesla.accelerateEV();
tesla.accelerateEV();
tesla.accelerateEV();

// ES6 Classes inheritance
class PersonInheri {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Method will be added to .prototype property
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    greet1() {
        console.log(`Hey, ${this.firstName}, how are you?`);
    }

    get age() {
        return 2037 - this.birthYear;
    }

    set fullName(name) {
        if (name.includes(" ")) {
            this._fullName = name;
        } else {
            alert(`${name} is not a full name`);
        }
    }

    get fullName() {
        return this._fullName;
    }

    static hey() {
        console.log("Hey there 🙂");
    }
}

class StudentInhe extends PersonInheri {
    constructor(fullName, birthYear, course) {
        super(fullName, birthYear); // Constructor of parent function and always need to happen first!
        this.course = course;
    }

    introduce() {
        console.log(
            `My name is ${this.fullName} and I'm taking ${this.course}`,
        );
    }

    calcAge() {
        console.log(
            `I'm ${2037 - this.birthYear} and I feel like more ${
                2037 - this.birthYear + 10
            }`,
        );
    }
}

const marta = new StudentInhe("Marta Jones", 2021, "Computer Science");
marta.introduce();
marta.calcAge();

// Object.create inheritance
const PersonProtoInhe = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const stevo = Object.create(PersonProtoInhe);

const StudentProto = Object.create(PersonProtoInhe);

StudentProto.init = function(firstName, birthYear, course) {
    PersonProtoInhe.init.call(this, firstName, birthYear, course);
    this.course = course;
};

StudentProto.introduce = function() {
    console.log(
        `Hi, my name is ${this.firstName}, I'm ${
            2037 - this.birthYear
        } age and taking ${this.course}`,
    );
};

const jayi = Object.create(StudentProto);
jayi.init("Jay", 1996, "Computer Engineering");
jayi.introduce();

// Another Class Example

class Account {
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this._pin = pin;
        this._movements = []; // Not taking argument but possible to set variable
        this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${this.owner}`);
    }

    // Public Interface
    getMovements() {
        return this._movements;
    }

    deposit(val) {
        this._movements.push(val);
    }

    withdraw(val) {
        this.deposit(-val);
    }

    _approveLoan(val) {
        return true;
    }

    requestLoan(val) {
        if (this._approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved`);
        }
    }
}

const account1 = new Account("Jonas", "€", 1234);
console.log(account1);

// account1._movements.push(200); // This is not a good practice. Create a method
// account1._movements.push(-140); // This is not a good practice. Create a method
console.log(account1);

account1.deposit(250);
account1.withdraw(140);
account1._approveLoan(1000); // This shouldn't be accessed by anyone. Should only be a part of requestLoan method.
account1.requestLoan(1000);
console.log(account1);

// Encapsulation: Protected Properties and Methods
// Use _ (underscore) for the property should be protected
console.log(account1.getMovements());

// Private Classes

// 1) Public Fields
// 2) Private Fields
// 3) Public Methods
// 4) Private Methods
// (There is also the static version)

class AccountP {
    // 1) Public Fields (instances)
    locale = navigator.language;

    // 2) Private Fields
    _movements = []; // Use # instead of _, issue of saving # so _ is still used

    _pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this._pin = pin;
        this._movements = [];
        this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${this.owner}`);
    }

    getMovements() {
        return this._movements;
    }

    deposit(val) {
        this._movements.push(val);
        return this;
    }

    withdraw(val) {
        this.deposit(-val);
        return this;
    }

    requestLoan(val) {
        if (this._approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved`);
        }
        return this;
    }

    // Private methods - Use #
    _approveLoan(val) {
        return true;
    }
}

const account2 = new AccountP("Jonas", "EUR", 1234);
account2.deposit(140);
account2.withdraw(24);
account2.requestLoan(1000);
console.log(account2.getMovements());
console.log(account2);

// Chaining
account2
    .deposit(300)
    .deposit(500)
    .withdraw(35)
    .requestLoan(25000)
    .withdraw(4000);

console.log(account2.getMovements());

// ### Challenge 4 ###
class EVCL extends CarCl {
    constructor(make, speed, charge) {
        super(make, speed);
        this.charge = charge;
    }

    chargeBattery(chargeTo) {
        this.charge = chargeTo;
        return this;
    }
}

const rivian = new EVCL("Rivian", 120, 23);

rivian.accelerate().accelerate().brake().brake().accelerate();