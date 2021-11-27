Rails.application.routes.draw do
  resources :flash_card_categories
  resources :tests
  resources :flash_cards, only: %w[index update]
  resources :irregular_verbs, only: %w[index]
  resources :irregular_verbs_exams, only: %w[create]
end
