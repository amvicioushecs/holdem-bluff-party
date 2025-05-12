
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChatInterface from '@/components/chat/ChatInterface';

const Chat = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <h1 className="sr-only">Chat</h1>
        <ChatInterface />
      </div>
    </DashboardLayout>
  );
};

export default Chat;
