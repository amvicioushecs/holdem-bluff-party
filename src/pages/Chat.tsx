
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChatInterface from '@/components/chat/ChatInterface';

const Chat = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        <ChatInterface />
      </div>
    </DashboardLayout>
  );
};

export default Chat;
