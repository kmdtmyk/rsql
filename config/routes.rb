# frozen_string_literal: true

Rsql::Engine.routes.draw do
  get 'sql' => 'info#sql'
  post 'sql' => 'info#execute_sql'
end
