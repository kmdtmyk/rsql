# frozen_string_literal: true

require 'slim'

module Rinfo
  class Engine < ::Rails::Engine
    isolate_namespace Rinfo

    initializer 'rinfo.assets.precompile' do |app|
      app.config.assets.precompile += ['rinfo/*.js']
    end

  end
end
