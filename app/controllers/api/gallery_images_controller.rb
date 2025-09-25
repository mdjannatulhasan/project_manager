class Api::GalleryImagesController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :set_gallery_image, only: [:destroy]

    def index
        @gallery_images = GalleryImage.all.order(created_at: :desc)
        render json: @gallery_images
    end

    def create
        @gallery_image = GalleryImage.new(gallery_image_params)

        if uploaded_file = params[:gallery_image][:image]
            # Generate unique filename
            filename =
                "#{SecureRandom.hex(8)}_#{uploaded_file.original_filename}"
            file_path = Rails.root.join("public", "uploads", filename)

            # Save uploaded file
            File.open(file_path, "wb") { |file| file.write(uploaded_file.read) }

            @gallery_image.filename = filename
            @gallery_image.original_filename = uploaded_file.original_filename
        end

        if @gallery_image.save
            render json: @gallery_image, status: :created
        else
            render json: {
                       errors: @gallery_image.errors,
                   },
                   status: :unprocessable_entity
        end
    end

    def destroy
        # Delete the original file and variants
        if @gallery_image.full_image_path.exist?
            FileUtils.rm_f(@gallery_image.full_image_path)

            # Delete variants
            base_name = File.basename(@gallery_image.filename, ".*")
            extension = File.extname(@gallery_image.filename)
            directory = File.dirname(@gallery_image.filename)

            %w[mobile tablet desktop large].each do |size|
                variant_filename =
                    File.join(directory, "#{base_name}_#{size}#{extension}")
                variant_path =
                    Rails.root.join("public", "uploads", variant_filename)
                FileUtils.rm_f(variant_path) if File.exist?(variant_path)
            end
        end

        @gallery_image.destroy
        head :no_content
    end

    private

    def set_gallery_image
        @gallery_image = GalleryImage.find(params[:id])
    end

    def gallery_image_params
        params.require(:gallery_image).permit(:title)
    end
end
