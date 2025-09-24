class CreateItems < ActiveRecord::Migration[8.0]
  def change
    create_table :items do |t|
      t.string :title
      t.boolean :completed
      t.references :product, null: false, foreign_key: true

      t.timestamps
    end
  end
end
