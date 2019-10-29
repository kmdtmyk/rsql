# frozen_string_literal: true

require 'slim'

module Rinfo
  class Engine < ::Rails::Engine
    isolate_namespace Rinfo
  end
end
