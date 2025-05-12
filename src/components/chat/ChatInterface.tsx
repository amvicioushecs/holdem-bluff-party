
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Heart, Send, Play, Pause } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
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
}

const ChatInterface = () => {
  const { user } = useAuth();
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Temporary hard-coded contacts for demonstration
  const demoContacts: ChatContact[] = [
    {
      id: '1',
      username: 'Todo',
      avatar_url: null,
      last_message: 'I took great photos there. You have to join next time!'
    }
  ];

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
    },
    {
      id: '4',
      content: 'Yay!',
      sender_id: '1',
      receiver_id: user?.id || '',
      created_at: '2023-05-07T11:05:00Z',
      is_read: true
    },
    {
      id: '5',
      content: "I'm so excited!",
      sender_id: user?.id || '',
      receiver_id: '1',
      created_at: '2023-05-07T11:09:00Z',
      is_read: true
    }
  ];

  // Load contacts from Supabase (simplified for demo)
  const { data: contacts, isLoading: contactsLoading } = useQuery({
    queryKey: ['chat-contacts', user?.id],
    queryFn: async () => {
      // For demo purposes, we'll just return the hard-coded contacts
      // In a real implementation, we would fetch from Supabase
      return demoContacts;
    },
    enabled: !!user
  });

  useEffect(() => {
    // Auto-select the first contact
    if (contacts && contacts.length > 0 && !selectedContact) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts, selectedContact]);

  useEffect(() => {
    // Load messages when a contact is selected (hardcoded for demo)
    if (selectedContact) {
      setMessages(demoMessages);
    }
  }, [selectedContact]);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
};

export default ChatInterface;
