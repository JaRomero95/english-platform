class CreateIrregularVerbs < ActiveRecord::Migration[6.1]
  def change
    create_table :irregular_verbs do |t|
      t.string :base
      t.string :past_tense
      t.string :past_participle

      t.timestamps
    end
  end
end
