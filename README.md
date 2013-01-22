Node.js - TriggerFlow
==================

A simple library used to conditionally trigger methods.



Why?
----

Some patterns necessitate having triggers. For example, consider walking a directory tree:

```javascript
walk('~/data')
.on('file', function(file) {
  //do some file processing
})
.end('end', function() {
  //move to another part of the program
})
```

What if when the `end` event is emitted, some file processing is still occurring? And let's say that the other part of your program needs this file processing to be completed, what do you do?



Install
-------

    npm install triggerflow



Usage
-----

Revisiting the previous example, you can solve this problem quite easily with a trigger. A trigger can be thought of as a switch that fires a method when some conditions have been met. More specifically in the case of `triggerflow`, when the conditions meet a *base* condition.

In `triggerflow`, base conditions are when a `boolean` is `true` and when a `number` is `0`.

**Example:**

```javascript
var trigger = require('triggerflow');

var finishedTrigger = trigger({processing: 0, done: false}, function() { moveToNextPartOfProgram() })
  , processing = 0;

walk('~/data')
.on('file', function(file) {
  processing += 1;
  tf.update({processing: processing});
  processFile(file, function() { //hypothetical async file process function
    processing -= 1;
    tf.update({processing: processing});
  })
}).end('end', function() {
  tf.update({done: true});
})
```
The trigger is only fired and thus `moveToNextPartOfProgram()` is called when `processing` is `0` and `done` is `true`.




License
-------

MIT Licensed

Copyright (c) 2012 JP Richardson
