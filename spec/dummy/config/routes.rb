# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rsql::Engine => '/rails/info'
end
