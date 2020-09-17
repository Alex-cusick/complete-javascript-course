 // function constructor
/*
var Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.job = job;
    this.yearOfBirth = yearOfBirth;
};

Person.prototype.calculateAge = function () {
    console.log(2020 - this.yearOfBirth);
};

var john = new Person("John", 1990, "teacher");
var jane = new Person("Jane", 1979, "designer");
var mark = new Person("Mark", 1948, "retired");

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.hasOwnProperty('job'));
console.log(john instanceof Person);
*/
////////////////////
/*
var years = [1990, 2001, 1987, 1964, 2009];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i <arr.length; i++ ) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2020 - el;
}

function isAdult(el) {
    return el >= 18;
}

var ages = arrayCalc(years, calculateAge);
console.log(ages);

var adult = arrayCalc(years, isAdult);
console.log(adult);

///////////////

function maxHeartRate(el) {
    if (el >= 18 && el < + 81) {
        return Math.round(206.9 - (0.67 * el));
    } else {
        return -1
    }
}

var rates = arrayCalc(ages, maxHeartRate);
console.log(rates);


function game() {
    var score = Math.random() * 10;
    console.log(score > + 5);
}
game();

(function () {
    var score = Math.random() * 10;
    console.log(score > + 5);
})();
*/
/*

function retirement(retirementAge) {
    var a = " years left until retirement."
    return function (yearOfBirth) {
        var age = 2020 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);

retirementUS(1990);
retirement(66)(1990);

*/

var john = {
    name: 'John',
    age: 28,
    job: 'teacher',
    presentation: function (style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', ladies and gentlemen! I\'m '+ this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'freindly') {
            console.log('Hey! What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

var emily = {
    name: 'Emily',
    age: 31,
    job: 'designer'
};

john.presentation('formal', 'morning');

john.presentation.call(emily, 'freindly', 'afternoon');

var emFreindly = john.presentation.bind(emily, 'freindly');

emFreindly('night');
