class Task < ApplicationRecord
    validates :title, presence: true, length: { minimum: 1, maximum: 255 }

    scope :completed, -> { where(completed: true) }
    scope :active, -> { where(completed: false) }

    # Convert to JSON format for API responses
    def as_json(options = {})
        super(only: %i[id title completed created_at updated_at])
    end
end
