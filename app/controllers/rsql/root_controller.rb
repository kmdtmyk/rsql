# frozen_string_literal: true

require_dependency 'rsql/application_controller'

module Rsql
  class RootController < ApplicationController

    def execute_sql
      render json: Query.execute(params[:sql])
    end

  end
end
