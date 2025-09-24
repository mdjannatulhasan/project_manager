// Entry point for the build script in your package.json
import '@hotwired/turbo-rails'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'

// Initialize React app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const appElement = document.getElementById('app-root')
    if (appElement) {
        const root = createRoot(appElement)
        root.render(
            React.createElement(BrowserRouter, null, React.createElement(App))
        )
    }
})
