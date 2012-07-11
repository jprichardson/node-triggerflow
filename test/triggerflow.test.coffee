tutil = require('testutil')
{TriggerFlow} = require('../lib/triggerflow')
util = require('util')
fs = require('fs-extra')
path = require('path-extra')

describe 'TriggerFlow', ->
  it 'should fire the event when the conditions are met', (done) ->
    processing = 0
    tf = TriggerFlow.create done: false, processing: processing, ->
      T tf.hasTriggered
      done()

    setTimeout(-> 
      tf.update(done: true)
    ,5)

    again = ->
      processing += 1
      tf.update(processing: processing)
      setTimeout(->
        processing -= 1
        tf.update(processing: processing)
      ,10)
    again()

  it 'should fire the event when the conditions are met and retrieve the expected parameters', (done) ->
    ARBITRARY_STRING = 'hello'
    ARBITRATY_NUM = 29

    processing = 0
    tf = TriggerFlow.create done: false, processing: processing, (someNum, someString) ->
      T someNum is ARBITRATY_NUM
      T someString is ARBITRARY_STRING
      T tf.hasTriggered
      done()

    setTimeout(-> 
      tf.update(done: true)
    ,5)

    again = ->
      processing += 1
      tf.update(processing: processing, ARBITRATY_NUM, ARBITRARY_STRING)
      setTimeout(->
        processing -= 1
        tf.update(processing: processing, ARBITRATY_NUM, ARBITRARY_STRING)
      ,10)
    again()

  it 'should count down and fire the event when the conditions are met', (done) ->
    counter = 10
    tf = TriggerFlow.create counter: counter, ->
      T counter is 0
      clearInterval(decrementer)
      T tf.hasTriggered
      done()

    decrementer = setInterval(->
      counter -= 1
      tf.update counter: counter
    ,5)

  it 'should automatically count down if the number is negative and then fire the event when the conditions are met', (done) ->
    tf = TriggerFlow.create counter: 10, ->
      T tf.object.counter is 0
      clearInterval(decrementer)
      T tf.hasTriggered
      done()

    decrementer = setInterval(->
      tf.update counter: -1
    ,5)


