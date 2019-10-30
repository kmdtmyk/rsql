# frozen_string_literal: true

require_dependency 'rsql/application_controller'

module Rsql
  class RootController < ApplicationController

    def execute_sql
      result = ActiveRecord::Base.connection.exec_query(params[:sql])
      render json: {
        columns: result.columns,
        rows: result.rows,
      }
    rescue => e
      render json: {
        error: e.to_s
      }
    end

  end
end
