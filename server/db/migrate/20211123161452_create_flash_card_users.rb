class CreateFlashCardUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :flash_card_users do |t|
      t.references :user, null: false, foreign_key: true
      t.references :flash_card, null: false, foreign_key: true
      t.integer :times

      t.timestamps
    end
  end
end
