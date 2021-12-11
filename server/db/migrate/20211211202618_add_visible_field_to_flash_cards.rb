class AddVisibleFieldToFlashCards < ActiveRecord::Migration[6.1]
  def change
    add_column :flash_cards, :visible, :boolean, default: true
  end
end
