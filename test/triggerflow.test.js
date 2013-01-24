var tutil = require('testutil')
  , TriggerFlow = require('../lib/triggerflow').TriggerFlow
  , trigger = require('../lib/triggerflow')
  , util = require('util')


describe('TriggerFlow', function() {
  it('should fire the event when the conditions are met', function(done) {
    var processing = 0
    var tf = trigger({done: false, processing: processing}, function() {
      T (tf.hasTriggered);
      done()
    })
    
    setTimeout(function() {
      tf.update({done: true})
    }, 5)

    function again() {
      processing += 1
      tf.update({processing: processing})
      setTimeout(function() {
        processing -= 1;
        tf.update({processing: processing})
      }, 10)
    }
    again()
  })

  it('should fire the event when the conditions are met and retrieve the expected parameters', function(done) {
    var ARBITRARY_STRING = 'hello'
      , ARBITRATY_NUM = 29
      , processing = 0;
    var tf = TriggerFlow.create({done: false, processing: processing}, function(someNum, someString) {
      T (someNum, ARBITRATY_NUM)
      T (someString, ARBITRARY_STRING)
      T (tf.hasTriggered)
      done()
    })
    setTimeout(function() { tf.update({done: true }) }, 5)
    
    function again() {
      processing += 1;
      tf.update({processing: processing }, ARBITRATY_NUM, ARBITRARY_STRING)
      setTimeout(function() { 
        processing -= 1; 
        tf.update({ processing: processing}, ARBITRATY_NUM, ARBITRARY_STRING);
      }, 10);
    };
    again()
  })

  it('should count down and fire the event when the conditions are met', function(done) {
    var counter = 10
    var tf = TriggerFlow.create({counter: counter}, function() {
      T (counter === 0)
      clearInterval(decrementer);
      T (tf.hasTriggered);
      done();
    })
    
    var decrementer = setInterval(function() {
      counter -= 1;
      tf.update({counter: counter })
    }, 5)
  })

  it('should automatically count down if the number is negative and then fire the event when the conditions are met', function(done) {
    var tf = trigger({counter: 10}, function() {
      T (tf.object.counter === 0)
      clearInterval(decrementer)
      T (tf.hasTriggered)
      done()
    })
    
    var decrementer = setInterval(function() {
      tf.update({counter: -1 })
    }, 5)
  })
})


