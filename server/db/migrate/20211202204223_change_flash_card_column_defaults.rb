class ChangeFlashCardColumnDefaults < ActiveRecord::Migration[6.1]
  def change
    change_column_default :flash_cards, :question_text, ''
    change_column_default :flash_cards, :question_img_url, ''
    change_column_default :flash_cards, :answer_text, ''
    change_column_default :flash_cards, :answer_img_url, ''
  end
end
