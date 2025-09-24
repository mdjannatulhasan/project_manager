require "test_helper"
require "generators/project_with_tasks/project_with_tasks_generator"

class ProjectWithTasksGeneratorTest < Rails::Generators::TestCase
  tests ProjectWithTasksGenerator
  destination Rails.root.join("tmp/generators")
  setup :prepare_destination

  # test "generator runs without errors" do
  #   assert_nothing_raised do
  #     run_generator ["arguments"]
  #   end
  # end
end
