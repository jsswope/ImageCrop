Rails.application.routes.draw do
  # For details on the DSL available within this file, see h
  resources :users
  root to: 'users#index'
end
