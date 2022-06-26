require 'mini_racer'

context = MiniRacer::Context.new
context.eval 'let global = globalThis'
context.eval File.read './system.min.js'
context.eval File.read './named-register.js'
context.eval File.read './dist.js'

def load_index context, &with_index
  context.attach 'loadedIndex', -> (*a, **kw) { with_index.call *a, **kw }

  context.eval "
    (async function () {
      globalThis.index = await System.import('index')
      // loadedIndex(index)
    })()

    function getIndex() { return globalThis.index }
  "

  sleep 0.1

  puts 'after load'
  index = context.call 'getIndex'
  with_index.call index
end

def make_schemes context, &with_schemes
  puts 'making...'
  context.attach 'madeSchemes', -> (*a, **kw) { with_schemes.call *a, **kw }
  puts 'attached...'
#   context.eval 'madeSchemes("hello")'
  context.eval "
    globalThis.schemes = tryMakeSchemes()
    madeSchemes(schemes)

    function tryMakeSchemes() {
      try {
        return makeSchemes()
      } catch (e) {
        return e
      }
    }

    function makeSchemes() {
      let palette = new index.CorePalette(6770852)
      return {
        light_scheme: index.Scheme.lightFromCorePalette(palette),
        dark_scheme: index.Scheme.darkFromCorePalette(palette),
      }
    }
  "
  puts 'after eval'
end

load_index context do |index|
  puts "called with index", index
  puts context
  sleep 1

  puts 'making schemes'
  make_schemes context do |schemes|
    puts "  schemes:", schemes
  end

  puts 'after'
end


