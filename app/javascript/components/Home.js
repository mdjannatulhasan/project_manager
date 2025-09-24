import React from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'

const Home = () => {
    return (
        <Layout title="Welcome to Rails + React Learning">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Counter Preview */}
                <div className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Counter Component</h2>
                    <p className="mb-4">Learn React hooks and state management with an interactive counter.</p>
                    <Link
                        to="/counter"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors inline-block"
                    >
                        Try Counter →
                    </Link>
                </div>

                {/* Task Manager Preview */}
                <div className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Task Manager</h2>
                    <p className="mb-4">Build a full CRUD application with React and Rails API integration.</p>
                    <Link
                        to="/tasks"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors inline-block"
                    >
                        Manage Tasks →
                    </Link>
                </div>
            </div>

            <div className="mt-8 bg-yellow-100 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Learning Objectives</h2>
                <ul className="space-y-2">
                    <li>✅ <strong>React Hooks:</strong> useState, useEffect for state management</li>
                    <li>✅ <strong>Component Architecture:</strong> Functional components and props</li>
                    <li>✅ <strong>API Integration:</strong> Fetch API with Rails backend</li>
                    <li>✅ <strong>Styling:</strong> Tailwind CSS with React components</li>
                    <li>✅ <strong>Rails Integration:</strong> Server-side rendering with React hydration</li>
                </ul>
            </div>
        </Layout>
    )
}

export default Home
