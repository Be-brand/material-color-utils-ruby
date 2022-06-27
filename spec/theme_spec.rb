require_relative '../lib/runner'
require "active_support/core_ext/hash/indifferent_access"

RSpec.describe 'theme builder' do

  it 'valid theme with defaults' do
    runner = Runner.load
    primary_color = 66770852
    theme = runner.make_theme primary_color
    light_scheme = runner.make_light_scheme primary_color
    dark_scheme = runner.make_dark_scheme primary_color
    primary_palette = runner.make_palette(primary_color).with_indifferent_access
    expect(theme[:source]).to eq primary_color
    expect(theme[:schemes][:light]).to eq light_scheme
    expect(theme[:schemes][:dark]).to eq dark_scheme
    expect(theme[:palettes][:primary]).to eq primary_palette[:a1]
  end

  xit 'creates theme when primary color is given' do
    runner = Runner.load
    primary = 6770852
    theme = runner.make_theme primary
    expect(theme.source).to eq primary
  end
end
