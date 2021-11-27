class FlashCardCategory < ApplicationRecord
  belongs_to :user
  has_many :flash_cards, inverse_of: :flash_card_category

  validates :name, presence: true
end
