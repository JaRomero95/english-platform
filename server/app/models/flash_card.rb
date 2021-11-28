class FlashCard < ApplicationRecord
  belongs_to :user
  belongs_to :flash_card_category, optional: true
  has_many :flash_card_users, inverse_of: :flash_card
end
