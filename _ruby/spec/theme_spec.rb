require_relative '../lib/material_color_utils'
require "active_support/core_ext/hash/indifferent_access"

RSpec.describe 'theme builder' do

  it 'creates valid theme given primary color' do
    runner = Runner.load
    colors = { primary: 6770852 }
    primary_color = colors[:primary]
    theme = runner.make_theme_from_colors colors
    light_scheme = runner.make_light_scheme_from_colors colors
    dark_scheme = runner.make_dark_scheme_from_colors colors
    primary_tonal_palette = runner.make_tonal_palette primary_color
    expect(theme[:source]).to eq primary_color
    expect(theme[:schemes][:light]).to eq light_scheme
    expect(theme[:schemes][:dark]).to eq dark_scheme
    expect(theme[:palettes][:primary]).to eq primary_tonal_palette
  end

  it 'creates core palette when primary and secondary colors are given' do
    runner = Runner.load
    colors = { primary: 6770852, secondary: 0 }
    core_palette = runner.make_core_palette colors
    tonal_palette = runner.make_tonal_palette colors[:secondary]
    expect(core_palette[:a2]).to eq tonal_palette
  end

  it 'use primary-based tonal palettes when not overwritten' do
    runner = Runner.load
    colors_with_secondary_color = { primary: 6770852, secondary: 0 }
    colors = { primary: 6770852 }
    primary_based_core_palette = runner.make_core_palette colors
    core_palette = runner.make_core_palette colors_with_secondary_color
    expect(primary_based_core_palette[:a3]).to eq core_palette[:a3]
  end

  it 'creates valid theme given primary and secondary color' do
    runner = Runner.load
    colors = { primary: 6770852, secondary: 0 }
    secondary_color = colors[:secondary]
    theme = runner.make_theme_from_colors colors
    core_palette = runner.make_core_palette colors
    light_scheme = runner.make_light_scheme_from_colors colors
    dark_scheme = runner.make_dark_scheme_from_colors colors
    secondary_tonal_palette = runner.make_tonal_palette secondary_color
    expect(theme[:schemes][:light]).to eq light_scheme
    expect(theme[:schemes][:dark]).to eq dark_scheme
    expect(theme[:palettes][:secondary]).to eq secondary_tonal_palette
  end

  xit 'creates theme with custom colors' do
    runner = Runner.load
    colors = { primary: 6770852, secondary: 0 }
    custom_colors = { custom1: 8570852, custom2: 2234801 }
    theme = runner.make_theme_from_colors colors, custom_colors
    custom_color = runner.make_custom_color custom_colors[:custom1]
    expect(theme[:customColors][:custom1]).to eq custom_color
  end
end
