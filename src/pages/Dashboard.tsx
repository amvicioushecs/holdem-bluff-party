
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import GameCard from '@/components/GameCard';
import { Users, Gamepad, DollarSign } from 'lucide-react';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero text */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">
            Face-to-Face <span className="text-poker-gold">WORLDWIDE</span>
          </h1>
          <p className="text-gray-400">Hold'em Poker</p>
        </div>
        
        {/* Game types */}
        <div className="flex justify-center gap-6">
          <GameCard 
            title="CASH" 
            to="/cash-game"
            icon={<DollarSign />}
          />
          
          <GameCard 
            title="FRIENDS" 
            to="/friends-game"
            icon={<Users />}
          />
        </div>
        
        <div className="flex justify-center gap-6">
          <GameCard 
            title="SNG" 
            to="/sit-and-go"
            icon={<Gamepad />}
          />
          
          <GameCard 
            title="TOURNEY" 
            to="/tournament"
            icon={<DollarSign />}
          />
        </div>
        
        {/* Recent tables */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Recent Tables</h2>
          
          <div className="bg-gray-900 rounded-lg p-4 border border-poker-darkGold/20">
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-poker-darkGold/20 flex items-center justify-center text-poker-gold">
                      T{i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Texas Hold'em</p>
                      <p className="text-xs text-gray-400">Blinds: 10/20</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-xs bg-poker-gold text-black rounded-full font-semibold">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Daily challenge */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-poker-darkGold/30 to-black border border-poker-gold/30">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white">Daily Challenge</h3>
              <p className="text-xs text-gray-400">Win 3 hands in a row</p>
            </div>
            <div className="bg-poker-gold/20 px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-poker-gold">1/3</span>
            </div>
          </div>
          
          <div className="mt-2 w-full bg-gray-800 rounded-full h-1.5">
            <div className="bg-poker-gold h-1.5 rounded-full w-1/3"></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
