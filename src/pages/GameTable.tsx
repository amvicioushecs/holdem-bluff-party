
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import PokerTable from '@/components/poker/PokerTable';
import PlayerCards from '@/components/poker/PlayerCards';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const GameTable = () => {
  const { id } = useParams<{ id: string }>();
  const [showChat, setShowChat] = useState(false);
  
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full relative">
        <div className="absolute top-2 left-2 z-10">
          <div className="flex items-center gap-2">
            <div className="bg-black/70 px-3 py-1 rounded-full border border-poker-gold/30">
              <span className="text-xs text-poker-gold">Game #{id || '1'}</span>
            </div>
            <div className="bg-black/70 px-3 py-1 rounded-full border border-poker-gold/30">
              <span className="text-xs text-white">Blinds: 10/20</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <PokerTable />
        </div>
        
        <div className="fixed bottom-16 left-0 w-full px-4">
          <PlayerCards />
        </div>
        
        <div className="fixed bottom-16 right-4 z-10">
          <Button
            onClick={() => setShowChat(!showChat)}
            variant="outline"
            size="icon"
            className="rounded-full bg-poker-gold border-none text-black"
          >
            <MessageSquare size={20} />
          </Button>
        </div>
        
        {showChat && (
          <div className="fixed bottom-24 right-4 w-64 h-64 bg-black border border-poker-gold/30 rounded-lg shadow-lg z-10 p-2">
            <div className="text-center border-b border-poker-gold/20 pb-1 mb-2">
              <span className="text-xs text-poker-gold">Table Chat</span>
            </div>
            <div className="h-[calc(100%-40px)] overflow-y-auto">
              {/* Chat messages would go here */}
              <div className="text-xs text-gray-400">No messages yet</div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default GameTable;
