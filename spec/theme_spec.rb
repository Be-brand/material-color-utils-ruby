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
    theme = material3.build colors
    assert_valid_theme_for_colors theme
  end

  it 'creates valid theme when primary and secondary colors are given' do
    colors = { primary: 6770852, secondary: 0 }
    theme = material3.build colors
    assert_valid_theme_for_colors theme
  end

  it 'use primary-based tonal palettes when not overwritten' do
    colors_with_secondary_color = { primary: 6770852, secondary: 0 }
    colors = { primary: 6770852 }
    themeWithSecondary = material3.build colors_with_secondary_color
    theme = material3.build colors
    primary_based_palettes = theme[:palettes]
    primary_and_secondary_palettes = themeWithSecondary[:palettes]
    expect(primary_based_palettes[:tertiary]).to eq primary_and_secondary_palettes[:tertiary]
  end

  it 'can create theme given argb or hex colors' do
    argbColors = { primary: 6770852, secondary: 0 }
    hexColors = { primary: '#6750a4', secondary: '#000000' }
    themeFromArgb = material3.build(argbColors)
    themeFromHex = material3.build(hexColors)
    expect(themeFromArgb).to eq themeFromHex
  end

  it 'returns the same color scheme given 4 hex colors' do
    hexColors = { primary: '#6750a4', secondary: '#958da5',
      tertiary: '#b58392', neutral: '#939094'}
    color_scheme = material3.perfect_color_scheme(hexColors)
    expect(color_scheme).to eq hexColors.with_indifferent_access
  end

  it 'returns the color scheme in hex given argb colors' do
    argbColors = { primary: 6770852, secondary: 0,
      tertiary: 8570852, neutral: 2234801 }
    color_scheme = material3.perfect_color_scheme(argbColors)
    assert_valid_color_scheme color_scheme
  end

  it 'returns the color scheme based on primary color' do
    hexColors = { primary: '#6750a4' }
    hexColors.with_indifferent_access
    color_scheme = material3.perfect_color_scheme(hexColors)
    expect(color_scheme[:primary]).to eq hexColors[:primary]
    assert_valid_color_scheme color_scheme
  end

  it 'returns the color scheme based on primary and secondary colors' do
    colors = { primary: '#6750a4', secondary: '#55a300' }
    colors.with_indifferent_access
    color_scheme = material3.perfect_color_scheme(colors)
    expect(color_scheme[:primary]).to eq colors[:primary]
    expect(color_scheme[:secondary]).to eq colors[:secondary]
    assert_valid_color_scheme color_scheme
  end

  it 'build theme from perfected color scheme' do
    colors = { primary: 0, neutral: 1 }
    color_scheme = material3.perfect_color_scheme(colors)
    theme = material3.build(color_scheme)
    assert_valid_theme_for_colors theme
  end

  def assert_valid_color_scheme color_scheme
    expect(color_scheme[:primary]).to be_color_hex
    expect(color_scheme[:secondary]).to be_color_hex
    expect(color_scheme[:tertiary]).to be_color_hex
    expect(color_scheme[:neutral]).to be_color_hex
  end

  def assert_valid_theme_for_colors theme
    expect(theme[:source]).to be_color_hex
    expect(theme[:schemes][:light][:primary]).to be_color_hex
    expect(theme[:schemes][:light][:on_primary]).to be_color_hex
    expect(theme[:schemes][:dark][:primary]).to be_color_hex
    expect(theme[:schemes][:dark][:on_primary]).to be_color_hex
    expect(theme[:palettes][:primary][0]).to be_color_hex
    expect(theme[:palettes][:secondary][10]).to be_color_hex
  end
end
