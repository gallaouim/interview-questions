# What are Closures in JavaScript?

Closures are a fundamental concept in JavaScript that allows functions to access variables from their outer scope even after the outer function has returned.

## Answer

A closure is created when a function is defined inside another function and has access to the outer function's variables, even after the outer function has finished executing.

**Key characteristics:**
- Inner functions have access to outer function's variables
- Variables persist even after the outer function returns
- Each closure has its own independent copy of variables

**Example:**
```javascript
function outerFunction(x) {
  // Outer function's variable
  const outerVariable = x;
  
  // Inner function (closure)
  function innerFunction(y) {
    console.log(outerVariable + y); // Accesses outer variable
  }
  
  return innerFunction;
}

const closure = outerFunction(10);
closure(5); // Output: 15

// Even though outerFunction has finished executing,
// innerFunction still has access to outerVariable
```

**Common use case - Data privacy:**
```javascript
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
// count is not directly accessible from outside
```

**Closure in loops:**
```javascript
// Problem: All functions reference the same variable
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints: 3, 3, 3
}

// Solution: Use let or IIFE to create a new closure
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints: 0, 1, 2
}
```

