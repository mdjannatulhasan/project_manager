import React from 'react'

const ResponsiveImagesDemo = () => {
    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-blue-800">📱 Responsive Images with Srcset</h2>

                <div className="space-y-6">
                    {/* Basic Srcset Demo */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Basic Srcset Implementation</h3>
                        <div className="bg-gray-50 p-4 rounded">
                            <div className="mb-2">
                                <strong>HTML Generated:</strong>
                            </div>
                            <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
                                {`<img 
                                    src="/assets/hero_mobile.jpg" 
                                    srcset="
                                        /assets/hero_mobile.jpg 400w,
                                        /assets/hero_tablet.jpg 800w,
                                        /assets/hero_desktop.jpg 1200w,
                                        /assets/hero_large.jpg 1600w
                                    "
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    alt="Responsive Hero Image"
                                    class="w-full h-auto"
                                    loading="lazy"
                                    />`}
                            </pre>
                        </div>
                    </div>

                    {/* Picture Element Demo */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Picture Element with Multiple Formats</h3>
                        <div className="bg-gray-50 p-4 rounded">
                            <div className="mb-2">
                                <strong>HTML Generated:</strong>
                            </div>
                            <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
                                {`<picture class="w-full h-auto">
                                    <source 
                                        srcset="
                                        /assets/hero_mobile.webp 400w,
                                        /assets/hero_tablet.webp 800w,
                                        /assets/hero_desktop.webp 1200w
                                        "
                                        type="image/webp"
                                    />
                                    <source 
                                        srcset="
                                        /assets/hero_mobile.jpg 400w,
                                        /assets/hero_tablet.jpg 800w,
                                        /assets/hero_desktop.jpg 1200w
                                        "
                                        type="image/jpeg"
                                    />
                                    <img src="/assets/hero_mobile.jpg" alt="Responsive Picture" loading="lazy" />
                                    </picture>`}
                            </pre>
                        </div>
                    </div>

                    {/* Breakpoint Explanation */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Breakpoint Strategy</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-blue-100 p-3 rounded text-center">
                                <div className="font-bold text-blue-800">Mobile</div>
                                <div className="text-sm text-blue-600">400px width</div>
                                <div className="text-xs text-gray-600">≤ 768px</div>
                            </div>
                            <div className="bg-green-100 p-3 rounded text-center">
                                <div className="font-bold text-green-800">Tablet</div>
                                <div className="text-sm text-green-600">800px width</div>
                                <div className="text-xs text-gray-600">768px - 1024px</div>
                            </div>
                            <div className="bg-purple-100 p-3 rounded text-center">
                                <div className="font-bold text-purple-800">Desktop</div>
                                <div className="text-sm text-purple-600">1200px width</div>
                                <div className="text-xs text-gray-600">1024px - 1440px</div>
                            </div>
                            <div className="bg-orange-100 p-3 rounded text-center">
                                <div className="font-bold text-orange-800">Large</div>
                                <div className="text-sm text-orange-600">1600px width</div>
                                <div className="text-xs text-gray-600">≥ 1440px</div>
                            </div>
                        </div>
                    </div>

                    {/* Sizes Attribute Explanation */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Sizes Attribute Logic</h3>
                        <div className="bg-yellow-50 p-4 rounded">
                            <div className="mb-2">
                                <strong>sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"</strong>
                            </div>
                            <ul className="text-sm space-y-1">
                                <li>• <strong>≤ 768px:</strong> Image takes 100% of viewport width</li>
                                <li>• <strong>768px - 1200px:</strong> Image takes 50% of viewport width</li>
                                <li>• <strong> 1200px:</strong> Image takes 33% of viewport width</li>
                            </ul>
                        </div>
                    </div>

                    {/* Performance Benefits */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Performance Benefits</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-green-50 p-4 rounded">
                                <h4 className="font-semibold text-green-800 mb-2">Bandwidth Savings</h4>
                                <ul className="text-sm space-y-1 text-green-700">
                                    <li>• Mobile users get 400px images (smaller file size)</li>
                                    <li>• Desktop users get 1600px images (higher quality)</li>
                                    <li>• Browser chooses optimal size automatically</li>
                                </ul>
                            </div>
                            <div className="bg-blue-50 p-4 rounded">
                                <h4 className="font-semibold text-blue-800 mb-2">Modern Format Support</h4>
                                <ul className="text-sm space-y-1 text-blue-700">
                                    <li>• WebP format for modern browsers (30% smaller)</li>
                                    <li>• JPEG fallback for older browsers</li>
                                    <li>• Progressive enhancement approach</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Ruby Helper Usage */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Ruby Helper Usage</h3>
                        <div className="bg-gray-50 p-4 rounded">
                            <div className="mb-3">
                                <strong>In your ERB templates:</strong>
                            </div>
                            <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
                                {`<!-- Basic responsive image -->
                                    <%= responsive_srcset_image("hero.jpg", 
                                        alt: "Hero Image", 
                                        class: "rounded-lg shadow-md"
                                    ) %>

                                    <!-- Picture element with multiple formats -->
                                    <%= responsive_picture_tag("banner.jpg", 
                                        alt: "Banner Image",
                                        formats: ['webp', 'jpg'],
                                        class: "w-full h-64 object-cover"
                                    ) %>`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Real Example with Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-green-800">🎯 Live Example</h2>

                <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-2">Responsive Hero Image</h3>
                        <p className="text-blue-100">This would be a responsive image that adapts to screen size</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white p-4 rounded-lg">
                            <h4 className="font-semibold">Mobile View (400px)</h4>
                            <p className="text-sm text-green-100">Smaller image, faster loading</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-400 to-pink-500 text-white p-4 rounded-lg">
                            <h4 className="font-semibold">Desktop View (1200px)</h4>
                            <p className="text-sm text-purple-100">High quality, crisp details</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResponsiveImagesDemo
