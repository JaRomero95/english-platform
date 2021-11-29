# require "active_support/concern"

module Filterable
  extend ActiveSupport::Concern

  included do
  end

  class_methods do
    def filter(_filters)
      scope = where(nil)

      filtering_params.each do |key, value|
        filter_method = "filter_by_#{key}"

        next unless respond_to?(filter_method)

        scope = scope.public_send(filter_method, value)
      end

      scope
    end
  end
end
