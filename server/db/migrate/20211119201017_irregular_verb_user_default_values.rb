class IrregularVerbUserDefaultValues < ActiveRecord::Migration[6.1]
  def change
    change_column_default :irregular_verb_users, :answers, 0
    change_column_default :irregular_verb_users, :correct_answers, 0
    change_column_default :irregular_verb_users, :wrong_answers, 0
  end
end
