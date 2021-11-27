require "test_helper"

class FlashCardCategoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @flash_card_category = flash_card_categories(:one)
  end

  test "should get index" do
    get flash_card_categories_url, as: :json
    assert_response :success
  end

  test "should create flash_card_category" do
    assert_difference('FlashCardCategory.count') do
      post flash_card_categories_url, params: { flash_card_category: { name: @flash_card_category.name, user_id: @flash_card_category.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show flash_card_category" do
    get flash_card_category_url(@flash_card_category), as: :json
    assert_response :success
  end

  test "should update flash_card_category" do
    patch flash_card_category_url(@flash_card_category), params: { flash_card_category: { name: @flash_card_category.name, user_id: @flash_card_category.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy flash_card_category" do
    assert_difference('FlashCardCategory.count', -1) do
      delete flash_card_category_url(@flash_card_category), as: :json
    end

    assert_response 204
  end
end
