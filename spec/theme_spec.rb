require_relative '../lib/material_color_utils'
require "active_support/core_ext/hash/indifferent_access"

RSpec::Matchers.define :be_color_hex do
  match do |actual|
    color_hex_regex = /\A#\h{6}\h{2}?\z/
    color_hex_regex.match? actual
  end
end

RSpec.describe 'theme builder' do
  let(:material3) { ThemeBuilder::Material3.load }

  it 'creates valid theme given primary color' do
    colors = { primary: 6770852 }
    theme = material3.make_theme_from_colors colors
    assert_valid_theme_for_colors theme, colors
  end

  it 'creates valid theme when primary and secondary colors are given' do
    colors = { primary: 6770852, secondary: 0 }
    theme = material3.make_theme_from_colors colors
    assert_valid_theme_for_colors theme, colors
  end

  def assert_valid_theme_for_colors theme, colors
    expect(theme[:source]).to be_color_hex
    expect(theme[:schemes][:light][:primary]).to be_color_hex
    expect(theme[:schemes][:light][:on_primary]).to be_color_hex
    expect(theme[:schemes][:dark][:primary]).to be_color_hex
    expect(theme[:schemes][:dark][:on_primary]).to be_color_hex
    expect(theme[:palettes][:primary][0]).to be_color_hex
    expect(theme[:palettes][:secondary][10]).to be_color_hex
  end

  it 'use primary-based tonal palettes when not overwritten' do
    colors_with_secondary_color = { primary: 6770852, secondary: 0 }
    colors = { primary: 6770852 }
    themeWithSecondary = material3.make_theme_from_colors colors_with_secondary_color
    theme = material3.make_theme_from_colors colors
    primary_based_palettes = theme[:palettes]
    primary_and_secondary_palettes = themeWithSecondary[:palettes]
    expect(primary_based_palettes[:tertiary]).to eq primary_and_secondary_palettes[:tertiary]
  end

  it 'can create theme given argb or hex colors' do
    argbColors = { primary: 6770852, secondary: 0 }
    hexColors = { primary: '#006750a4', secondary: '#00000000' }
    themeFromArgb = material3.make_theme_from_colors(argbColors)
    themeFromHex = material3.make_theme_from_colors(hexColors)
    expect(themeFromArgb).to eq themeFromHex
  end

  xit 'creates theme with custom colors' do
    colors = { primary: 6770852, secondary: 0 }
    custom_colors = { custom1: 8570852, custom2: 2234801 }
    theme = material3.make_theme_from_colors colors, custom_colors
    custom_color = material3.make_custom_color custom_colors[:custom1]
    expect(theme[:customColors][:custom1]).to eq custom_color
  end
end
