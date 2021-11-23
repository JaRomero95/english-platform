class AddTimes < ActiveRecord::Migration[6.1]
  def change
    add_column :flash_cards, :times, :integer, default: 0
  end
end
