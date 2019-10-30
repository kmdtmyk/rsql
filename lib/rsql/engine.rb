# frozen_string_literal: true

require 'slim'

module Rsql
  class Engine < ::Rails::Engine
    isolate_namespace Rsql

    initializer 'rsql.assets.precompile' do |app|
      app.config.assets.precompile += ['rsql/*.js']
    end

  end
end
