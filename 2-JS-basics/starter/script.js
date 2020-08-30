/*var firstName = 'John';
var lastName = 'Wick';
var age = "282.1", isMarried = false, job = "teacher";

console.log(firstName + " " + lastName + " is a " + age + " year old " + job + ". Is he married? " + isMarried);

console.log(typeof age, typeof isMarried)

var adult = age >= 18

console.log(adult)

switch (true) {
    case age < 13:
        console.log(firstName + " is a boy.");
        break;
    case age >= 13 && age < 20:
        console.log(firstName + " is a teenager.");
        break;
    case age >= 19 && age < 30:
        console.log(firstName + " is a young man.");
        break;
    case age >= 30:
        console.log(firstName + " is a man.");
        break;
    default:
        console.log("This age is invalid!")
}
* /

/*

var markMass = 78;
var markHeight = 1.62;

var johnMass = 92;
var johnHeight = 1.95;

function BMI(mass, height) {
    return mass / (height*height) 
}

markBMI = BMI(markHeight, markMass);
johnBMI = BMI(johnHeight, johnMass);

var markHigher = markBMI > johnBMI;

if (markHigher) {
    console.log("Mark has a higher BMI then John.")
} else {
    console.log("John has a higher BMI then Mark.")
}


var firstName = "John";
var status = "single";
var isMarried = false

if (isMarried) {
    console.log(firstName, "is married.")
} else {
    console.log(firstName, "is not married.")
}
*/


/*
var names = ["John", "Mark", "Mary"];
var years = [1990, 1969, 1948];
var scores = [[100, 100, 100], [120, 120, 120], [100,100,100]];

console.log(names.unshift("Adam"));

console.log(names.indexOf("Mark"));

var isDave = names.indexOf("Dave") === -1 ? 'Dave is not in this list' : 'Dave is in this list';
console.log(isDave);

var johnAve = 0;
var mikeAve = 0;
var maryAve = 0;

function highestScore() {
    if (johnAve > mikeAve && johnAve > maryAve) {
        console.log("John's team had the winning score with " + johnAve + " points!");
        return ("John");
    } else if (johnAve < mikeAve && mikeAve > maryAve) {
        console.log("Mike's team had the winning score with " + mikeAve + " points!");
        return ("Mike");
    } else if (maryAve > mikeAve && johnAve < maryAve) {
        console.log("Mary's team had the winning score with " + maryAve + " points!");
        return ("Mary");
    } else {
        console.log("There was a tie for the highest score! John: " + johnAve + " points  Mike: " + mikeAve + " points  Mary: " + maryAve + " points");
        return ("Tie");
    }
}

function changeScore(name) {
    if (name === "John") {
        mikeAve += 20;
    } else if (name === "Mike") {
        maryAve += 20;
    } else if (name === "Mary") {
        johnAve += 20;
    } else {
        maryAve += 20;
    }
}

var winner = highestScore();

if (winner !== "Tie") {
    console.log("The first winner is " + winner);
} else {
    console.log("There was a tie!");
}

changeScore(winner);
winner = highestScore();

if (winner !== "Tie") {
    console.log("The second winner is " + winner);
} else {
    console.log("There was a tie!");
}

changeScore(winner);
winner = highestScore();

if (winner !== "Tie") {
    console.log("The third winner is " + winner);
} else {
    console.log("There was a tie!");
}

console.log("John: " + johnAve + " points  Mike: " + mikeAve + " points  Mary: " + maryAve + " points");
*/

/*
var bills = [124, 48, 268];

var tips = [];
var totals = [];
bills.forEach(tipCalc);

function tipCalc(bill) {
    if (bill < 50) {
        tip = bill * 0.20;
        tips.push(tip);
        totals.push(bill + tip);
    } else if (bill >= 50 && bill < 200) {
        tip = bill * 0.15;
        tips.push(tip);
        totals.push(bill + tip);
    } else {
        tip = bill * 0.10;
        tips.push(tip);
        totals.push(bill + tip);
    } 
}


console.log(tips)
console.log(totals)
*/


/*
var john = {
    firstName: 'John',
    lastName: 'Smith',
    birthYear: 1992,
    family: ['Jane', 'Mark', 'Bob', 'Emily'],
    job: 'teacher',
    isMarried: false,
    calcAge: function () {
        this.age = 2018 - this.birthYear;
    }
};

john.calcAge();
console.log(john);
*/

/*
var john = {
    name: "John smith",
    mass: 110,
    height: 1.95,
}

var mark = {
    name: "Mark Two",
    mass: 78,
    height: 1.69,
}

function calcBMI(name) {
    name.BMI = (name["mass"] / (name["height"] * name["height"]));
}

calcBMI(john);
calcBMI(mark);

console.log(john,mark);
*/

var john = {
    bills: [124, 48, 268],
    tips: [],
    totals: [],
}

var mark = {
    bills: [77, 375, 110, 45],
    tips: [],
    totals: [],
}

function tipCalc(name) {
    for (var i = 0; i < name.bills.length; i++) {
        bill = name.bills[i]
        if (bill < 50) {
            tip = bill * 0.20;
            name.tips.push(tip);
            name.totals.push(bill + tip);
        } else if (bill >= 50 && bill < 200) {
            tip = bill * 0.15;
            name.tips.push(tip);
            name.totals.push(bill + tip);
        } else {
            tip = bill * 0.10;
            name.tips.push(tip);
            name.totals.push(bill + tip);
        }
    }
}

//console.log(john);
//console.log(john.bills.length - 1);

tipCalc(john);
tipCalc(mark);

console.log(john);
console.log(mark);