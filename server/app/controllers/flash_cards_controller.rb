class FlashCardsController < ApplicationController
  before_action :authenticate!

  def index
    criteria = FlashCard.filter.where(user: current_user).order(times: :asc)
    flash_cards = paginate(criteria)

    render json: index_response(flash_cards)
  end

  def update
    flash_card = FlashCard.find_by(
      id: params[:id],
      user: current_user
    )

    flash_card.times += 1 # FIXME: concurrency

    flash_card.save!

    render json: flash_card
  end

  private

  def filter_params
    params.fetch(:filter, {}).permit(:flash_card_category_ids)
  end
end
