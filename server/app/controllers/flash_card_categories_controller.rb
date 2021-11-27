class FlashCardCategoriesController < ApplicationController
  before_action :authenticate!
  before_action :set_flash_card_category, only: %i[show update destroy]

  # GET /flash_card_categories
  def index
    flash_card_categories = paginate(FlashCardCategory.where(user: current_user))

    render json: index_response(flash_card_categories)
  end

  # GET /flash_card_categories/1
  def show
    render json: @flash_card_category
  end

  # POST /flash_card_categories
  def create
    @flash_card_category = FlashCardCategory.new(flash_card_category_params)

    if @flash_card_category.save
      render json: @flash_card_category, status: :created, location: @flash_card_category
    else
      render json: @flash_card_category.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /flash_card_categories/1
  def update
    if @flash_card_category.update(flash_card_category_params)
      render json: @flash_card_category
    else
      render json: @flash_card_category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /flash_card_categories/1
  def destroy
    @flash_card_category.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_flash_card_category
    @flash_card_category = FlashCardCategory.find_by(id: params[:id], user: current_user)
  end

  # Only allow a list of trusted parameters through.
  def flash_card_category_params
    params.require(:flash_card_category).permit(:user_id, :name)
  end
end
