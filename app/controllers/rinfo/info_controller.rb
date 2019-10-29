# frozen_string_literal: true

require_dependency 'rinfo/application_controller'

module Rinfo
  class InfoController < ApplicationController

    def tables
      internal_tables = %w(
        schema_migrations
        ar_internal_metadata
        active_storage_attachments
        active_storage_blobs
      )
      table_names = ActiveRecord::Base.connection.tables - internal_tables
      @models = table_names.map do |table_name|
        table_name.classify.constantize
      end
    end

    def execute_sql
      result = ActiveRecord::Base.connection.exec_query(params[:sql])
      render json: {
        columns: result.columns,
        rows: result.rows,
      }
    end

  end
end
