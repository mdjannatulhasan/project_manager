import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Navigation from './Navigation'
import Home from './Home'
import Counter from './Counter'
import TaskManager from './TaskManager'
import ProjectManager from './ProjectManager'
import StylingDemo from './StylingDemo'
import Gallery from './Gallery'
import Chat from './Chat'

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
                    <Route path="/styling" element={<StylingDemo />} />
                    <Route path="/responsive-images" element={<Gallery />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
