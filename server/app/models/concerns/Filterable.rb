# require "active_support/concern"

module Filterable
  extend ActiveSupport::Concern

  included do
  end

  class_methods do
    def filter(filters)
      scope = where(nil)

      filters.each do |key, value|
        filter_method = "filter_by_#{key}"

        scope = scope.public_send(filter_method, value)
      end

      scope
    end
  end
end
