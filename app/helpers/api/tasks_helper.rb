module Api::TasksHelper
    # Format task completion status for display
    def task_status_badge(task)
        if task.completed?
            "<span class=\"bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs\">Completed</span>"
        else
            "<span class=\"bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs\">Active</span>"
        end
    end

    # Format task creation date
    def format_task_date(task)
        task.created_at.strftime("%B %d, %Y at %I:%M %p")
    end

    # Get task count by status
    def task_count_by_status(tasks, status)
        case status
        when "completed"
            tasks.count(&:completed?)
        when "active"
            tasks.count { |task| !task.completed? }
        else
            tasks.count
        end
    end

    # Generate task priority color based on age
    def task_priority_class(task)
        days_old = (Time.current - task.created_at) / 1.day

        if days_old > 7
            "border-l-4 border-red-500" # High priority - old task
        elsif days_old > 3
            "border-l-4 border-yellow-500" # Medium priority
        else
            "border-l-4 border-green-500" # Low priority - new task
        end
    end
end
