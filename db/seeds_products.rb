# Seed data for Product
products = [
  { name: "Product 1", description: "First product", status: "active" },
  { name: "Product 2", description: "Second product", status: "planning" },
  { name: "Product 3", description: "Third product", status: "completed" }
]

products.each do |product_data|
  product = Product.find_or_create_by!(name: product_data[:name]) do |p|
    p.description = product_data[:description]
    p.status = product_data[:status]
  end

  # Create sample items for each product
  item_data = [
    { title: "Setup product environment", completed: true },
    { title: "Plan product architecture", completed: true },
    { title: "Implement product features", completed: false },
    { title: "Test product functionality", completed: false },
    { title: "Deploy product", completed: false }
  ]

  item_data.each do |item|
    product.items.find_or_create_by!(title: item[:title]) do |i|
      i.completed = item[:completed]
    end
  end
end

puts "✅ Created #{Product.count} products with #{Item.count} items"
