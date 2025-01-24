# JavaScript Variables

Variables are containers for storing data values in JavaScript. Here's everything you need to know about JavaScript variables:

## Variable Declaration

There are three ways to declare variables in JavaScript:

1. `var` - Function scoped (traditional way, less used in modern JavaScript)
2. `let` - Block scoped (recommended for variables that will be reassigned)
3. `const` - Block scoped (recommended for values that won't be reassigned)

## Variable Naming Rules

- Must start with a letter, underscore (_), or dollar sign ($)
- Can contain letters, numbers, underscores, and dollar signs
- Are case-sensitive
- Cannot use reserved JavaScript keywords

## Variable Scope

Scope determines where variables are accessible in your code. Think of scope as the "visibility" of variables - where you can see and use them.

### Types of Scope

1. **Global Scope**
Variables declared outside any function or block have global scope and can be accessed from anywhere:

```javascript
// Global scope
let globalVar = "I'm accessible everywhere";

function someFunction() {
    console.log(globalVar);  // Works! Can access global variables
}

if (true) {
    console.log(globalVar);  // Works! Can access global variables
}
```

2. **Function Scope**
Variables declared inside a function are only accessible within that function:

```javascript
function myFunction() {
    let functionVar = "I'm only accessible inside myFunction";
    var alsoFunctionScoped = "Me too!";
    
    console.log(functionVar);         // Works
    console.log(alsoFunctionScoped);  // Works
}

// console.log(functionVar);         // Error! Can't access
// console.log(alsoFunctionScoped);  // Error! Can't access
```

3. **Block Scope**
Variables declared with `let` and `const` inside a block (denoted by `{}`) are only accessible within that block:

```javascript
// Block scope examples
if (true) {
    let blockVar = "I'm block scoped";
    const alsoBlockScoped = "Me too!";
    var notBlockScoped = "I'm function scoped!";
    
    console.log(blockVar);         // Works
    console.log(alsoBlockScoped);  // Works
}

// console.log(blockVar);         // Error! Can't access
// console.log(alsoBlockScoped);  // Error! Can't access
console.log(notBlockScoped);      // Works! var ignores block scope

// Loop block scope
for (let i = 0; i < 3; i++) {
    let insideLoop = `Loop ${i}`;
    // insideLoop and i only accessible here
}
// console.log(i);           // Error! Can't access
// console.log(insideLoop);  // Error! Can't access
```

### Nested Scope
Inner scopes can access variables from outer scopes, but not vice versa:

```javascript
let outerVar = "I'm in outer scope";

function outerFunction() {
    let middleVar = "I'm in middle scope";
    
    function innerFunction() {
        let innerVar = "I'm in inner scope";
        
        console.log(innerVar);   // Works - same scope
        console.log(middleVar);  // Works - outer scope
        console.log(outerVar);   // Works - global scope
    }
    
    console.log(middleVar);      // Works - same scope
    console.log(outerVar);       // Works - global scope
    // console.log(innerVar);    // Error! Can't access inner scope
}

console.log(outerVar);           // Works - global scope
// console.log(middleVar);       // Error! Can't access function scope
// console.log(innerVar);        // Error! Can't access inner scope
```

### Lexical Scope
JavaScript uses lexical scoping, meaning that the scope of a variable is determined by its location within the source code:

```javascript
function outer() {
    let name = "John";
    
    function inner() {
        // inner() has access to name because of lexical scoping
        console.log(name);  // Works! Prints "John"
    }
    
    inner();
}
```

### Key Points About Scope

1. `var` declarations are function-scoped or globally-scoped
2. `let` and `const` declarations are block-scoped
3. Inner scopes can access outer scope variables
4. Outer scopes cannot access inner scope variables
5. Global variables can be accessed from anywhere
6. Avoid global variables when possible (they can lead to naming conflicts)

## Variable Hoisting

Hoisting is JavaScript's default behavior of moving declarations to the top of their scope during the compilation phase, before code execution. However, only the declarations are hoisted, not the initializations.

### Hoisting with `var`
Variables declared with `var` are hoisted to the top of their scope and initialized with `undefined`:

```javascript
console.log(hoistedVar);  // Output: undefined
var hoistedVar = "I'm hoisted!";

// The above code is interpreted as:
var hoistedVar;  // Declaration is hoisted
console.log(hoistedVar);  // undefined
hoistedVar = "I'm hoisted!"  // Assignment stays here
```

### Hoisting with `let` and `const`
Variables declared with `let` and `const` are hoisted but not initialized. The period between entering scope and being declared is called the "Temporal Dead Zone" (TDZ):

```javascript
// This will throw a ReferenceError
console.log(notHoisted);  // Error: Cannot access before initialization
let notHoisted = "I'm not hoisted";

// Same applies for const
console.log(constVar);    // Error: Cannot access before initialization
const constVar = "I'm not hoisted either";
```

### Function Hoisting
Function declarations are completely hoisted (both declaration and definition):

```javascript
// This works!
sayHello();  // Output: "Hello!"

function sayHello() {
    console.log("Hello!");
}

// But function expressions are not hoisted
sayGoodbye();  // Error: sayGoodbye is not a function

var sayGoodbye = function() {
    console.log("Goodbye!");
}
```

### Practical Examples

1. Variable and Function Hoisting Together:
```javascript
console.log(name);  // undefined
sayHello();        // "Hello undefined!"

var name = "John";
function sayHello() {
    console.log("Hello " + name + "!");
}

// After hoisting, the code is interpreted as:
function sayHello() {
    console.log("Hello " + name + "!");
}
var name;
console.log(name);
sayHello();
name = "John";
```

2. Block Scope and Hoisting:
```javascript
var x = 1;
{
    console.log(x);  // ReferenceError: Cannot access 'x' before initialization
    let x = 2;       // x is hoisted to the top of the block
}
```

### Best Practices to Avoid Hoisting Issues

1. Always declare variables at the top of their scope
2. Always declare functions before using them
3. Use `let` and `const` instead of `var` to catch potential hoisting-related bugs
4. Initialize variables when you declare them
5. Be aware that function declarations are hoisted but function expressions are not

## Best Practices

1. Use `const` by default
2. Use `let` when you need to reassign values
3. Avoid using `var`
4. Use meaningful and descriptive variable names
5. Use camelCase for variable names
6. Use UPPERCASE for constants that are truly constant

## Data Types in Variables

JavaScript variables can hold different types of data:

```javascript
let string = "Hello";           // String
let number = 42;                // Number
let boolean = true;             // Boolean
let array = [1, 2, 3];         // Array
let object = {name: "John"};    // Object
let nullValue = null;          // Null
let undefinedValue;            // Undefined
```

## Type Coercion

JavaScript is a loosely typed language, meaning variables can change types:

```javascript
let x = 5;        // Number
x = "Hello";      // Now a String
```

Remember to always initialize your variables before using them and choose the appropriate declaration keyword based on your needs.