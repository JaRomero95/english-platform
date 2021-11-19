class CreateIrregularVerbUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :irregular_verb_users do |t|
      t.references :user, null: false, foreign_key: true
      t.references :irregular_verb, null: false, foreign_key: true
      t.integer :answers
      t.integer :correct_answers
      t.integer :wrong_answers
      t.datetime :last_answer_datetime
      t.string :last_answer_result

      t.timestamps
    end
  end
end
