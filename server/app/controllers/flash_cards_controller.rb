class FlashCardsController < ApplicationController
  before_action :authenticate!

  def index
    arel = FlashCard.arel_table

    criteria = FlashCard.filter(filter_params).where(user: current_user)

    criteria = if order_field.present?
                 criteria.order(
                   arel[order_field].send(order_dir)
                 )
               else
                 criteria.order(
                   arel[:last_answer_datetime].asc.nulls_first,
                   arel[:created_at].desc
                 )
               end

    flash_cards = paginate(criteria)

    render json: index_response(flash_cards)
  end

  def create
    @flash_card = FlashCard.new(
      create_params.merge(user: current_user)
    )

    flash_cards = FlashCard.where(user: current_user, visible: true)
    min_date = flash_cards.minimum(:last_answer_datetime) - 1.minutes
    max_date = flash_cards.maximum(:last_answer_datetime) + 1.minutes
    @flash_card.last_answer_datetime = rand(min_date..max_date)

    if @flash_card.save
      render json: show_response(@flash_card), status: :created, location: @flash_card
    else
      render json: @flash_card.errors, status: :unprocessable_entity
    end
  end

  def update
    flash_card = FlashCard.find_by(
      id: params[:id],
      user: current_user
    )

    if flash_card.update update_params
      render json: show_response(flash_card), status: :created, location: flash_card
    else
      render json: flash_card.errors, status: :unprocessable_entity
    end
  end

  private

  def order_field
    params.fetch(:order_field, nil)
  end

  def order_dir
    params.fetch(:order_dir, :asc)
  end

  def filter_params
    params.permit(:visible, :question_text, :answer_text, flash_card_category_ids: [])
  end

  def create_params
    editable_params
  end

  def update_params
    editable_params
  end

  def editable_params
    params.require(:data).permit(
      :visible,
      :question_text,
      :question_img_url,
      :question_font_scale_percent,
      :answer_text,
      :answer_img_url,
      :answer_font_scale_percent,
      :flash_card_category_id,
      :last_answer_datetime
    )
  end
end
