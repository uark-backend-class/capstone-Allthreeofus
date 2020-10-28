const dotenv = require('dotenv').config();
const Sequelize = require('sequelize').Sequelize;
const Model = require('./models/models');

const sequelize = new Sequelize(process.env.DB_CONNECTION);


const User = Model.Users(sequelize, Sequelize);
const Problem = Model.Problems(sequelize, Sequelize);
const Solution = Model.Solutions(sequelize, Sequelize);
const Favorite = Model.Favorites(sequelize, Sequelize);

sequelize.sync().then(() => console.log("Tables are created.")).then(() => {
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
    Problem.upsert({
        name: 'LONGEST STRING IN ARRAY'
    });
    Problem.upsert({
        name: 'BALANCED BRACKETS'
    });
    Problem.upsert({
        name: 'HAPPY NUMBERS'
    });
    Problem.upsert({
        name: 'WUBSTEP',
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
    Solution.upsert({
        name: 'LONGEST STRING IN ARRAY',
        solutionName: '\'FOR\' LOOP',
        data: 
`\nfunction longestString1(arr) {
	var longest = '';
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].length > longest.length) {
			longest = arr[i];
		}
	}
	return longest;
}`,
        username: 'Allthreeofus',
        authorized: true,
    });
    Solution.upsert({
        name: 'LONGEST STRING IN ARRAY',
        solutionName: '.forEach METHOD',
        data: 
`\nconst longestString2 = (arr) => {
	let longest = '';
	arr.forEach((item) => {
		if(item.length > longest.length) {
            longest = item;
        }
	});
	return longest;
}`,
        username: 'Allthreeofus',
        authorized: true,
    });
    Solution.upsert({
        name: 'BALANCED BRACKETS',
        solutionName: 'RETURN BOOLEAN',
        data: 
`\nconst balancedbrackets = (str) => {
    const stack = [];
    let openers = ["{", "[", "("];
    let closers = ["}", "]", ")"];
    
    const dict = {
      "{" : "}",
      "[" : "]",
      "(" : ")"
    }
  
    for(let i = 0; i < str.length; i++) {
          let char = str[i];
          if(openers.includes(char)) {
              stack.push(char);
          }
          else if(closers.includes(char)) { 
  
              if(!stack.length) {
                  return false;
              }
              else if(dict[stack.pop()] !== char) {
                  return false;
              }
          }
      }
      
      return stack.length === 0;
  
  }`,
        username: 'Allthreeofus',
        authorized: true,
    });
    Solution.upsert({
        name: 'HAPPY NUMBERS',
        solutionName: 'FIRST FIVE',
        data: 
`\nfunction happy_number(num) 
{
    var m, n ;
    var c = [] ;
 
    while(num != 1 && c[num] !== true) 
    {
        c[num] = true ;
        m = 0 ;
        while (num > 0) {
            n = num % 10 ;
            m += n * n ;
            num = (num  - n) / 10 ;
        }
        num = m ;
    }
    return (num == 1) ;
}
 
var cnt = 5;
var num = 1;
var f5 = ''; 
while(cnt-- > 0) 
{
    while(!happy_number(num))
        num++ ;
f5 = f5+(num + ", ") ;

    num++ ;
}
console.log('First 5 happy numbers are : '+f5);`,
        username: 'Allthreeofus',
        authorized: true,
    });
    Solution.upsert({
        name: 'WUBSTEP',
        solutionName: 'REPLACE AND REGEX',
        data: 
`\nfunction songDecoder(song) {
	return (
		song

			.replace(/(WUB)+/g, ' ')

            .trim()
    }`,
        username: 'Allthreeofus',
        authorized: true,
    });
    Solution.upsert({
        name: 'WUBSTEP',
        solutionName: 'SPLIT, FILTER, AND JOIN',
        data: 
`\nfunction songDecoder(song) {
	return (
		song
			.split('WUB')

			.filter(Boolean)

			.join(' ')
    );
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