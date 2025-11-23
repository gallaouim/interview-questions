# What are React Hooks?

Hooks are functions that let you use state and other React features in functional components.

## Answer

Hooks were introduced in React 16.8 to allow functional components to have state, lifecycle methods, and other React features that were previously only available in class components.

**Common Hooks:**

**1. useState** - Manage component state:
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

**2. useEffect** - Handle side effects:
```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts or userId changes
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));

    // Cleanup function (runs on unmount or before re-running effect)
    return () => {
      // Cancel any pending requests
    };
  }, [userId]); // Dependency array

  if (!user) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```

**3. useContext** - Access context:
```jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemedButton() {
  const theme = useContext(ThemeContext);
  
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      Themed Button
    </button>
  );
}
```

**4. useMemo** - Memoize expensive calculations:
```jsx
import { useMemo } from 'react';

function ExpensiveComponent({ items, filter }) {
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter);
  }, [items, filter]); // Only recalculate when items or filter changes

  return <div>{filteredItems.map(item => <div key={item.id}>{item.name}</div>)}</div>;
}
```

**5. useCallback** - Memoize functions:
```jsx
import { useCallback, useState } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Function reference stays the same

  return <Child onClick={handleClick} />;
}
```

**Rules of Hooks:**
- Only call hooks at the top level (not inside loops, conditions, or nested functions)
- Only call hooks from React function components or custom hooks

