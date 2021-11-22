require "test_helper"

class FlashCardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @flash_card = flash_cards(:one)
  end

  test "should get index" do
    get flash_cards_url, as: :json
    assert_response :success
  end

  test "should create flash_card" do
    assert_difference('FlashCard.count') do
      post flash_cards_url, params: { flash_card: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show flash_card" do
    get flash_card_url(@flash_card), as: :json
    assert_response :success
  end

  test "should update flash_card" do
    patch flash_card_url(@flash_card), params: { flash_card: {  } }, as: :json
    assert_response 200
  end

  test "should destroy flash_card" do
    assert_difference('FlashCard.count', -1) do
      delete flash_card_url(@flash_card), as: :json
    end

    assert_response 204
  end
end
