class ApplicationController < ActionController::API
  include Authenticable

  def index_response(elements)
    { data: elements, meta: pagination_info(elements) }
  end

  def pagination_info(elements)
    {
      page: params.fetch(:page, 1).to_i,
      per_page: params.fetch(:per_page, 10).to_i,
      total_elements: elements.size
    }
  end

  def paginate(criteria)
    page = params.fetch(:page, 1).to_i
    limit = params.fetch(:per_page, 10).to_i

    page = 1 if page < 1

    offset = (page - 1) * limit

    criteria.limit(limit).offset(offset)
  end
end
