
import React, { useState, useRef } from 'react';
import { format } from 'date-fns';
import { Heart, Play, Pause } from 'lucide-react';

interface MessageProps {
  message: {
    content: string;
    created_at: string;
    has_media?: boolean;
    media_type?: 'audio' | 'image';
    media_url?: string;
    media_duration?: string;
  };
  isCurrentUser: boolean;
  contactName: string;
}

const ChatMessage: React.FC<MessageProps> = ({ message, isCurrentUser, contactName }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  
  const messageDate = new Date(message.created_at);
  const formattedTime = format(messageDate, 'HH:mm');
  
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
  
  const togglePlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Handle audio progress updates
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percentage);
    }
  };
  
  // Handle audio ending
  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4 relative`}>
      {isLiked && (
        <div className={`absolute ${isCurrentUser ? 'left-0' : 'right-0'} -top-2`}>
          <Heart size={16} fill="#ff0000" color="#ff0000" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isCurrentUser ? 
        'bg-poker-gold text-black rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl' : 
        'bg-gray-700 text-white rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'}`}>
        
        {message.has_media ? (
          message.media_type === 'audio' ? (
            <div className="p-2 min-w-[180px]">
              <audio 
                ref={audioRef} 
                src={message.media_url} 
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleAudioEnded}
                className="hidden"
              />
              <div className="flex items-center justify-between">
                <button 
                  onClick={togglePlayback} 
                  className={`text-${isCurrentUser ? 'black' : 'white'} p-2`}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                <div className="flex-1 px-2">
                  <div className={`h-1 bg-${isCurrentUser ? 'black/20' : 'white/20'} rounded-full`}>
                    <div 
                      className={`h-1 bg-${isCurrentUser ? 'black' : 'white'} rounded-full`} 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <span className="text-xs">{message.media_duration}</span>
              </div>
            </div>
          ) : message.media_type === 'image' ? (
            <div className="p-1">
              <img 
                src={message.media_url} 
                alt={message.content || "Image"}
                className="rounded-lg max-h-48 object-contain"
              />
            </div>
          ) : null
        ) : (
          <div className="p-3">
            <p>{message.content}</p>
          </div>
        )}
        
        <div className={`text-xs ${isCurrentUser ? 'text-black/70' : 'text-gray-300'} text-right pr-2 pb-1`}>
          {formattedTime}
        </div>
      </div>
      
      {!isCurrentUser && (
        <button 
          onClick={toggleLike} 
          className="ml-2 self-end mb-1 text-gray-400 hover:text-red-500"
        >
          <Heart size={16} fill={isLiked ? "#ff0000" : "transparent"} color={isLiked ? "#ff0000" : "#888"} />
        </button>
      )}
    </div>
  );
};

export default ChatMessage;
