
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatConversationPreviewProps {
  username: string;
  avatarUrl: string | null;
  lastMessage: string;
  timestamp: string;
  isRead?: boolean;
  onClick: () => void;
}

const ChatConversationPreview: React.FC<ChatConversationPreviewProps> = ({
  username,
  avatarUrl,
  lastMessage,
  timestamp,
  isRead = true,
  onClick,
}) => {
  return (
    <div 
      className="flex items-center px-4 py-3 border-b border-gray-800 cursor-pointer hover:bg-gray-900"
      onClick={onClick}
    >
      <Avatar className="w-10 h-10 mr-3">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt={username} />
        ) : (
          <AvatarFallback className="bg-gray-700 text-white">
            {username.substring(0, 1).toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className={`text-sm font-medium ${isRead ? 'text-gray-300' : 'text-poker-gold'}`}>
            {username}
          </h3>
          <span className="text-xs text-gray-500">
            {timestamp}
          </span>
        </div>
        
        <p className={`text-xs truncate ${isRead ? 'text-gray-400' : 'text-gray-200'}`}>
          {lastMessage}
        </p>
      </div>
    </div>
  );
};

export default ChatConversationPreview;
