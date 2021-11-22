class IrregularVerbsController < ApplicationController
  before_action :authenticate!

  def index
    irregular_verbs = IrregularVerb.all.order(Arel.sql('random()'))
    irregular_verbs = paginate(irregular_verbs)

    render json: index_response(irregular_verbs)
  end
end
