# Seed data for Campaign
campaigns = [
  { name: "Campaign 1", description: "First campaign", status: "active" },
  { name: "Campaign 2", description: "Second campaign", status: "planning" },
  { name: "Campaign 3", description: "Third campaign", status: "completed" }
]

campaigns.each do |campaign_data|
  campaign = Campaign.find_or_create_by!(name: campaign_data[:name]) do |p|
    p.description = campaign_data[:description]
    p.status = campaign_data[:status]
  end

  # Create sample tasks for each campaign
  task_data = [
    { title: "Setup campaign environment", completed: true },
    { title: "Plan campaign architecture", completed: true },
    { title: "Implement campaign features", completed: false },
    { title: "Test campaign functionality", completed: false },
    { title: "Deploy campaign", completed: false }
  ]

  task_data.each do |task|
    campaign.tasks.find_or_create_by!(title: task[:title]) do |t|
      t.completed = task[:completed]
    end
  end
end

puts "✅ Created #{Campaign.count} campaigns with #{Task.count} tasks"
