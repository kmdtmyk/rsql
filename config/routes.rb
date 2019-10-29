# frozen_string_literal: true

Rinfo::Engine.routes.draw do
  get 'tables' => 'info#tables'
end
