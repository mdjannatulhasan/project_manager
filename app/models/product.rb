class Product < ApplicationRecord
  has_many :items, dependent: :destroy
  
  validates :name, presence: true, length: { minimum: 1, maximum: 255 }
  validates :status, inclusion: { in: %w[planning active completed on_hold] }
  
  scope :active, -> { where(status: "active") }
  scope :completed, -> { where(status: "completed") }
  
  def as_json(options = {})
    super(only: %i[id name description status created_at updated_at]).merge(
      items_count: items.count,
      completed_items_count: items.completed.count,
    )
  end
end
