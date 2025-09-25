import React, { useState, useEffect } from 'react'

const Gallery = () => {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [modalImageLoaded, setModalImageLoaded] = useState(false)

    useEffect(() => {
        loadImages()
    }, [])

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setSelectedImage(null)
            }
        }

        if (selectedImage) {
            document.addEventListener('keydown', handleEscape)
            setModalImageLoaded(false) // Reset modal image state when opening
            return () => document.removeEventListener('keydown', handleEscape)
        }
    }, [selectedImage])

    // Get the highest resolution image URL from srcset
    const getHighestResImage = (image) => {
        if (!image.srcset) return image.image_url

        // Extract all URLs from srcset and find the largest width
        const srcsetEntries = image.srcset.split(', ')
        let highestResUrl = image.image_url
        let maxWidth = 0

        srcsetEntries.forEach(entry => {
            const [url, width] = entry.split(' ')
            const widthNum = parseInt(width.replace('w', ''))
            if (widthNum > maxWidth) {
                maxWidth = widthNum
                highestResUrl = url
            }
        })

        return highestResUrl
    }

    const loadImages = async () => {
        try {
            const response = await fetch('/api/gallery_images')
            if (response.ok) {
                const imageData = await response.json()
                setImages(imageData)
            }
        } catch (error) {
            console.error('Error loading images:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        setUploading(true)

        const formData = new FormData()
        const title = e.target.title.value
        const file = e.target.image.files[0]

        if (!title || !file) {
            alert('Please provide both title and image')
            setUploading(false)
            return
        }

        formData.append('gallery_image[title]', title)
        formData.append('gallery_image[image]', file)

        try {
            const response = await fetch('/api/gallery_images', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
                }
            })

            if (response.ok) {
                e.target.reset()
                loadImages() // Reload images
                alert('Image uploaded successfully!')
            } else {
                alert('Failed to upload image')
            }
        } catch (error) {
            console.error('Error uploading image:', error)
            alert('Error uploading image')
        } finally {
            setUploading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading gallery...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation */}
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">📸 Responsive Gallery</h1>
                    <a
                        href="/responsive-images"
                        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Full Gallery View
                    </a>
                </div>
            </nav>

            <div className="container mx-auto p-8">
                {/* Upload Form */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>

                    <form onSubmit={handleUpload} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Image Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter image title"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Choose Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Supported formats: JPG, PNG, GIF, WebP
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                        >
                            {uploading ? 'Uploading...' : 'Upload Image'}
                        </button>
                    </form>
                </div>

                {/* Gallery Grid */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">
                        Gallery ({images.length} images)
                    </h2>

                    {images.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {images.map((image) => (
                                <div key={image.id} className="relative group">
                                    <div className="aspect-square overflow-hidden rounded-lg shadow-md">
                                        <img
                                            src={image.image_url}
                                            srcSet={image.srcset}
                                            sizes={image.sizes}
                                            alt={image.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                                            loading="lazy"
                                            onClick={() => setSelectedImage(image)}
                                        />
                                    </div>

                                    <div className="mt-2">
                                        <h3 className="font-medium text-gray-900 truncate">
                                            {image.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">📷</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No images yet
                            </h3>
                            <p className="text-gray-500">
                                Upload your first image to get started!
                            </p>
                        </div>
                    )}
                </div>

                {/* Responsive Images Info */}
                <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">🎯 Responsive Images Features</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="font-medium mb-2">Automatic Variants</h4>
                            <ul className="space-y-1 text-gray-600">
                                <li>• Mobile: 400px width</li>
                                <li>• Tablet: 800px width</li>
                                <li>• Desktop: 1200px width</li>
                                <li>• Large: 1600px width</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Browser Optimization</h4>
                            <ul className="space-y-1 text-gray-600">
                                <li>• Automatic size selection</li>
                                <li>• Bandwidth optimization</li>
                                <li>• Lazy loading</li>
                                <li>• Modern srcset support</li>
                            </ul>
                        </div>
                    </div>

                    {/* Debug: Show srcset for first image */}
                    {images.length > 0 && images[0].srcset && (
                        <div className="mt-4 bg-green-50 p-4 rounded">
                            <h4 className="font-medium mb-2 text-green-800">✅ Srcset Generated</h4>
                            <div className="text-sm text-green-700">
                                <p className="mb-1"><strong>Sizes:</strong> {images[0].sizes}</p>
                                <p className="mb-1"><strong>Srcset:</strong></p>
                                <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                                    {images[0].srcset}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-gray-900/60 bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative max-w-7xl max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 z-10 transition-all duration-200"
                        >
                            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image Container */}
                        <div className="relative">
                            {/* Responsive srcset image (loads first) */}
                            <img
                                src={selectedImage.image_url}
                                srcSet={selectedImage.srcset}
                                sizes="100vw"
                                alt={selectedImage.title}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                loading="eager"
                            />

                            {/* High resolution image (loads on top when ready) */}
                            <img
                                src={getHighestResImage(selectedImage)}
                                alt={selectedImage.title}
                                className={`absolute inset-0 max-w-auto max-h-full rounded-lg shadow-2xl transition-opacity duration-300 ${modalImageLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                loading="eager"
                                onLoad={() => setModalImageLoaded(true)}
                            />
                        </div>

                        {/* Image Info */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-6 rounded-b-lg">
                            <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
                            <div className="text-sm text-gray-300 space-y-1">
                                <p>Original: {selectedImage.original_filename}</p>
                                <p>Uploaded: {new Date(selectedImage.created_at).toLocaleDateString()}</p>
                                {selectedImage.srcset && (
                                    <p className="text-xs text-gray-400 mt-2">
                                        Responsive variants available (mobile, tablet, desktop, large)
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Gallery
