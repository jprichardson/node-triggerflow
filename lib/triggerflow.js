
function TriggerFlow() {
  this.callback = function() {};
  this.object = {};
  this.hasTriggered = false;
}

TriggerFlow.prototype.update = function(partialObject) {
  var _this = this

  Object.keys(partialObject).forEach(function(key) {
    var val = partialObject[key]
    if (typeof val === 'number') {
      if (val < 0) _this.object[key] = _this.object[key] + val
      else _this.object[key] = val
    } 
    else
      _this.object[key] = val
  })

  var allTrue = Object.keys(_this.object).map(function(key) { return _this.object[key]}).every(function(val) {
    if (typeof val === 'boolean') return val;
    if (typeof val === 'number') return val === 0;
    else return !!val
  })

  if (!allTrue) return

  this.hasTriggered = true;
  var args = []
  Array.prototype.push.apply(args, arguments)
  args.shift()

  if (this.callback)
    this.callback.apply(null, args)
}

TriggerFlow.create = function(object, callback) {
  var tf = new TriggerFlow()
  tf.callback = callback
  tf.object = object
  return tf
}


module.exports = function trigger (object, callback) {
  return TriggerFlow.create(object, callback)
}

module.exports.TriggerFlow = TriggerFlow


