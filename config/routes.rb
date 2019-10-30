# frozen_string_literal: true

Rsql::Engine.routes.draw do
  root 'root#index'
  post '/' => 'root#execute_sql'
end
