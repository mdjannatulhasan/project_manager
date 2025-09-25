require "mini_magick"

class GalleryImage < ApplicationRecord
    validates :title, presence: true
    validates :filename, presence: true
    validates :original_filename, presence: true

    # Generate variants after creation
    after_create :generate_image_variants

    def image_path
        "uploads/#{filename}"
    end

    def full_image_path
        Rails.root.join("public", image_path)
    end

    def generate_image_variants
        return unless File.exist?(full_image_path)

        base_name = File.basename(filename, ".*")
        extension = File.extname(filename)
        directory = File.dirname(filename)

        # Generate variants for different screen sizes
        variants = {
            "mobile" => 400,
            "tablet" => 800,
            "desktop" => 1200,
            "large" => 1600,
        }

        variants.each do |size_name, width|
            variant_filename =
                File.join(directory, "#{base_name}_#{size_name}#{extension}")
            variant_path =
                Rails.root.join("public", "uploads", variant_filename)

            # Actually resize the image using MiniMagick
            unless File.exist?(variant_path)
                begin
                    image = MiniMagick::Image.open(full_image_path)
                    image.resize("#{width}x")
                    image.write(variant_path)
                    puts "✅ Created #{size_name} variant: #{width}px width"
                rescue => e
                    puts "❌ Error creating #{size_name} variant: #{e.message}"

                    # Fallback: just copy the original
                    FileUtils.cp(full_image_path, variant_path)
                end
            end
        end
    end

    def as_json(options = {})
        base_name = File.basename(filename, ".*")
        extension = File.extname(filename)
        directory = File.dirname(filename)

        # Generate srcset for different breakpoints
        breakpoints = {
            "mobile" => "400w",
            "tablet" => "800w",
            "desktop" => "1200w",
            "large" => "1600w",
        }

        # Check which variants actually exist
        existing_variants = []
        breakpoints.each do |size, width|
            variant_path =
                File.join(directory, "#{base_name}_#{size}#{extension}")
            if File.exist?(Rails.root.join("public", "uploads", variant_path))
                existing_variants << [variant_path, width]
            end
        end

        # Generate srcset string
        srcset =
            if existing_variants.any?
                existing_variants
                    .map do |path, width|
                        "/uploads/#{path.sub(%r{^\.\/}, "")} #{width}"
                    end
                    .join(", ")
            else
                nil
            end

        super(only: %i[id title filename original_filename created_at]).merge(
            image_url: "/uploads/#{filename}",
            thumbnail_url: "/uploads/#{filename}",
            srcset: srcset,
            sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
        )
    end
end
