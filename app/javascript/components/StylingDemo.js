import React from 'react'
import ResponsiveImagesDemo from './ResponsiveImagesDemo'

const StylingDemo = () => {
    return (
        <div className="space-y-8">
            {/* Asset Helpers Demo */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-purple-800">🎨 Asset Helpers Demo</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {/* Icon Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <img src="/icon.svg" alt="Icon" className="w-6 h-6" />
                            <h3 className="font-semibold">Icon with Text</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                            Using image_tag for icons with responsive design
                        </p>
                    </div>

                    {/* Responsive Image Card */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                        <img src="/icon.png" alt="Responsive" className="w-full h-20 object-cover rounded mb-2" />
                        <h3 className="font-semibold">Responsive Images</h3>
                        <p className="text-sm text-gray-600">
                            Images that adapt to screen size
                        </p>
                    </div>

                    {/* Asset Path Demo */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Asset Paths</h3>
                        <code className="text-xs bg-white p-1 rounded">
                            /icon.svg
                        </code>
                        <p className="text-sm text-gray-600 mt-2">
                            Rails handles asset paths automatically
                        </p>
                    </div>
                </div>
            </div>

            {/* Responsive Design Demo */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-green-800">📱 Responsive Design Patterns</h2>

                <div className="space-y-4">
                    {/* Grid System */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Grid System</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(num => (
                                <div key={num} className="bg-blue-100 p-4 rounded text-center">
                                    <span className="font-bold">Item {num}</span>
                                    <p className="text-xs text-gray-600">Responsive grid</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Flexbox Patterns */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Flexbox Patterns</h3>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 bg-green-100 p-4 rounded">
                                <h4 className="font-semibold">Flex Item 1</h4>
                                <p className="text-sm">Grows to fill space</p>
                            </div>
                            <div className="flex-1 bg-green-100 p-4 rounded">
                                <h4 className="font-semibold">Flex Item 2</h4>
                                <p className="text-sm">Equal width on larger screens</p>
                            </div>
                        </div>
                    </div>

                    {/* Typography Scale */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Typography Scale</h3>
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-gray-800">Heading 1 (4xl)</h1>
                            <h2 className="text-3xl font-semibold text-gray-700">Heading 2 (3xl)</h2>
                            <h3 className="text-2xl font-medium text-gray-600">Heading 3 (2xl)</h3>
                            <p className="text-base text-gray-500">Body text (base)</p>
                            <p className="text-sm text-gray-400">Small text (sm)</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Component Library Demo */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-indigo-800">🧩 Component Library Patterns</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Button Variants */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Button Components</h3>
                        <div className="space-y-2">
                            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                                Primary Button
                            </button>
                            <button className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors">
                                Secondary Button
                            </button>
                            <button className="w-full border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition-colors">
                                Outline Button
                            </button>
                        </div>
                    </div>

                    {/* Card Components */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Card Components</h3>
                        <div className="space-y-2">
                            <div className="bg-gray-50 p-3 rounded border">
                                <h4 className="font-medium">Basic Card</h4>
                                <p className="text-sm text-gray-600">Simple card layout</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                                <h4 className="font-medium">Alert Card</h4>
                                <p className="text-sm text-gray-600">Card with accent border</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Advanced Tailwind Patterns */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-red-800">⚡ Advanced Tailwind Patterns</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Animations */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Animations & Transitions</h3>
                        <div className="space-y-2">
                            <div className="bg-blue-500 text-white p-3 rounded transform hover:scale-105 transition-transform duration-200">
                                Hover to Scale
                            </div>
                            <div className="bg-green-500 text-white p-3 rounded hover:bg-green-600 transition-colors duration-300">
                                Color Transition
                            </div>
                            <div className="bg-purple-500 text-white p-3 rounded hover:shadow-lg transition-shadow duration-300">
                                Shadow Transition
                            </div>
                        </div>
                    </div>

                    {/* Gradients */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Gradients & Effects</h3>
                        <div className="space-y-2">
                            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded">
                                Linear Gradient
                            </div>
                            <div className="bg-gradient-to-br from-blue-400 to-indigo-600 text-white p-3 rounded">
                                Diagonal Gradient
                            </div>
                            <div className="bg-gray-800 text-white p-3 rounded shadow-2xl">
                                Dark Card with Shadow
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive Images Demo */}
            <ResponsiveImagesDemo />
        </div>
    )
}

export default StylingDemo
