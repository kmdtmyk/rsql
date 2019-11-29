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
      SQLText.split(@sql).map do |query|
        begin
          if query.match? /insert[[:space:]]+into/i
            execute_insert(query)
          elsif query.match? /update/i
            execute_update(query)
          elsif query.match? /delete[[:space:]]+from/i
            execute_delete(query)
          else
            execute_query(query)
          end
        rescue => e
          {
            query: query,
            error: e.to_s,
          }
        end
      end
    end

    private

      def execute_query(query)
        result = ActiveRecord::Base.connection.exec_query(query)
        {
          query: query,
          columns: result.columns,
          rows: result.rows,
          count: result.rows.size,
        }
      end

      def execute_insert(query)
        {
          query: query,
          count: ActiveRecord::Base.connection.update(query),
        }
      end

      def execute_update(query)
        {
          query: query,
          count: ActiveRecord::Base.connection.update(query),
        }
      end

      def execute_delete(query)
        {
          query: query,
          count: ActiveRecord::Base.connection.delete(query),
        }
      end

  end
end
