module AssetHelper
    # Helper to create image tags with fallbacks and responsive attributes
    def responsive_image_tag(source, options = {})
        options =
            { alt: "Image", class: "w-full h-auto", loading: "lazy" }.merge(
                options,
            )
        image_tag(source, options)
    end

    # Helper to create icon with text
    def icon_with_text(icon_path, text, options = {})
        content_tag :div, class: "flex items-center gap-2 #{options[:class]}" do
            concat image_tag(icon_path, class: "w-5 h-5", alt: "")
            concat content_tag(:span, text)
        end
    end

    # Helper to create a card with image
    def image_card(image_path, title, description, options = {})
        content_tag :div,
                    class:
                        "bg-white rounded-lg shadow-md overflow-hidden #{options[:class]}" do
            concat image_tag(image_path, class: "w-full h-48 object-cover")
            concat content_tag(:div, class: "p-4") do
                concat content_tag(
                           :h3,
                           title,
                           class: "text-lg font-semibold mb-2",
                       )
                concat content_tag(:p, description, class: "text-gray-600")
            end
        end
    end

    # Helper to show asset information (for learning purposes)
    def asset_info(asset_path)
        content_tag :div, class: "bg-blue-50 p-3 rounded text-sm" do
            concat content_tag(:strong, "Asset Path: ")
            concat asset_path(asset_path)
            concat tag(:br)
            concat content_tag(:strong, "Full URL: ")
            concat request.base_url + asset_path(asset_path)
        end
    end
end
