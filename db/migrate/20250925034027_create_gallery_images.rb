class CreateGalleryImages < ActiveRecord::Migration[8.0]
  def change
    create_table :gallery_images do |t|
      t.string :title
      t.string :filename
      t.string :original_filename

      t.timestamps
    end
  end
end
