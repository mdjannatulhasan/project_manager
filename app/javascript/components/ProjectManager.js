import React, { useState, useEffect } from 'react'
import Layout from './Layout'

const ProjectManager = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [editingProject, setEditingProject] = useState(null)

    // Filter and pagination state
    const [filters, setFilters] = useState({
        status: '',
        search: '',
        sort: 'created_at',
        order: 'desc'
    })
    const [pagination, setPagination] = useState({
        page: 1,
        per_page: 10,
        total_count: 0,
        total_pages: 0,
        has_next_page: false,
        has_prev_page: false
    })

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'planning'
    })

    // Load projects with current filters
    const loadProjects = async (page = 1) => {
        try {
            setLoading(true)
            const queryParams = new URLSearchParams({
                page: page.toString(),
                per_page: pagination.per_page.toString(),
                ...filters
            }).toString()

            const response = await fetch(`/api/projects?${queryParams}`)
            if (response.ok) {
                const data = await response.json()
                setProjects(data.data)
                setPagination(data.meta)
                setError(null)
            } else {
                setError('Failed to load projects')
            }
        } catch (err) {
            setError('Error loading projects: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    // Load projects on component mount and when filters change
    useEffect(() => {
        loadProjects(1)
    }, [filters])

    // Handle filter changes
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    // Handle pagination
    const handlePageChange = (newPage) => {
        loadProjects(newPage)
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects'
            const method = editingProject ? 'PATCH' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({ project: formData }),
            })

            if (response.ok) {
                setShowForm(false)
                setEditingProject(null)
                setFormData({ name: '', description: '', status: 'planning' })
                loadProjects(pagination.page)
            } else {
                const errorData = await response.json()
                setError('Error: ' + JSON.stringify(errorData.errors))
            }
        } catch (err) {
            setError('Error saving project: ' + err.message)
        }
    }

    // Handle edit
    const handleEdit = (project) => {
        setEditingProject(project)
        setFormData({
            name: project.name,
            description: project.description || '',
            status: project.status
        })
        setShowForm(true)
    }

    // Handle delete
    const handleDelete = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project and all its tasks?')) {
            try {
                const response = await fetch(`/api/projects/${projectId}`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
                    },
                })

                if (response.ok) {
                    loadProjects(pagination.page)
                } else {
                    setError('Failed to delete project')
                }
            } catch (err) {
                setError('Error deleting project: ' + err.message)
            }
        }
    }

    // Handle cancel form
    const handleCancel = () => {
        setShowForm(false)
        setEditingProject(null)
        setFormData({ name: '', description: '', status: 'planning' })
        setError(null)
    }

    const getStatusColor = (status) => {
        const colors = {
            planning: 'bg-yellow-100 text-yellow-800',
            active: 'bg-green-100 text-green-800',
            completed: 'bg-blue-100 text-blue-800',
            on_hold: 'bg-red-100 text-red-800'
        }
        return colors[status] || 'bg-gray-100 text-gray-800'
    }

    return (
        <Layout title="Project Manager - Advanced API Learning">
            <div className="space-y-6">
                {/* Error Display */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Filters & Search</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Statuses</option>
                                <option value="planning">Planning</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="on_hold">On Hold</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                            <select
                                value={filters.sort}
                                onChange={(e) => handleFilterChange('sort', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="created_at">Created Date</option>
                                <option value="name">Name</option>
                                <option value="status">Status</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                            <select
                                value={filters.order}
                                onChange={(e) => handleFilterChange('order', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Projects ({pagination.total_count})</h3>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        + New Project
                    </button>
                </div>

                {/* Project Form */}
                {showForm && (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">
                            {editingProject ? 'Edit Project' : 'Create New Project'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="planning">Planning</option>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="on_hold">On Hold</option>
                                </select>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    {editingProject ? 'Update' : 'Create'} Project
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Projects List */}
                {loading ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <p className="mt-2 text-gray-600">Loading projects...</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {projects.map((project) => (
                            <div key={project.id} className="bg-white p-6 rounded-lg shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                                        <p className="text-gray-600 mt-1">{project.description}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                                            {project.status.replace('_', ' ').toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-500">
                                        <span className="font-medium">{project.tasks_count}</span> total tasks, {' '}
                                        <span className="font-medium">{project.completed_tasks_count}</span> completed
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pagination.total_pages > 1 && (
                    <div className="flex justify-center items-center space-x-2">
                        <button
                            onClick={() => handlePageChange(pagination.page - 1)}
                            disabled={!pagination.has_prev_page}
                            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-sm text-gray-700">
                            Page {pagination.page} of {pagination.total_pages}
                        </span>
                        <button
                            onClick={() => handlePageChange(pagination.page + 1)}
                            disabled={!pagination.has_next_page}
                            className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* API Learning Info */}
                <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">🎓 API Learning Features</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                        <li><strong>Filtering:</strong> Filter by status and search by name</li>
                        <li><strong>Sorting:</strong> Sort by created_at, name, or status (asc/desc)</li>
                        <li><strong>Pagination:</strong> Navigate through large datasets</li>
                        <li><strong>CRUD Operations:</strong> Create, Read, Update, Delete projects</li>
                        <li><strong>Error Handling:</strong> Display validation errors and API errors</li>
                        <li><strong>Loading States:</strong> Show loading indicators during API calls</li>
                        <li><strong>Real-time Updates:</strong> Refresh data after operations</li>
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default ProjectManager
