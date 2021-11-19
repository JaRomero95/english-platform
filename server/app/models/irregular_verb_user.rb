class IrregularVerbUser < ApplicationRecord
  belongs_to :user
  belongs_to :irregular_verb
end
