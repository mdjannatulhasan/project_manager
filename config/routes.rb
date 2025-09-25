Rails
    .application
    .routes
    .draw do
        # API Routes
        namespace :api do
            resources :projects, only: %i[index show create update destroy] do
                resources :tasks,
                          only: %i[index show create update destroy],
                          controller: "projects/tasks"
            end
            resources :campaigns, only: %i[index show create update destroy] do
                resources :tasks,
                          only: %i[index show create update destroy],
                          controller: "campaigns/tasks"
            end
            resources :tasks, only: %i[index show create update destroy]
        end

        # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

        # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
        # Can be used by load balancers and uptime monitors to verify that the app is live.
        get "up" => "rails/health#show", :as => :rails_health_check

        root "pages#home"
        get "counter", to: "pages#home"
        get "tasks", to: "pages#home"
        get "projects", to: "pages#home"
        get "styling", to: "pages#home"
        get "responsive-images", to: "pages#home"
        get "gallery", to: "pages#home"
        get "chat", to: "pages#home"

        namespace :api do
            resources :gallery_images, only: %i[index create destroy]
            resources :chat_messages, only: [:index]
        end

        # Action Cable routes
        mount ActionCable.server => "/cable"

        # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
        # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
        # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

        # Defines the root path route ("/")
        # root "posts#index"
    end
