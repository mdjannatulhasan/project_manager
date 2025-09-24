import React, { useState } from 'react'
import Layout from './Layout'

const Counter = () => {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }

    const reset = () => {
        setCount(0)
    }

    return (
        <Layout title="Counter Component - React Learning">
            <div className="bg-gray-200 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Counter Component (React)</h2>
                <p>This teaches you React hooks, state management, and event handling!</p>

                <div className="mt-4">
                    <span className="text-4xl font-bold">{count}</span>
                </div>

                <div className="mt-4 space-x-2">
                    <button
                        onClick={increment}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        +1
                    </button>
                    <button
                        onClick={decrement}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        -1
                    </button>
                    <button
                        onClick={reset}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default Counter
