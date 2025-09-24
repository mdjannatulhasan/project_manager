import React, { useState, useEffect } from 'react'
import Layout from './Layout'

const TaskManager = () => {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    const [filter, setFilter] = useState('all')

    // Load tasks from API on component mount
    useEffect(() => {
        loadTasks()
    }, [])

    const loadTasks = async () => {
        try {
            const response = await fetch('/api/tasks')
            if (response.ok) {
                const tasksData = await response.json()
                setTasks(tasksData)
            } else {
                console.error('Failed to load tasks:', response.status)
            }
        } catch (error) {
            console.error('Error loading tasks:', error)
        }
    }

    const addTask = async (e) => {
        e.preventDefault()
        if (newTask.trim()) {
            try {
                const response = await fetch('/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
                    },
                    body: JSON.stringify({
                        task: {
                            title: newTask.trim(),
                            completed: false
                        }
                    })
                })

                if (response.ok) {
                    const createdTask = await response.json()
                    setTasks([...tasks, createdTask])
                    setNewTask('')
                } else {
                    console.error('Failed to create task:', response.status)
                }
            } catch (error) {
                console.error('Error creating task:', error)
            }
        }
    }

    const toggleTask = async (taskId) => {
        const task = tasks.find(t => t.id === taskId)
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
                    setTasks(tasks.map(t => t.id === taskId ? updatedTask : t))
                } else {
                    console.error('Failed to update task:', response.status)
                }
            } catch (error) {
                console.error('Error updating task:', error)
            }
        }
    }

    const removeTask = async (taskId) => {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
                }
            })

            if (response.ok) {
                setTasks(tasks.filter(t => t.id !== taskId))
            } else {
                console.error('Failed to delete task:', response.status)
            }
        } catch (error) {
            console.error('Error deleting task:', error)
        }
    }

    const getFilteredTasks = () => {
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.completed)
            case 'completed':
                return tasks.filter(task => task.completed)
            default:
                return tasks
        }
    }

    const getActiveTasksCount = () => {
        return tasks.filter(task => !task.completed).length
    }

    const filteredTasks = getFilteredTasks()

    return (
        <Layout title="Task Manager - React Learning">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-blue-800">
                    Advanced Task Manager (React)
                </h2>

                {/* Task Input Form */}
                <form onSubmit={addTask} className="mb-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Add a new task..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Add Task
                        </button>
                    </div>
                </form>

                {/* Filter Buttons */}
                <div className="mb-4 flex gap-2">
                    {['all', 'active', 'completed'].map((filterType) => (
                        <button
                            key={filterType}
                            onClick={() => setFilter(filterType)}
                            className={`px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors ${filter === filterType ? 'bg-blue-500 text-white' : ''
                                }`}
                        >
                            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Task List */}
                <div className="space-y-2 mb-4">
                    {filteredTasks.map(task => (
                        <div
                            key={task.id}
                            className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg"
                        >
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                className="rounded"
                            />
                            <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                {task.title}
                            </span>
                            <button
                                onClick={() => removeTask(task.id)}
                                className="text-red-500 hover:text-red-700 px-2 py-1 rounded"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                {/* Task Count */}
                <div className="text-sm text-gray-600">
                    <span>{getActiveTasksCount()} tasks remaining</span>
                </div>
            </div>
        </Layout>
    )
}

export default TaskManager
