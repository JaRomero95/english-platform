class ApplicationController < ActionController::API
  include Authenticable

  def index_response(elements)
    { data: elements, meta: pagination_info(elements) }
  end

  def show_response(element)
    { data: element }
  end

  def pagination_info(elements)
    {
      page: page,
      per_page: per_page.zero? ? elements.length : per_page,
      total_elements: @total_elements
    }
  end

  def paginate(criteria)
    @total_elements = criteria.count

    return criteria if per_page.zero?

    selected_page = page.positive? ? page : 1

    offset = (selected_page - 1) * per_page

    criteria.limit(per_page).offset(offset)
  end

  def per_page
    @per_page ||= params.fetch(:per_page, 10).to_i
  end

  def page
    @page ||= params.fetch(:page, 1).to_i
  end
end
