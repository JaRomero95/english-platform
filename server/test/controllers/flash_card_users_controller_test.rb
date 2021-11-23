require "test_helper"

class FlashCardUsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @flash_card_user = flash_card_users(:one)
  end

  test "should get index" do
    get flash_card_users_url, as: :json
    assert_response :success
  end

  test "should create flash_card_user" do
    assert_difference('FlashCardUser.count') do
      post flash_card_users_url, params: { flash_card_user: { flash_card_id: @flash_card_user.flash_card_id, times: @flash_card_user.times, user_id: @flash_card_user.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show flash_card_user" do
    get flash_card_user_url(@flash_card_user), as: :json
    assert_response :success
  end

  test "should update flash_card_user" do
    patch flash_card_user_url(@flash_card_user), params: { flash_card_user: { flash_card_id: @flash_card_user.flash_card_id, times: @flash_card_user.times, user_id: @flash_card_user.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy flash_card_user" do
    assert_difference('FlashCardUser.count', -1) do
      delete flash_card_user_url(@flash_card_user), as: :json
    end

    assert_response 204
  end
end
