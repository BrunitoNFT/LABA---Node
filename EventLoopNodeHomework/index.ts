/*

What is the event loop?
The event loop is a constantly running process which 
allows node.js to perform non-blocking I/O operations
although JS is single threaded.
How? Offloading operations to the system kernel whenever possible.

Event Loop phases overview:

(After each phase event loop will check if there is any callback in the microtask queue). Composed by two individual queues:
- nextTick queue (Has more priority over promise) 
- promise queue

1) timers: this phase executes callbacks scheduled by setTimeout() and setInterval().
2) pending callbacks: executes I/O callbacks deferred to the next loop iteration.
3) idle, prepare: only used internally.
4) poll: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate()); node will block here when appropriate.
5) check: setImmediate() callbacks are invoked here.
6) close callbacks: some close callbacks, e.g. socket.on('close', ...).

JS runs the synchronous code and if an asynchronous operation is triggered follows the following steps:
- The operation will live in the synchronous event demultiplexer. For example file system or network operations.
- When this operation ends, node moves it to the event queue.
- When no more synchronous code is in the call stack, the event loop moves the callback from the event queue to the call stack.

And this is the process and how it works simplified.



/ Sources:
- https://nodejs.org/ru/docs/guides/event-loop-timers-and-nexttick#timers
- https://www.bitovi.com/blog/how-node.js-fakes-multithreading#:~:text=The%20synchronous%20event%20demultiplexer%20is,Node%20while%20it's%20in%20progress.

*/

class AsyncOperationManager {
  constructor() {}

  /*
  This method will trigger a console.log in sync event dimultiplexer.
  After X miliseconds have passed event and handler will be moved to event queue.
  If no microtask callback is waiting to be executed, event loop will iterate in the first phase which is timer and will find this callback waiting.
  The callback will be moved to call stack and executed.
  After the execution of the callback it doesen't matter anything else the console.log will appear and inmediatly after the nextTick callback will be executed because is in microtask and has priority.
  */
  simulateAsyncOperation(miliseconds: number) {
    setTimeout(() => {
      console.log(
        'Message after delay of : ',
        miliseconds,
        'ms. | ID: ',
        String(Math.random()).substring(2, 5)
      );
      process.nextTick(() => {
        console.log(
          'Microtask executed immediately after the asynchronous operation'
        );
      });
    }, miliseconds);
  }

  /*
  This method will trigger an operation in sync event dimultiplexer.
  If no microtask callback is waiting to be executed, event loop will iterate in the phases and will find this callback waiting in check phase.
  The callback will be moved to call stack if it is empty and cb content will be executed.
  */

  scheduleImmediate() {
    setImmediate(() => {
      console.log(
        'setImmediate message emitted by scheduleImmediate' + ' | ID: ',
        String(Math.random()).substring(2, 5)
      );
    });
  }
}

const asyncManager = new AsyncOperationManager();

// In this example, sometimes immediate will execute before and other times timeout 0.
// This depends on the context in which they are called. If both are called from within the main module,
// then timing will be bound by the performance of the process (which can be impacted by other applications running on the machine).
asyncManager.simulateAsyncOperation(0);
asyncManager.scheduleImmediate();

// I could analize that the microtask is always executed after timeout.
// Because as I said event loop will check in microtask queue after each event phase, even though there is a immediate cb in a following event loop stage,
// it doesn't matter what, event loop will check in microtask queue first and then in other event loop stages.
