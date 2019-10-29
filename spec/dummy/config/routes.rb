# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rinfo::Engine => '/rails/info'
end
