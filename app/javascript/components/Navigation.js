import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
    const location = useLocation()

    const isActive = (path) => location.pathname === path

    return (
        <nav className="bg-gray-800 text-white p-4 mb-8">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Rails + React Learning</h1>
                <div className="flex space-x-4">
                    <Link
                        to="/"
                        className={`hover:text-blue-300 transition-colors ${isActive('/') ? 'text-blue-300' : ''}`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/counter"
                        className={`hover:text-blue-300 transition-colors ${isActive('/counter') ? 'text-blue-300' : ''}`}
                    >
                        Counter
                    </Link>
                    <Link
                        to="/tasks"
                        className={`hover:text-blue-300 transition-colors ${isActive('/tasks') ? 'text-blue-300' : ''}`}
                    >
                        Tasks
                    </Link>
                    <Link
                        to="/projects"
                        className={`hover:text-blue-300 transition-colors ${isActive('/projects') ? 'text-blue-300' : ''}`}
                    >
                        Projects
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
