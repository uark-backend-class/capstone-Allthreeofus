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
        username: 'Allthreeofus',
        admin: true,
    });

    Problem.upsert({
        name: 'FIZZBUZZ',
    });

    Solution.upsert({
        name: 'FIZZBUZZ',
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