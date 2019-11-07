# frozen_string_literal: true

module Rsql
  class SQLText

    def self.split(text)
      new(text).split
    end

    def initialize(text)
      @text = text
    end

    def split
      positions = split_positions

      if positions.empty?
        return [@text]
      end

      result = positions.map.with_index do |position, index|
        if index == 0
          start = 0
        else
          start = positions[index]
        end
        @text[start...position]
      end

      result << @text[positions.last..-1]

      result
    end

    private

      def split_positions

        result = []
        lineComment = false
        commentLevel = 0
        stringLiteral = false

        skip_next = false
        (0 ... @text.size).each do |index|
          if skip_next
            skip_next = false
            next
          end

          char1 = @text[index]
          char2 = @text.slice(index, 2)

          if char2 == '--'
            skip_next = true
            unless stringLiteral
              lineComment = true
            end
          elsif char2 == '/*'
            skip_next = true
            unless stringLiteral
              commentLevel = commentLevel + 1
            end
          elsif char2 == '*/'
            skip_next = true
            unless stringLiteral
              commentLevel = commentLevel - 1
            end
          elsif char1 == "'"
            if lineComment == false && commentLevel == 0
              stringLiteral = !stringLiteral
            end
          elsif char1 == "\n"
            lineComment = false
          elsif char1 == ';'
            if lineComment == false && commentLevel == 0 && stringLiteral == false
              result << index + 1
            end
          end
        end

        result
      end

  end
end
