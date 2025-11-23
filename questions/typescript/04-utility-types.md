# What are Utility Types in TypeScript?

TypeScript provides several built-in utility types that help transform existing types into new types.

## Answer

Utility types are predefined generic types that perform common type transformations. They help you manipulate types without writing complex type definitions from scratch.

**Common Utility Types:**

**1. Partial<T>** - Makes all properties optional:
```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = Partial<User>;
// Equivalent to:
// {
//   name?: string;
//   age?: number;
//   email?: string;
// }

function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}
```

**2. Required<T>** - Makes all properties required:
```typescript
interface Config {
  apiKey?: string;
  timeout?: number;
}

type RequiredConfig = Required<Config>;
// All properties are now required
```

**3. Pick<T, K>** - Select specific properties:
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Pick<User, 'id' | 'name' | 'email'>;
// { id: number; name: string; email: string; }
```

**4. Omit<T, K>** - Remove specific properties:
```typescript
type UserWithoutPassword = Omit<User, 'password'>;
// { id: number; name: string; email: string; }
```

**5. Record<K, T>** - Create object type with specific keys:
```typescript
type Status = 'active' | 'inactive' | 'pending';
type StatusMap = Record<Status, number>;
// { active: number; inactive: number; pending: number; }
```

**6. Readonly<T>** - Make all properties readonly:
```typescript
interface Config {
  apiKey: string;
}

type ReadonlyConfig = Readonly<Config>;
// All properties are readonly
```

