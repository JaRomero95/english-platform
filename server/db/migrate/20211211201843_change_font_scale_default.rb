class ChangeFontScaleDefault < ActiveRecord::Migration[6.1]
  def change
    change_column_default :flash_cards, :question_font_scale_percent, 85
    change_column_default :flash_cards, :answer_font_scale_percent, 85
  end
end
