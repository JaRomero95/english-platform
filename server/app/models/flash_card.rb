class FlashCard < ApplicationRecord
  belongs_to :user
  belongs_to :flash_card_category, optional: true
  has_many :flash_card_users, inverse_of: :flash_card

  class << self
    def filter_by_flash_card_category_ids(flash_card_category_ids)
      puts flash_card_category_ids
      where(flash_card_category_id: flash_card_category_ids)
    end
  end
end
