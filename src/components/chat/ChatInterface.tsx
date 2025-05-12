import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Search, Send, Play, Pause } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ChatConversationPreview from './ChatConversationPreview';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  is_read: boolean;
  has_media?: boolean;
  media_duration?: string;
}

interface ChatContact {
  id: string;
  username: string;
  avatar_url: string | null;
  last_message?: string;
  status?: 'online' | 'offline';
}

const ChatInterface = () => {
  const { user } = useAuth();
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Temporary hard-coded contacts for demonstration
  const demoContacts: ChatContact[] = [
    {
      id: '1',
      username: 'Home name',
      avatar_url: null,
      last_message: 'I took great photos there. You have to join next time!',
      status: 'online'
    },
    {
      id: '2',
      username: 'Home name',
      avatar_url: null,
      last_message: 'Let me know when you are free',
      status: 'online'
    },
    {
      id: '3',
      username: 'Name name',
      avatar_url: null,
      last_message: 'See you tomorrow',
      status: 'offline'
    },
    {
      id: '4',
      username: 'Name name',
      avatar_url: null,
      status: 'online'
    },
    {
      id: '5',
      username: 'Name name',
      avatar_url: null,
      status: 'offline'
    }
  ];

  // Temporary hard-coded conversations for demonstration
  const demoConversations = demoContacts.map(contact => ({
    id: contact.id,
    contact: contact,
    lastMessage: {
      content: 'Conversation preview...',
      timestamp: '3:30 PM',
      is_read: Math.random() > 0.5
    }
  }));

  // Temporary hard-coded messages for demonstration
  const demoMessages: Message[] = [
    {
      id: '1',
      content: 'I took great photos there. You have to join next time!',
      sender_id: '1',
      receiver_id: user?.id || '',
      created_at: '2023-05-07T23:53:00Z',
      is_read: true
    },
    {
      id: '2',
      content: 'Absolutely. When?',
      sender_id: user?.id || '',
      receiver_id: '1',
      created_at: '2023-05-07T11:00:00Z',
      is_read: true
    },
    {
      id: '3',
      content: '',
      sender_id: user?.id || '',
      receiver_id: '1',
      created_at: '2023-05-07T11:03:00Z',
      is_read: true,
      has_media: true,
      media_duration: '0:34'
    }
  ];

  // Load contacts from Supabase (simplified for demo)
  const { data: contacts, isLoading: contactsLoading } = useQuery({
    queryKey: ['chat-contacts', user?.id],
    queryFn: async () => {
      // For demo purposes, we'll just return the hard-coded contacts
      return demoContacts;
    },
    enabled: !!user
  });

  const handleContactSelect = (contact: ChatContact) => {
    setSelectedContact(contact);
    // In a real app, you'd fetch messages for this contact
    setMessages(demoMessages);
  };
  
  const handleConversationSelect = (contactId: string) => {
    const contact = contacts?.find(c => c.id === contactId);
    if (contact) {
      handleContactSelect(contact);
    }
  };

  const filteredConversations = demoConversations.filter(convo => 
    convo.contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() && !isPlaying) return;
    
    if (selectedContact) {
      const newMsg: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender_id: user?.id || '',
        receiver_id: selectedContact.id,
        created_at: new Date().toISOString(),
        is_read: false
      };
      
      setMessages([...messages, newMsg]);
      setNewMessage('');
      
      // In a real app, you'd save this message to Supabase
      // For now, we'll just show a toast
      toast.success('Message sent');
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // If we have selected a contact, show the messages view
  if (selectedContact) {
    // Return the existing chat messages interface
    return (
      <div className="flex flex-col h-[calc(100vh-200px)] bg-black">
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedContact && messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isCurrentUser={message.sender_id === user?.id}
              contactName={selectedContact.username}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message input */}
        <form onSubmit={handleSendMessage} className="border-t border-poker-darkGold/30 p-4">
          <div className="flex bg-black border border-poker-darkGold/30 rounded-full overflow-hidden">
            <button 
              type="button"
              className="p-2 text-gray-400 hover:text-gray-300"
              onClick={() => toast.info('Feature coming soon!')}
            >
              <span className="text-xl">•••</span>
            </button>
            
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type here..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-white"
            />
            
            <button 
              type="submit"
              className="px-4 text-poker-gold"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Otherwise, show the inbox view
  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-black">
      {/* Search bar */}
      <div className="px-4 py-3 border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <Input 
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-none rounded-full text-gray-200"
          />
        </div>
      </div>

      {/* Contacts row */}
      <div className="px-4 py-3 overflow-x-auto">
        <div className="flex gap-3">
          {/* New group button */}
          <div className="flex flex-col items-center">
            <Avatar className="w-12 h-12 bg-gray-700">
              <AvatarFallback className="text-gray-400">
                <span className="text-xl">+</span>
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-poker-gold mt-1">New<br/>group</span>
          </div>
          
          {/* Contact avatars */}
          {contacts?.map(contact => (
            <div 
              key={contact.id} 
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleContactSelect(contact)}
            >
              <Avatar className="w-12 h-12 border-2 border-transparent hover:border-poker-gold">
                {contact.avatar_url ? (
                  <AvatarImage src={contact.avatar_url} alt={contact.username} />
                ) : (
                  <AvatarFallback className="bg-gray-700 text-white">
                    {contact.username.substring(0, 1).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-xs text-poker-gold mt-1 whitespace-nowrap">{contact.username}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <ChatConversationPreview
            key={conversation.id}
            username={conversation.contact.username}
            avatarUrl={conversation.contact.avatar_url}
            lastMessage={conversation.lastMessage.content}
            timestamp={conversation.lastMessage.timestamp}
            isRead={conversation.lastMessage.is_read}
            onClick={() => handleConversationSelect(conversation.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatInterface;
