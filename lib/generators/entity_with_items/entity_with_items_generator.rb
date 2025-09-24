class EntityWithItemsGenerator < Rails::Generators::NamedBase
    source_root File.expand_path("templates", __dir__)

    # This generator creates a main entity with associated items and complete API
    desc "Generate a main entity with associated items, API controllers, and sample data"

    def create_entity_model
        generate "model",
                 "#{singular_name} name:string description:text status:string"
    end

    def create_item_model
        generate "model",
                 "item title:string completed:boolean #{singular_name.underscore}:references"
    end

    def create_api_controllers
        generate "controller", "Api::#{class_name.pluralize}", "--skip-routes"
        generate "controller",
                 "Api::#{class_name.pluralize}::Items",
                 "--skip-routes"
    end

    def add_routes
        route <<~ROUTES
      namespace :api do
        resources :#{plural_name.underscore}, only: %i[index show create update destroy] do
          resources :items, only: %i[index show create update destroy], controller: '#{plural_name.underscore}/items'
        end
      end
    ROUTES
    end

    def create_seed_data
        create_file "db/seeds_#{plural_name.underscore}.rb", seed_template
    end

    def show_instructions
        say "\n✅ Generated #{class_name} with Items structure!", :green
        say "\n📋 Next steps:", :yellow
        say "1. Run: bin/rails db:migrate"
        say "2. Run: bin/rails db:seed"
        say "3. Test API: GET /api/#{plural_name.underscore}"
        say "4. Test nested: GET /api/#{plural_name.underscore}/1/items"
    end

    private

    def seed_template
        <<~SEEDS
      # Seed data for #{class_name}
      #{plural_name.underscore} = [
        { name: "#{class_name} 1", description: "First #{singular_name}", status: "active" },
        { name: "#{class_name} 2", description: "Second #{singular_name}", status: "planning" },
        { name: "#{class_name} 3", description: "Third #{singular_name}", status: "completed" }
      ]

      #{plural_name.underscore}.each do |#{singular_name}_data|
        #{singular_name} = #{class_name}.find_or_create_by!(name: #{singular_name}_data[:name]) do |p|
          p.description = #{singular_name}_data[:description]
          p.status = #{singular_name}_data[:status]
        end

        # Create sample items for each #{singular_name}
        item_data = [
          { title: "Setup #{singular_name} environment", completed: true },
          { title: "Plan #{singular_name} architecture", completed: true },
          { title: "Implement #{singular_name} features", completed: false },
          { title: "Test #{singular_name} functionality", completed: false },
          { title: "Deploy #{singular_name}", completed: false }
        ]

        item_data.each do |item|
          #{singular_name}.items.find_or_create_by!(title: item[:title]) do |i|
            i.completed = item[:completed]
          end
        end
      end

      puts "✅ Created \#{#{class_name}.count} #{plural_name} with \#{Item.count} items"
    SEEDS
    end
end
