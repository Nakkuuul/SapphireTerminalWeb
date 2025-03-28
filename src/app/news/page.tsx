'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, Heart, MessageSquare, Share2, Maximize } from 'lucide-react';

const VideoPlayerPage = () => {
  // This would be fetched from your backend API
  const dummyVideos = [
    {
      id: 1,
      title: 'Market Data Costs Soar to Unsustainable Levels, Experts Warn',
      date: '3 Mar 2025',
      time: '12:56:04',
      description: 'Two analytics firms have jointly analysed the market data industry, concluding that rising costs are unsustainable. Substantive Research CEO Mike Charades warns that vendor price hikes outpace banks and asset managers\' budget growth, making current spending levels unviable. Without adjustments, financial firms may struggle to manage escalating data expenses.',
      source: 'Economic Times',
      // YouTube embed URL - modified to embed format
      videoUrl: 'https://www.youtube.com/embed/EaLQALGEoNE',
      thumbnailUrl: '/api/placeholder/400/320',
      likes: 54,
      comments: 19
    },
    {
      id: 2,
      title: 'Experts Warn: Market Data Costs Becoming Unsustainable',
      date: '2 Mar 2025',
      time: '10:30:22',
      description: 'Financial experts are raising alarms about the rapidly increasing costs of market data services. As vendors continue to raise prices, many institutions are finding it difficult to justify the expense.',
      source: 'Bloomberg',
      // Using a different YouTube video as example
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: '/api/placeholder/400/320',
      likes: 42,
      comments: 15
    },
    {
      id: 3,
      title: 'Market Analysis: The Rising Cost of Financial Data',
      date: '1 Mar 2025',
      time: '09:15:45',
      description: 'A comprehensive analysis of the market data landscape reveals troubling trends as costs continue to escalate faster than inflation.',
      source: 'Wall Street Journal',
      videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
      thumbnailUrl: '/api/placeholder/400/320',
      likes: 38,
      comments: 22
    },
    {
      id: 4,
      title: 'Financial Firms Struggle with Data Cost Management',
      date: '28 Feb 2025',
      time: '14:20:33',
      description: 'Asset managers across the industry report difficulties in managing the increasing costs of market data while maintaining profitability.',
      source: 'Reuters',
      videoUrl: 'https://www.youtube.com/embed/jVCxuy3U6vM',
      thumbnailUrl: '/api/placeholder/400/320',
      likes: 29,
      comments: 11
    },
    {
      id: 5,
      title: 'New Solutions for Market Data Cost Challenges',
      date: '27 Feb 2025',
      time: '11:05:17',
      description: 'Innovative approaches to market data management are emerging as firms seek ways to control escalating costs.',
      source: 'Financial Times',
      videoUrl: 'https://www.youtube.com/embed/7lCDEYXw3mM',
      thumbnailUrl: '/api/placeholder/400/320',
      likes: 47,
      comments: 26
    }
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [videos, setVideos] = useState(dummyVideos);
  const [loading, setLoading] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // This useEffect would be used to fetch videos from your backend
  useEffect(() => {
    // Simulating API fetch
    const fetchVideos = async () => {
      try {
        setLoading(true);
        // In production, this would be replaced with actual API call:
        // const response = await fetch('/api/videos');
        // const data = await response.json();
        // setVideos(data);

        // Using dummy data for now
        setTimeout(() => {
          setVideos(dummyVideos);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Reset isLiked when changing videos
  useEffect(() => {
    setIsLiked(false);
  }, [currentVideoIndex]);

  const handleNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && videoContainerRef.current) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen()
          .then(() => {
            setIsFullscreen(true);
          })
          .catch(err => {
            console.error('Error attempting to enable fullscreen:', err);
          });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
          .then(() => {
            setIsFullscreen(false);
          })
          .catch(err => {
            console.error('Error attempting to exit fullscreen:', err);
          });
      }
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    
    // Clone videos array
    const updatedVideos = [...videos];
    
    // Update like count
    if (!isLiked) {
      updatedVideos[currentVideoIndex].likes += 1;
    } else {
      updatedVideos[currentVideoIndex].likes -= 1;
    }
    
    setVideos(updatedVideos);
  };

  // Handle exit fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const currentVideo = videos[currentVideoIndex];

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading videos...</div>;
  }

  if (!videos.length) {
    return <div className="flex items-center justify-center h-screen">No videos available</div>;
  }

  // Helper function to extract video ID from YouTube URL
  const getYouTubeThumbnail = (url: any) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
      const match = url.match(regExp);
      const videoId = match && match[2].length === 11 ? match[2] : null;
      return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '/api/placeholder/400/320';
    } catch (error) {
      return '/api/placeholder/400/320';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-8">
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar - Previous News */}
        <div className="w-full md:w-1/4 pr-0 md:pr-4 mb-4 md:mb-0">
          <h2 className="text-lg font-medium mb-4">Previous News</h2>
          <div className="space-y-2 max-h-screen overflow-y-auto">
            {videos.map((video, index) => (
              <div 
                key={video.id} 
                className={`flex items-start p-2 cursor-pointer rounded-md ${currentVideoIndex === index ? 'bg-blue-50' : ''}`}
                onClick={() => setCurrentVideoIndex(index)}
              >
                <img 
                  src={getYouTubeThumbnail(video.videoUrl)} 
                  alt={video.title} 
                  className="w-12 h-12 rounded-md object-cover mr-2 flex-shrink-0" 
                />
                <p className="text-xs">{video.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - Video Player */}
        <div className="w-full md:w-3/4">
          {/* Video Player */}
          <div 
            ref={videoContainerRef}
            className="relative bg-black rounded-md mb-4 overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          >
            {/* Using iframe to embed the video */}
            <iframe
              src={`${currentVideo.videoUrl}?autoplay=0&rel=0&showinfo=0&modestbranding=1`}
              title={currentVideo.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            
            {/* Next/Previous controls */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-0 top-0 bottom-0 w-16 flex items-center justify-center pointer-events-auto">
                <button 
                  onClick={handlePreviousVideo} 
                  disabled={currentVideoIndex === 0}
                  className={`p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition ${currentVideoIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <ChevronUp size={24} />
                </button>
              </div>
              
              <div className="absolute right-0 top-0 bottom-0 w-16 flex items-center justify-center pointer-events-auto">
                <button 
                  onClick={handleNextVideo} 
                  disabled={currentVideoIndex === videos.length - 1}
                  className={`p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition ${currentVideoIndex === videos.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <ChevronDown size={24} />
                </button>
              </div>
              
              <div className="absolute bottom-4 right-4 pointer-events-auto">
                <button 
                  onClick={toggleFullscreen}
                  className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition"
                >
                  <Maximize size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span>{currentVideo.date}</span>
              <span className="mx-2">•</span>
              <span>{currentVideo.time}</span>
            </div>
            
            <h1 className="text-2xl font-bold mb-4">{currentVideo.title}</h1>
            
            <p className="text-gray-700 mb-4">
              {currentVideo.description}
            </p>
            
            <div className="text-sm text-gray-500">
              Source: {currentVideo.source}
            </div>
          </div>

          {/* Interaction Bar */}
          <div className="border-t border-b py-4 grid grid-cols-3">
            <button 
              className={`flex flex-col items-center ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
              onClick={toggleLike}
            >
              <Heart fill={isLiked ? "currentColor" : "none"} size={20} />
              <span className="text-sm mt-1">{currentVideo.likes}</span>
            </button>
            
            <button className="flex flex-col items-center text-gray-600">
              <MessageSquare size={20} />
              <span className="text-sm mt-1">{currentVideo.comments}</span>
            </button>
            
            <button className="flex flex-col items-center text-gray-600">
              <Share2 size={20} />
              <span className="text-sm mt-1">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;