import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = [
        'taskList',     // Where tasks are displayed
        'taskInput',    // Input field for new tasks
        'filterButtons', // Filter buttons (all, active, completed)
        'taskCount'     // Shows number of remaining tasks
    ]

    static values = {
        tasks: Array,    // Array of task objects
        filter: String   // Current filter (all/active/completed)
    }

    async connect() {
        console.log('Task manager controller connected!')

        // Initialize tasks array if not already set
        if (!this.tasks || !Array.isArray(this.tasks)) {
            this.tasks = []
        }

        await this.loadTasks()
        this.updateFilterButtons()
    }

    updateTaskList() {
        this.taskListTarget.innerHTML = ''
        const filteredTasks = this.getFilteredTasks()

        filteredTasks.forEach(task => {
            const taskElement = document.createElement('div')
            taskElement.classList.add('flex', 'items-center', 'gap-2', 'p-3', 'border', 'border-gray-200', 'rounded-lg')

            taskElement.innerHTML = `
                <input 
                    type="checkbox" 
                    ${task.completed ? 'checked' : ''} 
                    data-action="change->task-manager#toggleTask"
                    data-task-id="${task.id}"
                    class="rounded"
                >
                <span class="flex-1 ${task.completed ? 'line-through text-gray-500' : ''}">${task.title}</span>
                <button 
                    data-action="click->task-manager#removeTask"
                    data-task-id="${task.id}"
                    class="text-red-500 hover:text-red-700 px-2 py-1 rounded"
                >
                    ×
                </button>
            `

            this.taskListTarget.appendChild(taskElement)
        })
    }

    async addTask(event) {
        event.preventDefault() // Prevent form submission

        const newTask = this.taskInputTarget.value.trim()
        if (newTask) {
            try {
                const response = await fetch('/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
                    },
                    body: JSON.stringify({
                        task: {
                            title: newTask,
                            completed: false
                        }
                    })
                })

                if (response.ok) {
                    const createdTask = await response.json()
                    this.tasks.push(createdTask)
                    this.taskInputTarget.value = '' // Clear input
                    this.updateTaskList()
                    this.updateTaskCount()
                    console.log('Task created successfully:', createdTask)
                } else {
                    console.error('Failed to create task:', response.status)
                }
            } catch (error) {
                console.error('Error creating task:', error)
            }
        }
    }

    setFilter(filter) {
        this.filterValue = filter
        this.updateTaskList()
    }

    updateTaskCount() {
        this.taskCountTarget.textContent = this.tasks.filter(task => !task.completed).length
    }

    async toggleTask(event) {
        const taskId = parseInt(event.target.dataset.taskId)
        const task = this.tasks.find(t => t.id === taskId)
        if (task) {
            try {
                const response = await fetch(`/api/tasks/${taskId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
                    },
                    body: JSON.stringify({
                        task: {
                            completed: !task.completed
                        }
                    })
                })

                if (response.ok) {
                    const updatedTask = await response.json()
                    task.completed = updatedTask.completed
                    this.updateTaskList()
                    this.updateTaskCount()
                    console.log('Task updated successfully:', updatedTask)
                } else {
                    console.error('Failed to update task:', response.status)
                }
            } catch (error) {
                console.error('Error updating task:', error)
            }
        }
    }

    async removeTask(event) {
        const taskId = parseInt(event.target.dataset.taskId)

        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
                }
            })

            if (response.ok) {
                this.tasks = this.tasks.filter(t => t.id !== taskId)
                this.updateTaskList()
                this.updateTaskCount()
                console.log('Task deleted successfully')
            } else {
                console.error('Failed to delete task:', response.status)
            }
        } catch (error) {
            console.error('Error deleting task:', error)
        }
    }

    clearCompleted() {
        this.tasks = this.tasks.filter(task => !task.completed)
        this.updateTaskList()
    }

    filterTasks(event) {
        const filter = event.target.dataset.filter
        this.filterValue = filter
        this.updateTaskList()
        this.updateFilterButtons()
    }

    getFilteredTasks() {
        switch (this.filterValue) {
            case 'active':
                return this.tasks.filter(task => !task.completed)
            case 'completed':
                return this.tasks.filter(task => task.completed)
            default:
                return this.tasks
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }

    async loadTasks() {
        try {
            const response = await fetch('/api/tasks')
            if (response.ok) {
                this.tasks = await response.json()
                this.updateTaskList()
                this.updateTaskCount()
            } else {
                console.error('Failed to load tasks:', response.status)
                this.tasks = []
            }
        } catch (error) {
            console.error('Error loading tasks:', error)
            this.tasks = []
        }
    }

    disconnect() {
        console.log('Task manager controller disconnected!')
        this.saveTasks()
    }

    updateFilterButtons() {
        this.filterButtonsTarget.querySelectorAll('button').forEach(button => {
            button.classList.toggle('bg-blue-500', button.dataset.filter === this.filterValue)
        })
    }
}