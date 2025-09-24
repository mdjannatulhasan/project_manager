class Item < ApplicationRecord
    belongs_to :product

    validates :title, presence: true, length: { minimum: 1, maximum: 255 }

    scope :completed, -> { where(completed: true) }
    scope :active, -> { where(completed: false) }

    def as_json(options = {})
        super(only: %i[id title completed created_at updated_at product_id])
    end
end
