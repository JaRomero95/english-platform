Rails.application.routes.draw do
  resources :irregular_verbs, only: %w[index]
  resources :irregular_verbs_exams, only: %w[create]
end
