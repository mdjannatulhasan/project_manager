import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Navigation from './Navigation'
import Home from './Home'
import Counter from './Counter'
import TaskManager from './TaskManager'
import ProjectManager from './ProjectManager'

const App = () => {
    return (
        <div>
            <Navigation />
            <div className="container mx-auto p-8">
                <Routes>
                    <Route path="/" element={
                        <Home />
                    } />
                    <Route path="/counter" element={<Counter />} />
                    <Route path="/tasks" element={<TaskManager />} />
                    <Route path="/projects" element={<ProjectManager />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
