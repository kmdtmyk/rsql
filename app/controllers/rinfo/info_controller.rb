# frozen_string_literal: true

require_dependency 'rinfo/application_controller'

module Rinfo
  class InfoController < ApplicationController

    def tables
      render plain: 'tables'
    end

  end
end
