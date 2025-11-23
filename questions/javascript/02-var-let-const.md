---
tag: basic
---

# What is the difference between var, let, and const?

## Answer

**var:**
- Function-scoped or globally-scoped
- Can be redeclared and reassigned
- Hoisted to the top of its scope
- No block scope

**let:**
- Block-scoped
- Cannot be redeclared in the same scope
- Can be reassigned
- Not hoisted (temporal dead zone)

**const:**
- Block-scoped
- Cannot be redeclared or reassigned
- Must be initialized at declaration
- Not hoisted (temporal dead zone)
- For objects/arrays, the reference is constant but properties can be modified

Example:
```javascript
var x = 1;
let y = 2;
const z = 3;

if (true) {
  var x = 10; // Same variable
  let y = 20; // Different variable
  // const z = 30; // Error: cannot redeclare
}
```

