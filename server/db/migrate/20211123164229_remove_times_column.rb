class RemoveTimesColumn < ActiveRecord::Migration[6.1]
  def change
    remove_column :flash_card_users, :times
  end
end
