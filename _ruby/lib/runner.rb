require 'mini_racer'
require 'active_support/core_ext/hash/indifferent_access'
require 'active_support/core_ext/hash/except'

class Runner
  def self.load
    context = MiniRacer::Context.new
    context.eval 'let global = globalThis'
    context.eval File.read(File.join(File.dirname(__FILE__),'../static/system.min.js'))
    context.eval File.read(File.join(File.dirname(__FILE__),'../static/named-register.js'))
    context.eval File.read(File.join(File.dirname(__FILE__),'../static/dist.js'))
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

        globalThis.makeTonalPalette = function (color) {
          return TonalPalette.fromInt(color)
        }

        globalThis.makeCorePalette = function (colors) {
          core_palette = new CorePalette(colors.primary)
          palette_colors = {
            primary: 'a1',
            secondary: 'a2',
            tertiary: 'a3',
            background: 'n1',
            outline: 'n2'
          }
          Object.entries(colors).forEach(([name, value]) => {
            tonal_palette = makeTonalPalette(value)
            representation = palette_colors[name]
            core_palette[representation] = tonal_palette
          })
          return core_palette
        }

        globalThis.makeSchemeFromCorePalette = function (core_palette, type) {
          return Scheme[`${type}FromCorePalette`](core_palette)
        }

        globalThis.makeLightSchemeFromCorePalette = function (core_palette) {
          makeSchemeFromCorePalette(core_palette, 'light')
        }

        globalThis.makeDarkSchemeFromCorePalette = function (core_palette) {
          makeSchemeFromCorePalette(core_palette, 'dark')
        }

        globalThis.makeThemeFromColors = function (colors) {
          core_palette = makeCorePalette(colors)
          return {
            source: colors.primary,
            schemes: {
              light: makeLightSchemeFromCorePalette(core_palette),
              dark: makeDarkSchemeFromCorePalette(core_palette)
            },
            palettes: {
              primary: core_palette.a1,
              secondary: core_palette.a2,
              tertiary: core_palette.a3,
              neutral: core_palette.n1,
              neutralVariant: core_palette.n2,
              error: core_palette.error,
            },
          }
        }
      })()
    "
  end

  def make_theme_from_colors colors
    theme = @context.eval "
      makeThemeFromColors(#{colors.to_json})
    "
    theme.with_indifferent_access
  end

  def make_core_palette colors
    core_palette = @context.eval "
      makeCorePalette(#{colors.to_json})
    "
    core_palette.with_indifferent_access
  end

  def make_light_scheme_from_colors colors
    make_scheme_from_colors colors, :Light
  end

  def make_dark_scheme_from_colors colors
    make_scheme_from_colors colors, :Dark
  end

  def make_scheme_from_colors colors, type
    @context.eval "
      (function () {
        core_palette = makeCorePalette(#{colors.to_json})
        return make#{type}SchemeFromCorePalette(core_palette)
      })()
    "
  end

  def make_tonal_palette color
    @context.eval "
      makeTonalPalette(#{color})
    "
  end
end
