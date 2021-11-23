class FlashCard < ApplicationRecord
  belongs_to :user
  has_many :flash_card_users, inverse_of: :flash_card
end
