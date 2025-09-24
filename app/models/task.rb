class Task < ApplicationRecord
    belongs_to :project, optional: true

    validates :title, presence: true, length: { minimum: 1, maximum: 255 }

    scope :completed, -> { where(completed: true) }
    scope :active, -> { where(completed: false) }
    scope :for_project, ->(project_id) { where(project_id: project_id) }

    # Convert to JSON format for API responses
    def as_json(options = {})
        super(only: %i[id title completed created_at updated_at project_id])
    end
end
