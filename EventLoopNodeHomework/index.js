"use strict";
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
    constructor() { }
    /*
    This method will trigger a console.log in sync event dimultiplexer.
    After X miliseconds have passed event and handler will be moved to event queue.
    If no microtask callback is waiting to be executed, event loop will iterate in the first phase which is timer and will find this callback waiting.
    The callback will be moved to call stack and executed.
    After the execution of the callback it doesen't matter anything else the console.log will appear and inmediatly after the nextTick callback will be executed.
    */
    simulateAsyncOperation(miliseconds) {
        setTimeout(() => {
            console.log('Message after delay of : ', miliseconds, 'ms. | ID: ', String(Math.random()).substring(2, 5));
            process.nextTick(() => {
                console.log('Microtask executed immediately after the asynchronous operation');
            });
        }, miliseconds);
    }
    /*
    This method will trigger an operation in sync event dimultiplexer.
    After miliseconds have passed event and handler will be moved to event queue.
    If no microtask callback is waiting to be executed, event loop will iterate in the first phase which is timer and will find this callback waiting.
    The callback will be moved to call stack and executed.
    */
    scheduleImmediate() {
        setImmediate(() => {
            console.log('setImmediate message emitted by scheduleImmediate' + ' | ID: ', String(Math.random()).substring(2, 5));
        });
    }
}
const asyncManager = new AsyncOperationManager();


asyncManager.simulateAsyncOperation(0);
asyncManager.scheduleImmediate();
