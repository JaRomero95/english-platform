class ApplicationController < ActionController::API
  def paginate(criteria)
    page = params.fetch(:page, 1)
    limit = params.fetch(:per_page, 10)

    page = 1 if page < 1

    offset = (page - 1) * limit

    criteria.limit(limit).offset(offset)
  end
end
