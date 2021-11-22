class FlashCardsController < ApplicationController
  def index
    flash_cards = paginate(FlashCard.all)

    render json: index_response(flash_cards)
  end
end
