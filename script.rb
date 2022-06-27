require 'mini_racer'

context = MiniRacer::Context.new
context.eval 'let global = globalThis'
context.eval File.read './ruby/system.min.js'
context.eval File.read './ruby/named-register.js'
context.eval File.read './dist.js'


def load_index context
  context.eval "
    (async function () {
      globalThis.index = await System.import('index')
    })()

    function getIndex() { return index }
  "

  context.call 'getIndex'
end

def make_schemes context
  context.eval "
    globalThis.schemes = tryMakeSchemes()

    function getSchemes() { return schemes }

    function tryMakeSchemes() {
      try {
        return makeSchemes()
      } catch (e) {
        return e
      }
    }

    function makeSchemes() {
      let palette = new index.CorePalette(#{6770852})
      return {
        light_scheme: index.Scheme.lightFromCorePalette(palette),
        dark_scheme: index.Scheme.darkFromCorePalette(palette),
      }
    }
  "

  context.call 'getSchemes'
end

index = load_index context
schemes = make_schemes context
puts "  schemes:", schemes
