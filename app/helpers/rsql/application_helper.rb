# frozen_string_literal: true

module Rsql
  module ApplicationHelper

    def dummy_app?
      Rails.app_class.to_s.start_with? 'Dummy'
    end

    def webpack_javascript_tag(name)
      if dummy_app?
        name += '.dev'
      end
      javascript_include_tag "rsql/#{name}"
    end

  end
end
