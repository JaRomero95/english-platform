class RemoveTimesFromFlashCards < ActiveRecord::Migration[6.1]
  def change
    remove_column :flash_cards, :times
    add_column :flash_cards, :last_answer_datetime, :datetime
  end
end
