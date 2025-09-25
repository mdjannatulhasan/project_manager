import React, { useState, useEffect, useRef } from 'react'
import { createConsumer } from '@rails/actioncable'

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [userName, setUserName] = useState('')
    const [isConnected, setIsConnected] = useState(false)
    const [showNameInput, setShowNameInput] = useState(true)
    const messagesEndRef = useRef(null)
    const cableRef = useRef(null)

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Connect to Action Cable
    useEffect(() => {
        const consumer = createConsumer('/cable')
        cableRef.current = consumer.subscriptions.create(
            { channel: 'ChatChannel' },
            {
                connected: () => {
                    console.log('Connected to chat channel')
                    setIsConnected(true)
                },
                disconnected: () => {
                    console.log('Disconnected from chat channel')
                    setIsConnected(false)
                },
                received: (data) => {
                    console.log('Received message:', data)
                    setMessages(prev => [...prev, data])
                },
                speak: function (data) {
                    return this.perform('speak', data)
                }
            }
        )

        // Load recent messages
        loadRecentMessages()

        return () => {
            if (cableRef.current) {
                cableRef.current.unsubscribe()
            }
        }
    }, [])

    const loadRecentMessages = async () => {
        try {
            const response = await fetch('/api/chat_messages')
            if (response.ok) {
                const data = await response.json()
                setMessages(data)
            }
        } catch (error) {
            console.error('Error loading messages:', error)
        }
    }

    const handleSendMessage = (e) => {
        e.preventDefault()

        if (!newMessage.trim() || !userName.trim()) return

        // Send message via Action Cable
        if (cableRef.current) {
            console.log('Sending message via Action Cable:', {
                user_name: userName.trim(),
                message: newMessage.trim()
            })
            cableRef.current.speak({
                user_name: userName.trim(),
                message: newMessage.trim()
            })
        } else {
            console.error('Action Cable connection not available')
        }

        setNewMessage('')
    }

    const handleNameSubmit = (e) => {
        e.preventDefault()
        if (userName.trim()) {
            setShowNameInput(false)
        }
    }

    if (showNameInput) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Join Chat
                    </h1>
                    <form onSubmit={handleNameSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your name"
                                maxLength="50"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            Join Chat
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Real-time Chat</h1>
                            <p className="text-gray-600">
                                Welcome, <span className="font-semibold text-blue-600">{userName}</span>
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-sm text-gray-600">
                                {isConnected ? 'Connected' : 'Disconnected'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
                <div className="bg-white rounded-lg shadow-sm border h-96 overflow-y-auto">
                    <div className="p-4 space-y-4">
                        {messages.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">
                                <p>No messages yet. Start the conversation!</p>
                            </div>
                        ) : (
                            messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.user_name === userName ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.user_name === userName
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-800'
                                            }`}
                                    >
                                        {message.user_name !== userName && (
                                            <div className="text-xs font-semibold mb-1 opacity-75">
                                                {message.user_name}
                                            </div>
                                        )}
                                        <div className="text-sm">{message.message}</div>
                                        <div className="text-xs mt-1 opacity-75">
                                            {message.created_at}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>

            {/* Message Input */}
            <div className="bg-white border-t">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type your message..."
                            maxLength="500"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim() || !isConnected}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat
