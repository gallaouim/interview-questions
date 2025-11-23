---
tag: basic
---

# What is the difference between Props and State in React?

Understanding the difference between props and state is fundamental to React development.

## Answer

**Props (Properties):**
- Passed from parent to child components
- Immutable (read-only) in the child component
- Used to pass data and event handlers down the component tree
- Changes in props cause the component to re-render

**State:**
- Managed within a component
- Mutable (can be changed using `setState` or `useState`)
- Local to the component and not accessible to other components
- Changes in state cause the component to re-render

Example:
```jsx
// Parent component
function Parent() {
  const [count, setCount] = useState(0);
  return <Child count={count} onIncrement={() => setCount(count + 1)} />;
}

// Child component
function Child({ count, onIncrement }) {
  // count is a prop (immutable here)
  // Can call onIncrement to update parent's state
  return <button onClick={onIncrement}>Count: {count}</button>;
}
```

