class AddFontScalePercentsToFlashCards < ActiveRecord::Migration[6.1]
  def change
    add_column :flash_cards, :question_font_scale_percent, :integer, default: 50
    add_column :flash_cards, :answer_font_scale_percent, :integer, default: 50
  end
end
