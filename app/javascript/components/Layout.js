import React from 'react'
import Navigation from './Navigation'

const Layout = ({ children, title = "Learning Rails Frontend Structure" }) => {
    return (
        <div>
            {/* <Navigation /> */}
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8">{title}</h1>
                {children}
            </div>
        </div>
    )
}

export default Layout
