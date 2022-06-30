Gem::Specification.new do |spec|
  spec.name        = "material_color_utils"
  spec.version     = "0.1.1"
  spec.authors     = ["Eden Landau"]
  spec.email       = ["edenworky@gmail.com"]
  spec.summary     = "material color utils ruby"

  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    Dir["{app,config,db,lib,static}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]
  end

  spec.test_files = Dir['spec/**/*']

  spec.add_dependency "mini_racer", "~> 0.6.2"
  spec.add_dependency "activesupport"
  spec.add_development_dependency "rspec"
end
