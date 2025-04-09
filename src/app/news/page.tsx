'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageSquare, Share2, Maximize, Minimize, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

const NewsPage = () => {
  // This would be fetched from your backend API
  const dummyNews = [
    {
      id: 1,
      title: 'Market Data Costs Soar to Unsustainable Levels, Experts Warn',
      date: '3 Mar 2025',
      time: '12:56:04',
      description: 'Two analytics firms have jointly analysed the market data industry, concluding that rising costs are unsustainable. Substantive Research CEO Mike Charades warns that vendor price hikes outpace banks and asset managers\' budget growth, making current spending levels unviable. Without adjustments, financial firms may struggle to manage escalating data expenses.',
      source: 'Economic Times',
      imageUrl: '/news.svg',
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
      imageUrl: '/news.svg',
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
      imageUrl: '/news.svg',
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
      imageUrl: '/news.svg',
      likes: 29,
      comments: 11
    },
    {
      id: 5,
      title: 'Financial Firms Struggle with Data Cost Management',
      date: '28 Feb 2025',
      time: '14:20:33',
      description: 'Asset managers across the industry report difficulties in managing the increasing costs of market data while maintaining profitability.',
      source: 'Reuters',
      imageUrl: '/news.svg',
      likes: 29,
      comments: 11
    },


  ];

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [news, setNews] = useState(dummyNews);
  const [loading, setLoading] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const imageContainerRef = useRef(null);
  const [progress, setProgress] = useState(100);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Simulating API fetch
    const fetchNews = async () => {
      try {
        setLoading(true);
        // In production, this would be replaced with actual API call
        setTimeout(() => {
          setNews(dummyNews);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Reset isLiked when changing news
  useEffect(() => {
    setIsLiked(false);
  }, [currentNewsIndex]);

  useEffect(() => {
    // Reset progress when changing news
    setProgress(100);

    // Clear any existing interval
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    // Start new progress interval
    progressInterval.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          handleNextNews();
          return 100;
        }
        return prevProgress - 1;
      });
    }, 150); // 150ms = 15 seconds total (100 steps * 150ms = 15s)

    // Cleanup interval on unmount or news change
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentNewsIndex]);

  const handleNextNews = () => {
    if (currentNewsIndex < news.length - 1) {
      setCurrentNewsIndex(currentNewsIndex + 1);
    } else {
      // Loop back to the first news if at the end
      setCurrentNewsIndex(0);
    }
  };

  const handlePreviousNews = () => {
    if (currentNewsIndex > 0) {
      setCurrentNewsIndex(currentNewsIndex - 1);
    } else {
      // Loop to the last news if at the beginning
      setCurrentNewsIndex(news.length - 1);
    }
  };

  const toggleEnlarged = () => {
    setIsEnlarged(!isEnlarged);
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);

    // Clone news array
    const updatedNews = [...news];

    // Update like count
    if (!isLiked) {
      updatedNews[currentNewsIndex].likes += 1;
    } else {
      updatedNews[currentNewsIndex].likes -= 1;
    }

    setNews(updatedNews);
  };

  const currentNews = news[currentNewsIndex];

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading news...</div>;
  }

  if (!news.length) {
    return <div className="flex items-center justify-center h-screen">No news available</div>;
  }

  return (
    <div className="mx-auto px-4 pb-8">
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar - Previous News */}
        <div className="w-full mr-6 md:w-1/4 pr-0 md:pr-4 mb-4 md:mb-0">
          <h2 className="text-lg font-medium mb-4">Previous News</h2>
          <div className="space-y-2 max-h-screen overflow-y-auto">
            {news.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-start p-3 cursor-pointer rounded-md transition-colors duration-200 ${currentNewsIndex === index
                  ? 'bg-[#F4F4F9] hover:bg-gray-200'
                  : 'hover:bg-gray-50'
                  }`}
                onClick={() => setCurrentNewsIndex(index)}
              >
                <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - News Article */}
        <div className={`w-full bg-[#F4F4F9] rounded-lg md:w-2/4 transition-all duration-300 ${isEnlarged ? 'fixed top-0 left-0 w-full h-full bg-white z-50 p-8' : ''}`}>
          {/* News Image with Progress Bar */}
          <div className="relative bg-gray-100 rounded-t-lg overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
            <Image
              src={currentNews.imageUrl}
              alt={currentNews.title}
              fill
              className="object-cover"
            />
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
              <div
                className="h-full bg-green-500 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* News Header - Date and Time */}
          <div className="flex px-4 justify-between mb-4">
            <div className="text-sm text-gray-500">{currentNews.date}</div>
            <div className="text-sm flex gap-1 items-center justify-between text-gray-500"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.00033 10.666C7.238 10.666 8.42499 10.1743 9.30016 9.29918C10.1753 8.42401 10.667 7.23703 10.667 5.99935C10.667 4.76167 10.1753 3.57469 9.30016 2.69952C8.42499 1.82435 7.238 1.33268 6.00033 1.33268C4.76265 1.33268 3.57566 1.82435 2.70049 2.69952C1.82532 3.57469 1.33366 4.76167 1.33366 5.99935C1.33366 7.23703 1.82532 8.42401 2.70049 9.29918C3.57566 10.1743 4.76265 10.666 6.00033 10.666ZM6.00033 0.166016C6.76637 0.166016 7.52491 0.316899 8.23265 0.610052C8.94038 0.903204 9.58344 1.33288 10.1251 1.87456C10.6668 2.41623 11.0965 3.0593 11.3896 3.76703C11.6828 4.47476 11.8337 5.2333 11.8337 5.99935C11.8337 7.54644 11.2191 9.03018 10.1251 10.1241C9.03115 11.2181 7.54742 11.8327 6.00033 11.8327C2.77449 11.8327 0.166992 9.20768 0.166992 5.99935C0.166992 4.45225 0.781574 2.96852 1.87554 1.87456C2.9695 0.780597 4.45323 0.166016 6.00033 0.166016ZM6.29199 3.08268V6.14518L8.91699 7.70268L8.47949 8.42018L5.41699 6.58268V3.08268H6.29199Z" fill="black" />
            </svg>
              {currentNews.time}</div>
          </div>

          {/* News Info */}
          <div className="mb-6 px-4">
            <h1 className="text-2xl font-bold mb-4">{currentNews.title}</h1>

            <p className="text-gray-700 text-base mb-4">
              {currentNews.description}
            </p>

            <div className="text-sm text-gray-500">
              Source: {currentNews.source}
            </div>
          </div>
        </div>

        {/* Right Side Icons - Hide in fullscreen mode */}
        {!isEnlarged && (
          <div className='bottom-0 right-52 z-10'>
            <div className="mt-[20rem] ml-6 px-2 py-4 gap-y-5 grid grid-row-3">
              <div className="flex flex-col items-center">
                <button
                  className="p-2 rounded-full bg-[#F4F4F9] flex items-center justify-center text-gray-600"
                  onClick={toggleLike}
                >
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.856838 6.10816C0.856838 10.0308 4.14387 13.8887 9.32762 17.2036C9.53034 17.3231 9.80652 17.4523 9.9998 17.4523C10.1931 17.4523 10.4693 17.3234 10.6629 17.2036C15.8557 13.8887 19.1432 10.0308 19.1432 6.10855C19.1432 2.84902 16.9054 0.546875 13.9221 0.546875C12.2096 0.546875 10.8283 1.35734 9.9998 2.60034C9.17087 1.36677 7.78095 0.546875 6.07752 0.546875C3.09416 0.546875 0.856445 2.84902 0.856445 6.10855M2.3387 6.10855C2.3387 3.65948 3.9223 2.02991 6.05866 2.02991C7.78959 2.02991 8.77487 3.10713 9.3732 4.02798C9.62187 4.39609 9.77862 4.49745 9.99941 4.49745C10.2202 4.49745 10.3585 4.38705 10.6256 4.02798C11.2514 3.12559 12.2183 2.02991 13.9402 2.02991C16.0765 2.02991 17.6601 3.65948 17.6601 6.10895C17.6601 9.53387 14.0415 13.2263 10.1837 15.7858C10.0913 15.8502 10.0363 15.8966 9.99941 15.8966C9.96248 15.8966 9.89805 15.8506 9.80612 15.7858C5.9573 13.2259 2.33909 9.53387 2.33909 6.10855" fill="black" />
                  </svg>

                </button>
                <span className="text-sm mt-1">{currentNews.likes}</span>
              </div>

              <div className="flex flex-col items-center">
                <button className="p-2 rounded-full bg-[#F4F4F9] flex items-center justify-center text-gray-600">
                  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 16C10.9834 16 12.4334 15.5601 13.6668 14.736C14.9001 13.9119 15.8614 12.7406 16.4291 11.3701C16.9967 9.99968 17.1453 8.49168 16.8559 7.03682C16.5665 5.58197 15.8522 4.2456 14.8033 3.1967C13.7544 2.14781 12.418 1.4335 10.9632 1.14411C9.50832 0.854725 8.00032 1.00325 6.62987 1.57091C5.25943 2.13856 4.08809 3.09986 3.26398 4.33323C2.43987 5.56659 2 7.01664 2 8.5C2 9.74 2.3 10.9083 2.83333 11.9392L2 16L6.06083 15.1667C7.09083 15.6992 8.26083 16 9.5 16Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                </button>
                <span className="text-sm mt-1">{currentNews.comments}</span>
              </div>

              <div className="flex flex-col items-center">
                <button className="p-2 rounded-full bg-[#F4F4F9] flex items-center justify-center text-gray-600">
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18 7L10.8325 14V10.512C6.30029 9.60429 2.71875 10.6055 0 13.9377C0.47168 7.08355 5.31592 3.77544 10.8325 3.55594V0L18 7Z" fill="black" />
                  </svg>


                </button>
                <span className="text-sm mt-1">Share</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
          <button
            onClick={handlePreviousNews}
            className="p-2 rounded-full flex justify-center items-center bg-[#F4F4F9]  hover:bg-gray-100 transition-colors"
            aria-label="Previous news"
          >
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.41036 1.07816C7.48794 1.00095 7.57997 0.939787 7.68119 0.898155C7.78198 0.855801 7.8902 0.833984 7.99953 0.833984C8.10885 0.833984 8.21707 0.855801 8.31786 0.898155C8.41908 0.939787 8.51111 1.00095 8.58869 1.07816L15.2554 7.74482C15.4072 7.90199 15.4912 8.11249 15.4893 8.33099C15.4874 8.54949 15.3997 8.7585 15.2452 8.913C15.0907 9.06751 14.8817 9.15515 14.6632 9.15705C14.4447 9.15895 14.2342 9.07495 14.077 8.92315L8.83286 3.67899V18.334C8.83286 18.555 8.74506 18.767 8.58878 18.9232C8.4325 19.0795 8.22054 19.1673 7.99953 19.1673C7.77851 19.1673 7.56655 19.0795 7.41027 18.9232C7.25399 18.767 7.16619 18.555 7.16619 18.334V3.67899L1.92203 8.92315C1.76486 9.07495 1.55436 9.15895 1.33586 9.15705C1.11736 9.15515 0.90835 9.06751 0.753843 8.913C0.599337 8.7585 0.511696 8.54949 0.509797 8.33099C0.507898 8.11249 0.591894 7.90199 0.743692 7.74482L7.41036 1.07816Z" fill="#1A1A1A" />
            </svg>

          </button>
          <button
            onClick={handleNextNews}
            className="p-2 rounded-full flex justify-center items-center bg-[#F4F4F9] hover:bg-gray-100 transition-colors"
            aria-label="Next news"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.41036 18.9218C9.48794 18.999 9.57997 19.0602 9.68119 19.1018C9.78198 19.1442 9.8902 19.166 9.99953 19.166C10.1088 19.166 10.2171 19.1442 10.3179 19.1018C10.4191 19.0602 10.5111 18.999 10.5887 18.9218L17.2554 12.2552C17.4072 12.098 17.4912 11.8875 17.4893 11.669C17.4874 11.4505 17.3997 11.2415 17.2452 11.087C17.0907 10.9325 16.8817 10.8448 16.6632 10.843C16.4447 10.8411 16.2342 10.925 16.077 11.0768L10.8329 16.321V1.66601C10.8329 1.445 10.7451 1.23304 10.5888 1.07676C10.4325 0.920475 10.2205 0.832678 9.99953 0.832678C9.77851 0.832678 9.56655 0.920475 9.41027 1.07676C9.25399 1.23304 9.16619 1.445 9.16619 1.66601V16.321L3.92203 11.0768C3.76486 10.925 3.55436 10.8411 3.33586 10.843C3.11736 10.8448 2.90835 10.9325 2.75384 11.087C2.59934 11.2415 2.5117 11.4505 2.5098 11.669C2.5079 11.8875 2.59189 12.098 2.74369 12.2552L9.41036 18.9218Z" fill="#1A1A1A" />
            </svg>

          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;