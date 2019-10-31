# frozen_string_literal: true

require 'rails_helper'

module Rsql
  RSpec.describe Query do

    describe 'execute' do

      example 'select' do
        Book.create
        result = Query.execute('select * from books')
        expect(result[:columns]).to eq Book.attribute_names
        expect(result[:rows].size).to eq 1
      end

      example 'syntax error' do
        result = Query.execute('invalid sql')
        expect(result[:error]).not_to eq nil
      end

    end

  end
end
