class FlashCard < ApplicationRecord
  belongs_to :user
  belongs_to :flash_card_category, optional: true
  has_many :flash_card_users, inverse_of: :flash_card

  class << self
    def filter_by_visible(visible)
      where(visible: visible)
    end

    def filter_by_flash_card_category_ids(flash_card_category_ids)
      where(flash_card_category_id: flash_card_category_ids)
    end

    def filter_by_question_text(question_text)
      where('question_text ILIKE ?', "%#{question_text}%")
    end

    def filter_by_answer_text(answer_text)
      where('answer_text ILIKE ?', "%#{answer_text}%")
    end
  end
end
