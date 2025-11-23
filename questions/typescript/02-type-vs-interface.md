# What is the difference between type and interface in TypeScript?

Both `type` and `interface` are used to define object shapes in TypeScript, but they have some differences.

## Answer

**interface:**
- Can be extended and merged (declaration merging)
- Better for object shapes
- Can be implemented by classes
- More readable error messages

**type:**
- More flexible (can represent unions, intersections, primitives, etc.)
- Cannot be merged
- Cannot be implemented by classes directly
- Better for complex type operations

Example:
```typescript
// Interface
interface User {
  name: string;
  age: number;
}

// Type
type UserType = {
  name: string;
  age: number;
}

// Type can do unions, interfaces cannot
type Status = 'active' | 'inactive' | 'pending';
```

