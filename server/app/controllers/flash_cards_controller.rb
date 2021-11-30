class FlashCardsController < ApplicationController
  before_action :authenticate!

  def index
    criteria = FlashCard.filter(filter_params)
                        .where(user: current_user)
                        .order(last_answer_datetime: :asc, created_at: :asc)

    flash_cards = paginate(criteria)

    render json: index_response(flash_cards)
  end

  def update
    flash_card = FlashCard.find_by(
      id: params[:id],
      user: current_user
    )

    flash_card.update! last_answer_datetime: Time.zone.now

    render json: flash_card
  end

  private

  def filter_params
    params.permit(flash_card_category_ids: [])
  end
end
