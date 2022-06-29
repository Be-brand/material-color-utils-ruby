require 'mini_racer'
require 'active_support/core_ext/hash/indifferent_access'
require 'active_support/core_ext/hash/except'

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

  def make_theme colors
    theme = @context.eval"themeFromSourceColor(#{colors[:primary]})"
    theme.with_indifferent_access
  end

  def make_theme_from_core_palette core_palette
    light_scheme = make_light_scheme_from_core_palette core_palette
    dark_scheme = make_dark_scheme_from_core_palette core_palette
    @context.eval "
      (function () {
        return {
          source,
          schemes: {
            light: #{light_scheme},
            dark: #{dark_scheme},
          },
          palettes: #{core_palette.to_json},
        }
      })()
    "
  end

  def make_core_palette source_colors
    core_palette = instantiate_core_palette source_colors[:primary]
    palette_colors = {
      primary: :a1,
      secondary: :a2,
      tertiary: :a3,
      background: :n1,
      outline: :n2,
    }
    palette_colors.except(:primary).each do |(name, key)|
      next unless source_colors.key? name
      tonal_palette = make_tonal_palette source_colors[name]
      core_palette[key] = tonal_palette
    end
    core_palette
  end

  def instantiate_core_palette *args
    core_palette = @context.eval "new CorePalette(...#{args})"
    core_palette.with_indifferent_access
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

  def make_light_scheme_from_core_palette core_palette
    make_scheme_from_core_palette core_palette, :light
  end

  def make_dark_scheme_from_core_palette core_palette
    make_scheme_from_core_palette core_palette, :dark
  end

  def make_scheme_from_core_palette core_palette, type
    @context.eval "
      (function () {
        return Scheme.#{type}FromCorePalette(#{core_palette.to_json})
      })()
    "
  end


  def make_tonal_palette color
  @context.eval "
    TonalPalette.fromInt(#{color})
  "
  end


end
