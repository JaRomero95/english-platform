class AddFlashCardCategoryToFlashCards < ActiveRecord::Migration[6.1]
  def change
    add_reference :flash_cards, :flash_card_category, foreign_key: true
  end
end
