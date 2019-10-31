# frozen_string_literal: true

module Rsql
  class Query

    def self.execute(sql)
      new(sql).execute
    end

    def initialize(sql)
      @sql = sql
    end

    def execute
      if @sql.match? /insert[[:space:]]+into/i
        execute_insert
      elsif @sql.match? /update/i
        execute_update
      elsif @sql.match? /delete[[:space:]]+from/i
        execute_delete
      else
        execute_query
      end
    rescue => e
      {
        error: e.to_s
      }
    end

    private

      def execute_query
        result = ActiveRecord::Base.connection.exec_query(@sql)
        {
          columns: result.columns,
          rows: result.rows,
          count: result.rows.size,
        }
      end

      def execute_insert
        {
          count: ActiveRecord::Base.connection.update(@sql),
        }
      end

      def execute_update
        {
          count: ActiveRecord::Base.connection.update(@sql),
        }
      end

      def execute_delete
        {
          count: ActiveRecord::Base.connection.delete(@sql),
        }
      end

  end
end
