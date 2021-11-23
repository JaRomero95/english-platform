class DropFlashCardUserTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :flash_card_users
  end
end
