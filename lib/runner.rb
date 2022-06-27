require 'mini_racer'
require "active_support/core_ext/hash/indifferent_access"

class Runner
  def self.load
    context = MiniRacer::Context.new
    context.eval 'let global = globalThis'
    context.eval File.read '_ruby/static/system.min.js'
    context.eval File.read '_ruby/static/named-register.js'
    context.eval File.read 'dist.js'
    runner = self.new context
    runner.load_index
    runner
  end

  def initialize context
    @context = context
  end

  def load_index
    @context.eval "
      (async function () {
        let index = await System.import('index')
        globalThis = Object.assign(globalThis, index)
      })()
    "
  end

  def valid_theme? theme, color
    @context.eval "
      const theme = themeFromSourceColor(#{color})
      const palette = new CorePalette(#{color})
      const light_scheme = Scheme.lightFromCorePalette(palette)
      const dark_scheme = Scheme.darkFromCorePalette(palette)
      if (theme.source === color) {
        console.log('source equal to color')
      }
    "
  end

  def make_theme color
    theme = @context.eval"
      themeFromSourceColor(#{color})
    "
    theme.with_indifferent_access
  end

  def make_palette color
    @context.eval "
      new CorePalette(#{color})
    "
  end

  def make_light_scheme color
    make_scheme color, :light
  end

  def make_dark_scheme color
    make_scheme color, :dark
  end

  def make_scheme color, type
    @context.eval "
      (function () {
        let palette = new CorePalette(#{color})
        return Scheme.#{type}FromCorePalette(palette)
      })()
    "
  end

  def make_schemes
    @context.eval "
      globalThis.schemes = tryMakeSchemes()

      function getSchemes() { return globalThis.schemes }

      function tryMakeSchemes() {
        try {
          return makeSchemes()
        } catch (e) {
          return e
        }
      }

      function makeSchemes() {
        let palette = new CorePalette(#{6770852})
        return {
          light_scheme: Scheme.lightFromCorePalette(palette),
          dark_scheme: Scheme.darkFromCorePalette(palette),
        }
      }
    "

    @context.call 'getSchemes'
  end
end
