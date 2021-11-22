class CreateFlashCards < ActiveRecord::Migration[6.1]
  def change
    create_table :flash_cards do |t|
      t.text :question_text
      t.string :question_img_url
      t.text :answer_text
      t.string :answer_img_url
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
