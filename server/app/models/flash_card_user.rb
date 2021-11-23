class FlashCardUser < ApplicationRecord
  belongs_to :user
  belongs_to :flash_card
end
