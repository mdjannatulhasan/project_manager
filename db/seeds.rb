# Create sample projects
projects = [
  { name: "Rails Learning Project", description: "Learn Ruby on Rails fundamentals", status: "active" },
  { name: "React Frontend App", description: "Build a modern React application", status: "planning" },
  { name: "API Development", description: "Create RESTful APIs with Rails", status: "active" },
  { name: "Database Design", description: "Learn database modeling and migrations", status: "completed" }
]

projects.each do |project_data|
  project = Project.find_or_create_by!(name: project_data[:name]) do |p|
    p.description = project_data[:description]
    p.status = project_data[:status]
  end

  # Create sample tasks for each project
  task_data = [
    { title: "Setup development environment", completed: true },
    { title: "Learn MVC pattern", completed: true },
    { title: "Build first controller", completed: false },
    { title: "Add database migrations", completed: false },
    { title: "Implement user authentication", completed: false }
  ]

  task_data.each do |task|
    project.tasks.find_or_create_by!(title: task[:title]) do |t|
      t.completed = task[:completed]
    end
  end
end

# Create some standalone tasks (without projects)
standalone_tasks = [
  { title: "Review code documentation", completed: false },
  { title: "Update project README", completed: true },
  { title: "Plan next learning phase", completed: false }
]

standalone_tasks.each do |task_data|
  Task.find_or_create_by!(title: task_data[:title]) do |t|
    t.completed = task_data[:completed]
    t.project = nil
  end
end

puts "✅ Created #{Project.count} projects and #{Task.count} tasks"
