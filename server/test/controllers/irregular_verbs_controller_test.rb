require "test_helper"

class IrregularVerbsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @irregular_verb = irregular_verbs(:one)
  end

  test "should get index" do
    get irregular_verbs_url, as: :json
    assert_response :success
  end

  test "should create irregular_verb" do
    assert_difference('IrregularVerb.count') do
      post irregular_verbs_url, params: { irregular_verb: { base: @irregular_verb.base, past_participle: @irregular_verb.past_participle, past_tense: @irregular_verb.past_tense } }, as: :json
    end

    assert_response 201
  end

  test "should show irregular_verb" do
    get irregular_verb_url(@irregular_verb), as: :json
    assert_response :success
  end

  test "should update irregular_verb" do
    patch irregular_verb_url(@irregular_verb), params: { irregular_verb: { base: @irregular_verb.base, past_participle: @irregular_verb.past_participle, past_tense: @irregular_verb.past_tense } }, as: :json
    assert_response 200
  end

  test "should destroy irregular_verb" do
    assert_difference('IrregularVerb.count', -1) do
      delete irregular_verb_url(@irregular_verb), as: :json
    end

    assert_response 204
  end
end
