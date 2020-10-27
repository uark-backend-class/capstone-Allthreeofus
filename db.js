const dotenv = require('dotenv').config();
const Sequelize = require('sequelize').Sequelize;
const Model = require('./models/models');

const sequelize = new Sequelize(process.env.DB_CONNECTION);


const User = Model.Users(sequelize, Sequelize);
const Problem = Model.Problems(sequelize, Sequelize);
const Solution = Model.Solutions(sequelize, Sequelize);
const Favorite = Model.Favorites(sequelize, Sequelize);

sequelize.sync({force: true}).then(() => console.log("Tables are created.")).then(() => {
    User.upsert({
        username: process.env.ADMIN,
        admin: true,
    });

    Problem.upsert({
        name: 'FIZZBUZZ',
    });
    Problem.upsert({
        name: 'FIBONACCI'
    });
    Solution.upsert({
        name: 'FIBONACCI',
        solutionName: 'ITERATIVE SOLUTION',
        data:
`\nfunction fib(n){
    let arr = [0, 1];
    for (let i = 2; i < n + 1; i++){
      arr.push(arr[i - 2] + arr[i -1])
    }
   return arr[n]
  }`,
  authorized: false,
  username: 'Allthreeofus',
    });
    Solution.upsert({
        name: 'FIBONACCI',
        solutionName: 'RECURSIVE SOLUTION',
        data:
`\nfunction fib(n) {
    if (n < 2){
      return n
    }
    return fib(n - 1) + fib (n - 2)
}`,
authorized: true,
username: 'Allthreeofus',
    });
    Solution.upsert({
        name: 'FIBONACCI',
        solutionName: 'FORMULAIC SOLUTION',
        data:
`\nfunction fibonacci(number) {
    var sqRootOf5 = Math.sqrt(5);

    var Phi = (1+sqRootOf5)/2;
    var phi = (1-sqRootOf5)/2

    return Math.round((Math.pow(Phi, number) - Math.pow(phi, number)) / sqRootOf5);
}`,
authorized: true,
username: 'Allthreeofus',
    });
    Solution.upsert({
        name: 'FIZZBUZZ',
        solutionName: 'IF STATEMENT SOLUTION',
        data:
`\nfizzBuzz=function(list){
    for (x in list){
        if ( x % 3 == 0 || x % 5 == 0){
            if (x % 15 == 0){
                console.log(FIZZBUZZ);
            } 
            else if (x % 3 == 0){
                console.log(FIZZ);
            }
            else {
                console.log(BUZZ);
            }
        }
        else {
            console.log(x);
        }
    }
}`,
        username: 'Allthreeofus',
        authorized: true,
    });
    Solution.upsert({
        name: 'FIZZBUZZ',
        solutionName: 'TERNARY SOLUTION',
        data:
`\nfizzBuzz = function (list) {
    for (x in list) {
        (x % 3 == 0 || x % 5 == 0)?
        ((x % 15 == 0)? console.log(FIZZBUZZ):
        ((x % 3 == 0)? console.log(FIZZ):
        console.log(BUZZ))):
        console.log(x); 
    }
}`,
        username: 'Allthreeofus',
        authorized: true,
    });
    Solution.upsert({
        name: 'FIZZBUZZ',
        solutionName: 'BRANCHLESS SOLUTION',
        data: 
`\nfunction branchlessFizzBuzz(list){
    for (x in list){
        console.log("Fizz".repeat(x % 3 === 0) + 
        "Buzz".repeat(x % 5 === 0) || x);
    }
}`,
        username: 'Allthreeofus',
        authorized: true,
    });
});


module.exports = {
    User,
    Problem,
    Solution,
    Favorite,
};