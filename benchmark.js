var fs = require('fs')
var steno = require('./')

function benchmark(f) {
  var start = Date.now()
  f(function(str) {
    var end = Date.now()
    console.log(str + '  ' + (end - start) + ' (ms)')
  })
}

var max = 10 * 1000

benchmark(function(done) {
  for (var i = 0; i <= max; i++) fs.writeFileSync('tmp.txt', i)
  done('fs.writeFileSync')
})

benchmark(function(done) {
  var writer = steno('tmp.txt')

  writer.callback = function(data, next) {
    if (data === max) done('steno.write     ')
    next()
  }

  for (var i = 0; i <= max; i++) writer.write(i)
})