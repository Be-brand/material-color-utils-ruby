require 'mini_racer'
# require 'v8'
# require 'commonjs'

context = MiniRacer::Context.new
# script = File.read './dist/index.js'
# context.eval script
# puts context.eval 'this'
context.eval 'let global = globalThis'
context.eval File.read './system.min.js'
context.eval File.read './named-register.js'
# context.eval File.read './dist/index.js'
context.eval <<~JS
  System.register('tslib', #{})
JS
context.eval File.read './dist.js'
context.attach 'callMe', proc { |*with| puts "called#{with.size > 0 ? " with: #{with}" : ''}" }
context.eval <<~JS
  (async function () {
//     const scheme = System.import('/index.js').then(m => {
//       throw new Error
//     })
//     return Object.keys(scheme).length
    callMe('before')
    try {
      let index = await System.import('index')
      callMe('success')
    } catch (e) {
      callMe('failure', e.message)
    } finally {
      callMe('after')
    }
  })()
JS

sleep 1

puts context.eval <<~JS
//   Object.entries(index)
  typeof index
JS
# env = CommonJS::Environment.new context, path: '/home/roei/repos/dart-boilerplate/material-color-utilities/typescript/dist'
# env.require('index.js')


