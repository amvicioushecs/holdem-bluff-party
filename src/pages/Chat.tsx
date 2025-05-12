
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChatInterface from '@/components/chat/ChatInterface';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Chat = () => {
  const [hasSelectedContact, setHasSelectedContact] = useState(false);

  // Check if there is a selected contact by monitoring DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      // Simple approach: check if the back button should be visible
      // based on the presence of a message input in the DOM
      const hasContact = document.querySelector('form[class*="border-t"]') !== null;
      setHasSelectedContact(hasContact);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const handleBackToInbox = () => {
    // Simulate back button click
    document.dispatchEvent(new CustomEvent('chat-back-to-inbox'));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <h1 className="sr-only">Chat</h1>
        {hasSelectedContact && (
          <div className="mb-2 -mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToInbox}
              className="text-poker-gold hover:text-poker-gold/80 hover:bg-transparent"
            >
              <ArrowLeft size={18} className="mr-1" />
              <span>Back to messages</span>
            </Button>
          </div>
        )}
        <ChatInterface />
      </div>
    </DashboardLayout>
  );
};

export default Chat;
