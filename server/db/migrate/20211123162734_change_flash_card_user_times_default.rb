class ChangeFlashCardUserTimesDefault < ActiveRecord::Migration[6.1]
  def change
    add_column :flash_cards, :times, :integer, 0
  end
end
