# frozen_string_literal: true

require 'rails_helper'

module Rsql
  RSpec.describe Query do

    describe 'execute' do

      describe 'select' do

        before do
          Book.create(id: 1)
          Book.create(id: 2)
          Book.create(id: 3)
        end

        example 'select' do
          result = Query.execute('select * from books')
          expect(result[:columns]).to eq Book.attribute_names
          expect(result[:rows].size).to eq 3
          expect(result[:count]).to eq 3
        end

        example '1 record' do
          result = Query.execute('select * from books where id = 1')
          expect(result[:columns]).to eq Book.attribute_names
          expect(result[:rows].size).to eq 1
          expect(result[:count]).to eq 1
        end

      end

      describe 'insert' do

        example 'ignore case' do
          sql = "InSeRt InTo books (created_at, updated_at) values ('2019-10-15', '2019-10-15')"
          result = Query.execute(sql)
          expect(result[:count]).to eq 1
        end

        example 'separated by space' do
          sql = "insert \r\n \t into books (created_at, updated_at) values ('2019-10-15', '2019-10-15')"
          result = Query.execute(sql)
          expect(result[:count]).to eq 1
        end

      end

      describe 'update' do

        before do
          Book.create(id: 1)
          Book.create(id: 2)
          Book.create(id: 3)
        end

        example 'ignore case' do
          sql = "UpDaTe books set name = 'new name'"
          result = Query.execute(sql)
          expect(result[:count]).to eq 3
        end

        example '1 record' do
          sql = "update books set name = 'book1' where id = 1"
          result = Query.execute(sql)
          expect(result[:count]).to eq 1
        end

      end

      describe 'delete' do

        before do
          Book.create(id: 1)
          Book.create(id: 2)
          Book.create(id: 3)
        end

        example 'ignore case' do
          sql = "DeLeTe from books"
          result = Query.execute(sql)
          expect(result[:count]).to eq 3
        end

        example 'separated by space' do
          sql = "delete \r\n \t from books"
          result = Query.execute(sql)
          expect(result[:count]).to eq 3
        end

        example '1 record' do
          sql = "delete from books where id = 1"
          result = Query.execute(sql)
          expect(result[:count]).to eq 1
        end

      end

      example 'syntax error' do
        result = Query.execute('invalid sql')
        expect(result[:error]).not_to eq nil
      end

    end

  end
end
