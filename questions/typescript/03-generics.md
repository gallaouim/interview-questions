---
tag: intermediate
---

# What are Generics in TypeScript?

Generics provide a way to make components work with any data type and not restrict to one data type.

## Answer

Generics in TypeScript allow you to create reusable components that can work with multiple types rather than a single one. They provide type variables that act as placeholders for types that will be specified when the component is used.

**Key benefits:**
- **Type safety**: Maintain type information between function input and output
- **Code reusability**: Write functions that work with multiple types
- **Better IntelliSense**: Get better autocomplete and type checking

**Basic Example:**
```typescript
function identity<T>(arg: T): T {
  return arg;
}

// Usage
let output1 = identity<string>("hello");  // Type is string
let output2 = identity<number>(42);        // Type is number
let output3 = identity("hello");           // Type inference: string
```

**Generic Interfaces:**
```typescript
interface GenericArray<T> {
  items: T[];
  add(item: T): void;
  get(index: number): T | undefined;
}

const numberArray: GenericArray<number> = {
  items: [1, 2, 3],
  add(item) { this.items.push(item); },
  get(index) { return this.items[index]; }
};
```

**Generic Classes:**
```typescript
class GenericBox<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const stringBox = new GenericBox<string>("Hello");
const numberBox = new GenericBox<number>(42);
```

**Constraints:**
You can constrain generics to ensure they have certain properties:
```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

