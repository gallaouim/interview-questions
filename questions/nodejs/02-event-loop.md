---
tag: intermediate
---

# What is the Event Loop in Node.js?

The event loop is a crucial concept for understanding how Node.js handles asynchronous operations.

## Answer

The event loop is what allows Node.js to perform non-blocking I/O operations despite being single-threaded. It continuously checks the call stack and processes callbacks from the callback queue.

**Phases of the Event Loop:**
1. **Timers**: Executes callbacks scheduled by `setTimeout()` and `setInterval()`
2. **Pending callbacks**: Executes I/O callbacks deferred to the next loop iteration
3. **Idle, prepare**: Internal use
4. **Poll**: Retrieves new I/O events and executes I/O related callbacks
5. **Check**: Executes `setImmediate()` callbacks
6. **Close callbacks**: Executes close callbacks (e.g., `socket.on('close')`)

The event loop processes one phase at a time, moving to the next phase only when the current phase's queue is empty or the maximum number of callbacks has been executed.

