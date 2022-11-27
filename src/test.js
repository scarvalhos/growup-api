'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


/*
 * Complete the 'fizzBuzz' function below.
 *
 * The function accepts INTEGER n as parameter.
 */


function multiplesOfFive(n) {
  const numbers = []

  for (let i = 1; i < n; i++) {
    numbers.push(i * 5)
  }

  return numbers
}

const multiplesOfThree = (n) => {
  const numbers = []

  for (let i = 1; i < n; i++) {
    numbers.push(i * 3)
  }

  return numbers
}

function isMultipleOfFive(n) {
  const multiples = multiplesOfFive(10)
  return multiples.includes(n)

}

function isMultipleOfThree(n) {
  const multiples = multiplesOfThree(10)
  return multiples.includes(n)
}

function fizzBuzz(n) {
  if (isMultipleOfThree(n) && isMultipleOfFive(n)) {
    console.log('fizzBuzz')
  } else if (isMultipleOfThree(n) && !isMultipleOfFive(n)) {
    console.log('fizz')
  } else if (!isMultipleOfThree(n) && isMultipleOfFive(n)) {
    console.log('Buzz')
  } else if (!isMultipleOfThree(n) && !isMultipleOfFive(n)) {
    console.log(n)
  }
}

function main() {
    const n = 10;

    for (let i = 1;i < n;i++) {
      fizzBuzz(i);
    }

}

main()