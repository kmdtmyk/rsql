# frozen_string_literal: true

require 'rails_helper'

module Rsql
  RSpec.describe SQLText do

    describe 'split' do

      example '1 query' do
        text = "select * from table1"
        expect(SQLText.split(text)).to eq [text]
      end

      example '2 queries' do
        text = <<~EOS
        select * from table1;
        select * from table2
        EOS
        expect(SQLText.split(text)).to eq ["select * from table1;", "\nselect * from table2\n"]
      end

      example '-- comment' do
        text = <<~EOS
        select * from table1;
        --;
        select * from table2
        EOS
        expect(SQLText.split(text)).to eq ["select * from table1;", "\n--;\nselect * from table2\n"]
      end

      example '/* comment */' do
        text = <<~EOS
        select * from table1;
        /* ; */
        select * from table2
        EOS
        expect(SQLText.split(text)).to eq ["select * from table1;", "\n/* ; */\nselect * from table2\n"]
      end

      example 'semicolon in string literal' do
        text = "select ' comment; ''this is comment;'' '"
        expect(SQLText.split(text)).to eq [text]
      end

      example '-- comment in string literal' do
        text = "select '--';select 1"
        expect(SQLText.split(text)).to eq ["select '--';", "select 1"]
      end

      example '/* comment in string literal' do
        text = "select '/*';select 1"
        expect(SQLText.split(text)).to eq ["select '/*';", "select 1"]
      end

      example 'last space' do
        text = "select * from table1; \t \n "
        expect(SQLText.split(text)).to eq ["select * from table1;", " \t \n "]
      end

    end

  end
end
