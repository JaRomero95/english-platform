Rails.application.routes.draw do
  resources :sessions, only: %w[create]
  resources :flash_card_categories
  resources :flash_cards, only: %w[index create update]
  resources :irregular_verbs, only: %w[index]
  resources :irregular_verbs_exams, only: %w[create]
end
