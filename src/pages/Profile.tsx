
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronRight, Pencil, Check, Trophy, Users, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  chips_balance: number;
}

const Profile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [statusText, setStatusText] = useState('STAYING HUMBLE NEVER FUMBLES 🙏🇺🇸');

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async (): Promise<Profile | null> => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data;
    },
    onSuccess: (data) => {
      if (data) {
        setUsername(data.username || '');
      }
    }
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (newUsername: string) => {
      if (!user) throw new Error('No user found');
      
      const { error } = await supabase
        .from('profiles')
        .update({ username: newUsername })
        .eq('id', user.id);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast.success('Profile updated successfully');
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(`Failed to update profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  const handleUpdateProfile = () => {
    if (username.trim()) {
      updateProfileMutation.mutate(username);
    }
  };

  // Simulated stats data
  const stats = {
    totalHands: 136181,
    handMaxProfit: "1.88B",
    winRate: "22%"
  };

  const achievements = [
    { id: 1, name: "Royal Flush", image: "/lovable-uploads/bebfd6ec-2045-4ab9-8528-3e3cb1d3f0d7.png", progress: "3/5" },
    { id: 2, name: "Straight Flush", image: "/lovable-uploads/bebfd6ec-2045-4ab9-8528-3e3cb1d3f0d7.png", progress: "10/10" },
    { id: 3, name: "Poker Kills", image: "/lovable-uploads/bebfd6ec-2045-4ab9-8528-3e3cb1d3f0d7.png", progress: "1/3" },
    { id: 4, name: "All In 1000", image: "/lovable-uploads/bebfd6ec-2045-4ab9-8528-3e3cb1d3f0d7.png", progress: "1000/1000" }
  ];

  const fans = [
    { id: 1, name: "Jason", chips: "7.27B", avatar: "https://i.pravatar.cc/100?img=1" },
    { id: 2, name: "Madmax", chips: "6.01B", avatar: "https://i.pravatar.cc/100?img=2" },
    { id: 3, name: "REAL30BABY", chips: "3.12B", avatar: "https://i.pravatar.cc/100?img=3" }
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-40">
          <div className="w-10 h-10 border-4 border-poker-gold border-solid rounded-full border-t-transparent animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="relative">
          <h1 className="text-xl font-bold text-center mb-4">My Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="flex flex-col items-center">
          <div className="relative mb-2">
            <Avatar className="w-24 h-24 border-2 border-poker-gold">
              {profile?.avatar_url ? (
                <AvatarImage src={profile.avatar_url} alt={profile.username} />
              ) : (
                <AvatarFallback className="bg-poker-darkGold text-black text-3xl">
                  {profile?.username.substring(0, 2).toUpperCase() || 'U'}
                </AvatarFallback>
              )}
            </Avatar>
            <button className="absolute bottom-0 right-0 bg-poker-gold rounded-full p-1">
              <Pencil size={16} className="text-black" />
            </button>
          </div>

          {isEditing ? (
            <div className="flex items-center gap-2 mb-1">
              <Input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="poker-input h-8 px-2 py-1 text-lg font-bold"
              />
              <Button 
                size="sm" 
                className="bg-poker-gold text-black h-8 w-8 p-0 rounded-full"
                onClick={handleUpdateProfile}
              >
                <Check size={16} />
              </Button>
            </div>
          ) : (
            <h2 className="text-xl font-bold text-poker-gold flex items-center gap-2">
              {profile?.username}
              <button 
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-poker-gold"
              >
                <Pencil size={14} />
              </button>
              <span className="text-blue-400 ml-1">✓</span>
            </h2>
          )}

          <p className="text-xs text-gray-400 mb-2">United States 🇺🇸 ID:211855</p>
          
          <div className="bg-poker-gold/80 px-3 py-1 rounded-full flex items-center mb-2">
            <span className="text-xs font-bold text-black mr-2">VIP {Math.floor((profile?.chips_balance || 0) / 1000) + 5}</span>
            <div className="bg-black/20 h-1.5 w-20 rounded-full">
              <div className="bg-black h-1.5 rounded-full w-2/3"></div>
            </div>
            <span className="text-xs ml-1">⚡</span>
          </div>
          
          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-400">🪙</span>
            <span className="text-white font-semibold">{profile?.chips_balance?.toLocaleString() || '0'}</span>
          </div>

          <div className="flex items-center text-sm text-white">
            <Pencil size={14} className="mr-1" />
            <p className="text-sm">{statusText}</p>
            <span className="text-xs ml-1">🙏🇺🇸</span>
          </div>
        </div>

        {/* Stats Section */}
        <Card className="bg-gray-900 border-gray-800">
          <div className="p-3 flex items-center justify-between">
            <h3 className="text-white font-semibold">Data</h3>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
          <div className="flex border-t border-gray-800">
            <div className="flex-1 p-3 text-center border-r border-gray-800">
              <p className="text-sm text-blue-400">Total Hands</p>
              <p className="text-white font-bold">{stats.totalHands}</p>
            </div>
            <div className="flex-1 p-3 text-center border-r border-gray-800">
              <p className="text-sm text-blue-400">Hand Max Profit</p>
              <p className="text-white font-bold">{stats.handMaxProfit}</p>
            </div>
            <div className="flex-1 p-3 text-center">
              <p className="text-sm text-blue-400">Win Rate</p>
              <p className="text-white font-bold">{stats.winRate}</p>
            </div>
          </div>
        </Card>

        {/* Achievements Section */}
        <Card className="bg-gray-900 border-gray-800">
          <div className="p-3 flex items-center justify-between">
            <h3 className="text-white font-semibold">Achievements</h3>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
          <div className="p-3 border-t border-gray-800 grid grid-cols-4 gap-2">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex flex-col items-center">
                <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center mb-1 overflow-hidden">
                  {achievement.id % 2 === 0 ? (
                    <Trophy className="text-poker-gold" size={24} />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-700 to-purple-900 flex items-center justify-center">
                      <span className="text-2xl text-white font-bold">{achievement.id}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 text-center">{achievement.name}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Fans Section */}
        <Card className="bg-gray-900 border-gray-800">
          <div className="p-3 flex items-center justify-between">
            <h3 className="text-white font-semibold flex items-center">
              <span>Big fans</span>
              <span className="ml-1 text-gray-500 text-sm">ⓘ</span>
            </h3>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
          <div className="p-3 border-t border-gray-800 flex justify-between">
            {fans.map((fan) => (
              <div key={fan.id} className="flex flex-col items-center">
                <Avatar className="w-12 h-12 mb-1">
                  <AvatarImage src={fan.avatar} alt={fan.name} />
                  <AvatarFallback className="bg-poker-darkGold">{fan.name[0]}</AvatarFallback>
                </Avatar>
                <p className="text-xs text-orange-500">{fan.name}</p>
                <p className="text-xs text-yellow-500">{fan.chips}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Gifts Section */}
        <Card className="bg-gray-900 border-gray-800">
          <div className="p-3 flex items-center justify-between">
            <h3 className="text-white font-semibold">Gifts received (0 gifts for sale)</h3>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
