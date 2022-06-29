require_relative '../lib/runner'
require "active_support/core_ext/hash/indifferent_access"

RSpec.describe 'theme builder' do

  it 'valid theme with defaults' do
    runner = Runner.load
    colors = { primary: 6770852 }
    primary_color = colors[:primary]
    theme = runner.make_theme colors
    light_scheme = runner.make_light_scheme primary_color
    dark_scheme = runner.make_dark_scheme primary_color
    primary_palette = runner.make_core_palette colors
    expect(theme[:source]).to eq primary_color
    expect(theme[:schemes][:light]).to eq light_scheme
    expect(theme[:schemes][:dark]).to eq dark_scheme
    expect(theme[:palettes][:primary]).to eq primary_palette[:a1]
  end

  it 'creates core palette when primary and secondary colors are given' do
    runner = Runner.load
    colors = { primary: 6770852, secondary: 6770111 }
    core_palette = runner.make_core_palette colors
    tonal_palette = runner.make_tonal_palette colors[:secondary]
    expect(core_palette[:a2]).to eq tonal_palette
  end

  it 'use primary-based tonal palettes when not overwritten' do
    runner = Runner.load
    colors = { primary: 6770852, secondary: 6770111 }
    primary_based_core_palette = runner.instantiate_core_palette colors[:primary]
    core_palette = runner.make_core_palette colors
    expect(primary_based_core_palette[:a3]).to eq core_palette[:a3]
  end

  it 'creates valid theme from core palette' do
    runner = Runner.load
    colors = { primary: 6770852, secondary: 6770111 }
    primary_color = colors[:primary]
    core_palette = runner.make_core_palette colors
    theme = runner.make_theme_from_core_palette core_palette
    light_scheme = runner.make_light_scheme_from_core_palette core_palette
    dark_scheme = runner.make_dark_scheme_from_core_palette core_palette
    expect(theme[:source]).to eq primary_color
    expect(theme[:schemes][:light]).to eq light_scheme
    expect(theme[:schemes][:dark]).to eq dark_scheme
    expect(theme[:palettes]).to eq core_palette
  end
end
