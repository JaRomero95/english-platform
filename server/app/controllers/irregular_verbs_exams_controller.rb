class IrregularVerbsExamsController < ApplicationController
  before_action :authenticate!

  def create
    irregular_verbs_results = irregular_verbs_exam_params

    process_results(irregular_verbs_results)

    render json: irregular_verbs_exam_params
  end

  private

  def process_results(irregular_verbs_results)
    irregular_verbs_results.each(&method(:process_result))
  end

  def process_result(irregular_verb_result)
    id = irregular_verb_result[:id]
    result = irregular_verb_result[:result]
    datetime = Time.zone.now

    irregular_verb_user = IrregularVerbUser.find_or_initialize_by(
      user: current_user,
      irregular_verb_id: id
    )

    irregular_verb_user.assign_attributes(
      answers: irregular_verb_user.answers + 1, # FIXME: CONCURRENCY PROBLEM
      last_answer_datetime: datetime,
      last_answer_result: result
    )

    if result
      irregular_verb_user.correct_answers += 1
    else
      irregular_verb_user.wrong_answers += 1
    end

    irregular_verb_user.save!
  end

  def irregular_verbs_exam_params
    params.require(:data)
  end
end
