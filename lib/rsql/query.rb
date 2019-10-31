# frozen_string_literal: true

module Rsql
  class Query

    def self.execute(sql)
      new(sql).result
    end

    def initialize(sql)
      @sql = sql
    end

    def result
      result = ActiveRecord::Base.connection.exec_query(@sql)
      {
        columns: result.columns,
        rows: result.rows,
      }
    rescue => e
      {
        error: e.to_s
      }
    end

  end
end
