// Generated by CoffeeScript 1.3.3
(function() {
  var TriggerFlow, fs, path, tutil, util;

  tutil = require('testutil');

  TriggerFlow = require('../lib/triggerflow').TriggerFlow;

  util = require('util');

  fs = require('fs-extra');

  path = require('path-extra');

  describe('TriggerFlow', function() {
    it('should fire the event when the conditions are met', function(done) {
      var again, processing, tf;
      processing = 0;
      tf = TriggerFlow.create({
        done: false,
        processing: processing
      }, function() {
        T(tf.hasTriggered);
        return done();
      });
      setTimeout(function() {
        return tf.update({
          done: true
        });
      }, 5);
      again = function() {
        processing += 1;
        tf.update({
          processing: processing
        });
        return setTimeout(function() {
          processing -= 1;
          return tf.update({
            processing: processing
          });
        }, 10);
      };
      return again();
    });
    it('should fire the event when the conditions are met and retrieve the expected parameters', function(done) {
      var ARBITRARY_STRING, ARBITRATY_NUM, again, processing, tf;
      ARBITRARY_STRING = 'hello';
      ARBITRATY_NUM = 29;
      processing = 0;
      tf = TriggerFlow.create({
        done: false,
        processing: processing
      }, function(someNum, someString) {
        T(someNum === ARBITRATY_NUM);
        T(someString === ARBITRARY_STRING);
        T(tf.hasTriggered);
        return done();
      });
      setTimeout(function() {
        return tf.update({
          done: true
        });
      }, 5);
      again = function() {
        processing += 1;
        tf.update({
          processing: processing
        }, ARBITRATY_NUM, ARBITRARY_STRING);
        return setTimeout(function() {
          processing -= 1;
          return tf.update({
            processing: processing
          }, ARBITRATY_NUM, ARBITRARY_STRING);
        }, 10);
      };
      return again();
    });
    it('should count down and fire the event when the conditions are met', function(done) {
      var counter, decrementer, tf;
      counter = 10;
      tf = TriggerFlow.create({
        counter: counter
      }, function() {
        T(counter === 0);
        clearInterval(decrementer);
        T(tf.hasTriggered);
        return done();
      });
      return decrementer = setInterval(function() {
        counter -= 1;
        return tf.update({
          counter: counter
        });
      }, 5);
    });
    return it('should automatically count down if the number is negative and then fire the event when the conditions are met', function(done) {
      var decrementer, tf;
      tf = TriggerFlow.create({
        counter: 10
      }, function() {
        T(tf.object.counter === 0);
        clearInterval(decrementer);
        T(tf.hasTriggered);
        return done();
      });
      return decrementer = setInterval(function() {
        return tf.update({
          counter: -1
        });
      }, 5);
    });
  });

}).call(this);
