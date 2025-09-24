class Campaign < ApplicationRecord
    has_many :tasks, foreign_key: :project_id, dependent: :destroy

    validates :name, presence: true, length: { minimum: 1, maximum: 255 }
    validates :status, inclusion: { in: %w[planning active completed on_hold] }

    scope :active, -> { where(status: "active") }
    scope :completed, -> { where(status: "completed") }

    def as_json(options = {})
        super(only: %i[id name description status created_at updated_at]).merge(
            tasks_count: tasks.count,
            completed_tasks_count: tasks.completed.count,
        )
    end
end
