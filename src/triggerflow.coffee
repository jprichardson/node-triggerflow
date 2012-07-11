class TriggerFlow
  constructor: ->
    @callback = ->
    @object = {}
    @hasTriggered = false  

  update: (partialObject) =>
    for key,val of partialObject
      #console.log "pobj: #{key},#{val}"
      if partialObject.hasOwnProperty(key)
        if typeof val is 'number'
          if val < 0 #should just decrement
            @object[key] = @object[key] + val
          else
            @object[key] = val
        else
          @object[key] = val

    allTrue = true
    for key,val of @object
      #console.log "wobj: #{key},#{val}"
      if @object.hasOwnProperty(key)
        if typeof val is 'boolean'
          allTrue &= val
        if typeof val is 'number'
          allTrue &= (val is 0)
        if !allTrue
          #console.log 'not all true'
          return
    #if we're here, they're allTrue
    @hasTriggered = true
    args = []
    Array.prototype.push.apply(args, arguments)
    args.shift() #cut partialObject out
    if @callback? then @callback.apply(null, args)

  @create: (object, callback) ->
    tf = new TriggerFlow()
    tf.callback = callback
    tf.object = object
    tf

module.exports.TriggerFlow = TriggerFlow