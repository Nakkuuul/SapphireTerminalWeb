'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageSquare, Share2, Maximize, Pause, Play } from 'lucide-react';

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
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [videos, setVideos] = useState(dummyVideos);
  const [loading, setLoading] = useState(false);
  const [timerWidth, setTimerWidth] = useState(100);
  const [showControls, setShowControls] = useState(true);
  const videoContainerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Simulating API fetch
    const fetchVideos = async () => {
      try {
        setLoading(true);
        // In production, this would be replaced with actual API call
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

  // Reset isLiked and timer when changing videos
  useEffect(() => {
    setIsLiked(false);
    setTimerWidth(100);
    setShowControls(true);
    
    // Start the 30-second timer
    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentVideoIndex]);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    const timerDuration = 30000; // 30 seconds
    const intervalTime = 100; // Update every 100ms for smooth animation
    const decrementPerInterval = (100 * intervalTime) / timerDuration;
    
    setTimerWidth(100);
    
    timerRef.current = setInterval(() => {
      setTimerWidth(prevWidth => {
        // If timer is completed, go to next video
        if (prevWidth <= decrementPerInterval) {
          clearInterval(timerRef.current);
          handleNextVideo();
          return 0;
        }
        return prevWidth - decrementPerInterval;
      });
    }, intervalTime);
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      // Loop back to the first video if at the end
      setCurrentVideoIndex(0);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    } else {
      // Loop to the last video if at the beginning
      setCurrentVideoIndex(videos.length - 1);
    }
  };

  const toggleEnlarged = () => {
    setIsEnlarged(!isEnlarged);
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
    
    // Pause/resume the 30-second timer
    if (!isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      startTimer();
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

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  const currentVideo = videos[currentVideoIndex];

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading videos...</div>;
  }

  if (!videos.length) {
    return <div className="flex items-center justify-center h-screen">No videos available</div>;
  }

  // Helper function to extract video ID from YouTube URL
  const getYouTubeThumbnail = (url) => {
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
    <div className="mx-auto px-4 pb-8">
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
        <div className={`w-full md:w-1/2 transition-all duration-300 ${isEnlarged ? 'md:w-full md:h-full' : ''}`}>
          {/* Video Header - Date and Time */}
          <div className="flex justify-between mb-2">
            <div className="text-sm text-gray-500">{currentVideo.date}</div>
            <div className="text-sm text-gray-500">{currentVideo.time}</div>
          </div>
          
          {/* Video Player */}
          <div 
            ref={videoContainerRef}
            className="relative bg-black rounded-md mb-0 overflow-hidden"
            style={{ 
              aspectRatio: '16/9',
              position: 'relative',
              transition: 'all 0.3s ease'
            }}
            onClick={toggleControls}
          >
            {/* Using iframe to embed the video */}
            <iframe
              src={`${currentVideo.videoUrl}?autoplay=1&rel=0&showinfo=0&modestbranding=1&controls=0`}
              title={currentVideo.title}
              className="w-full h-full pointer-events-none"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            
            {/* Video Controls */}
            {showControls && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Play/Pause Button (Top Left) */}
                <div className="absolute top-4 left-4 pointer-events-auto">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlayPause();
                    }}
                    className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition"
                  >
                    {isPaused ? (
                      <Play size={20} className="text-white" />
                    ) : (
                      <Pause size={20} className="text-white" />
                    )}
                  </button>
                </div>
                
                {/* Enlarge Button (Top Right) */}
                <div className="absolute top-4 right-4 pointer-events-auto">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEnlarged();
                    }}
                    className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition"
                  >
                    <Maximize size={20} className="text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Timer Bar */}
          {timerWidth > 0 && (
            <div className="w-full h-1 bg-gray-200">
              <div 
                className="h-full bg-green-500 transition-all" 
                style={{ width: `${timerWidth}%` }}
              ></div>
            </div>
          )}

          {/* Video Info */}
          <div className="mt-4 mb-6">
            <h1 className="text-2xl font-bold mb-4">{currentVideo.title}</h1>
            
            <p className="text-gray-700 mb-4">
              {currentVideo.description}
            </p>
            
            <div className="text-sm text-gray-500">
              Source: {currentVideo.source}
            </div>
          </div>

          {/* Interaction Bar */}
          {/* <div className="border-t border-b py-4 grid grid-cols-3">
            <button 
              className="flex flex-col items-center text-gray-600"
              onClick={toggleLike}
            >
              <Heart fill={isLiked ? "black" : "none"} stroke="currentColor" size={20} />
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
          </div> */}
        </div>
        <div className='bottom-0 right-52 z-10'>
          <div className="px-2 py-4 gap-y-5 grid grid-row-3">
            <button 
              className="flex flex-col items-center text-gray-600"
              onClick={toggleLike}
            >
              <Heart fill={isLiked ? "black" : "none"} stroke="currentColor" size={20} />
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