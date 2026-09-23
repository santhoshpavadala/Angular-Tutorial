// Remove duplicates: without inbuilt methods
const numbers = [1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10];

const result: number[] = [];

for (const number of numbers) {
  let exist = false;
  for (const value of result) {
    if (value === number) {
      exist = true;
      break;
    }
  }
  if (!exist) {
    result.push(number);
  }
}

console.log(result);


//  Remove duplicates: with inbuilt set method 
let duplicateNumbers = [1,2,2,3,4,4,5,6,6,7,8,8,9,10];
let findDuplicate = [...new Set(duplicateNumbers)];

console.log(findDuplicate);


// Find the Largest Number

const lNumber = [10,30,50,95,80];
let largest = lNumber[0];

for(const number of lNumber) {
  if(number>largest) {
    largest = number;
  }
}

console.log(largest);


// Reverse a String Without reverse()
const str = 'Angular';
let results = '';
for (let i = str.length - 1; i >= 0; i--) {
  results += str[i];
}
console.log(results);

// Reverse a String - function method
function reverseStr(str:any) {
        let reversed = "";
        for(let i = str.length-1; i>=0; i--) {
            reversed = reversed+str[i]
        }
        return reversed;
    }

    console.log(reverseStr('Santhosh'), 'REVERSED STRNG EXAMPLE');


// Check Palindrome
function isPalindrome( text: string): boolean {
  let left = 0;
  let right = text.length - 1;
  while (left < right) {
    if (text[left] !== text[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

console.log(isPalindrome('madam'));



// Find Missing Number
const mNumbers = [1, 2, 3, 5, 6];

const n = mNumbers.length + 1;

const expected = (n * (n + 1)) / 2;

let actual = 0;

for (const number of mNumbers) {
  actual += number;
}

console.log(expected - actual);



 // ---------------Fibonacci Series (VERY IMPORTANT)
    function fibonacci(n:any) {
        let a=0,b=1;

        for(let i=0; i<n; i++) {
            console.log(a,'fibinocci values');
            let next = a+b;
            a=b;
            b=next;
        }
    }
    fibonacci(6);

    // ---------------Factorial Using Loop (Most Recommended)

    function factorial(n:any) {
        let result =1;
        for(let i=0; i<=1; i++) {
            result *= i;
            // result = result*i
        }
        return result;
    }

    console.log(factorial(5)); // 120

//     result = 1
// i=1 → result = 1 × 1 = 1  
// i=2 → result = 1 × 2 = 2  
// i=3 → result = 2 × 3 = 6  
// i=4 → result = 6 × 4 = 24  
// i=5 → result = 24 × 5 = 120  