require 'mini_racer'
require 'active_support/core_ext/hash/indifferent_access'
require 'active_support/core_ext/hash/except'
require 'active_support/core_ext/string/inflections'

module ThemeBuilder
  class Material3
    def self.load
      context = MiniRacer::Context.new
      context.eval 'let global = globalThis'
      context.eval File.read(File.join(File.dirname(__FILE__),'../static/system.min.js'))
      context.eval File.read(File.join(File.dirname(__FILE__),'../static/named-register.js'))
      context.eval File.read(File.join(File.dirname(__FILE__),'../static/dist.js'))
      runner = self.new context
      runner.load_index
      runner.load_custom_code
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

    def load_custom_code
      @context.eval "
        (async function () {
          globalThis.isInt = function (value) {
            return value === parseInt(value, 10)
          }

          globalThis.convertHexToArgb = function (hex) {
            return parseInt(hex.slice(1), 16)
          }

          globalThis.convertColorsObjectValuesToArgb = function (colors) {
            return Object.entries(colors).reduce((acc, [name, value]) => ({ ...acc, [name]: isInt(value) ? value : convertHexToArgb(value) }), {})
          }

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
            return makeSchemeFromCorePalette(core_palette, 'light')
          }

          globalThis.makeDarkSchemeFromCorePalette = function (core_palette) {
            return makeSchemeFromCorePalette(core_palette, 'dark')
          }

          globalThis.convertTonalPaletteToHex = function (tonal_palette) {
            tonal_numbers = [100, 99, 98, 95, 90, 80, 70, 60, 50, 40, 35, 30, 25, 20, 10, 0]
            return tonal_numbers.reduce((acc, tonal_number) => ({...acc, [tonal_number]: hexFromArgb(tonal_palette.tone(tonal_number))}), {})
          }

          globalThis.convertThemeColorsToHex = function (theme) {
            return {
              source: hexFromArgb(theme.source),
              schemes: {
                light: Object.entries(theme.schemes.light.props).reduce((acc, [name, value]) => ({ ...acc, [name]: hexFromArgb(value) }), {}),
                dark: Object.entries(theme.schemes.dark.props).reduce((acc, [name, value]) => ({ ...acc, [name]: hexFromArgb(value) }), {}),
              },
              palettes: Object.entries(theme.palettes).reduce((acc, [name, value]) => ({ ...acc, [name]: convertTonalPaletteToHex(value) }), {}),
            }
          }

          globalThis.makeThemeFromColors = function (colors) {
            argbColors = convertColorsObjectValuesToArgb(colors)
            core_palette = makeCorePalette(argbColors)
            theme = {
              source: argbColors.primary,
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
            return convertThemeColorsToHex(theme)
          }

          globalThis.perfectColorScheme = function (colors) {
            color_scheme = convertColorsObjectValuesToArgb(colors)
            core_palette = new CorePalette(color_scheme.primary)
            palette_colors = {
              secondary: 'a2',
              tertiary: 'a3',
              neutral: 'n1'
            }
            Object.entries(palette_colors).forEach(([name, value]) => {
              if(!color_scheme[name])
                color_scheme[name] = core_palette[value].tone(60)
            })
            color_scheme = Object.entries(color_scheme)
              .reduce((acc, [name, value]) =>
                ({ ...acc, [name]: hexFromArgb(value) }), {})
            return color_scheme
          }
        })()
      "
    end

    def build colors
      theme = @context.eval "
        makeThemeFromColors(#{colors.to_json})
      "
      theme = theme.with_indifferent_access.deep_transform_keys { |key| key.underscore }
      theme[:palettes] = theme[:palettes].transform_values { |value| value.transform_keys { |key| key.to_i } }
      return theme
    end

    def perfect_color_scheme colors
      color_palette = @context.eval "
        perfectColorScheme(#{colors.to_json})
      "
      color_palette.with_indifferent_access
    end
  end
end
