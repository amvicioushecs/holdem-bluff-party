
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DashboardLayout from '@/components/DashboardLayout';
import { toast } from 'sonner';

// Define the Profile type
interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  chips_balance: number;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  // Fetch user profile data
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async (): Promise<Profile> => {
      if (!user?.id) throw new Error('User not authenticated');
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data as Profile;
    },
    enabled: !!user?.id
  });

  // Initialize username state when profile data loads
  React.useEffect(() => {
    if (profile?.username) {
      setUsername(profile.username);
    }
  }, [profile?.username]);

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (newUsername: string) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .update({ username: newUsername })
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    }
  });

  const handleSaveUsername = () => {
    updateProfileMutation.mutate(username);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-poker-gold border-solid rounded-full border-t-transparent animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <div className="relative">
              <Avatar className="w-24 h-24 border-2 border-poker-gold">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback className="bg-poker-darkGold text-black text-xl">
                  {profile?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="flex gap-2 items-center mb-2">
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button 
                    onClick={handleSaveUsername} 
                    disabled={updateProfileMutation.isPending}
                    size="sm"
                  >
                    {updateProfileMutation.isPending ? 'Saving...' : 'Save'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setUsername(profile?.username || '');
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{profile?.username}</h1>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0" 
                    onClick={() => setIsEditing(true)}
                  >
                    <span className="sr-only">Edit username</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                      <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                    </svg>
                  </Button>
                </div>
              )}
              
              <div className="text-gray-400 mb-4">
                Player since {new Date(profile?.created_at || '').toLocaleDateString()}
              </div>
              
              <div className="inline-flex items-center bg-black/30 px-4 py-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-poker-gold mr-2">
                  <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875z" />
                  <path d="M12 12.75c-4.97 0-9-2.183-9-4.875v1.5c0 2.692 4.03 4.875 9 4.875s9-2.183 9-4.875v-1.5c0 2.692-4.03 4.875-9 4.875z" />
                  <path d="M12 16.5c-4.97 0-9-2.183-9-4.875v1.5c0 2.692 4.03 4.875 9 4.875s9-2.183 9-4.875v-1.5c0 2.692-4.03 4.875-9 4.875z" />
                  <path d="M12 20.25c-4.97 0-9-2.183-9-4.875v1.5c0 2.692 4.03 4.875 9 4.875s9-2.183 9-4.875v-1.5c0 2.692-4.03 4.875-9 4.875z" />
                </svg>
                <span className="font-bold text-poker-gold">{profile?.chips_balance.toLocaleString()} chips</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="fans">Fans</TabsTrigger>
              <TabsTrigger value="gifts">Gifts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stats">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Game Statistics</CardTitle>
                    <CardDescription>Your poker performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Games Played</span>
                        <span>0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Win Rate</span>
                        <span>0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Best Hand</span>
                        <span>--</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Biggest Pot</span>
                        <span>0 chips</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Ranking</CardTitle>
                    <CardDescription>Your position among players</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Global Rank</span>
                        <span>#--</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Country Rank</span>
                        <span>#--</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Skill Level</span>
                        <span>Beginner</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Unlock achievements by playing games</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array(8).fill(0).map((_, i) => (
                      <div key={i} className="flex flex-col items-center opacity-40">
                        <div className="w-16 h-16 rounded-full bg-black/30 flex items-center justify-center mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-600">
                            <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.937 6.937 0 006.171 6.171.75.75 0 00.86-.585c.212-1.012.395-2.036.543-3.071h.858c.148 1.035.33 2.06.543 3.071a.75.75 0 00.859.585 6.937 6.937 0 006.171-6.171.75.75 0 00-.584-.859 48.126 48.126 0 00-3.071-.543V2.62a.75.75 0 00-.658-.744 49.213 49.213 0 00-3.685-.239c-1.233 0-2.482.08-3.685.239a.75.75 0 00-.657.744zm4.334 0v.802a48.57 48.57 0 003 0V2.621a.75.75 0 00-.564-.724 47.281 47.281 0 00-1.872-.08 47.41 47.41 0 00-1.872.08.75.75 0 00-.564.724zm5.586 9.05a6.518 6.518 0 01-1.63 3.076 6.476 6.476 0 01-3.076 1.629 49.547 49.547 0 01-3.88.177 48.59 48.59 0 01-3.88-.177 6.476 6.476 0 01-3.076-1.63 6.518 6.518 0 01-1.63-3.076 49.547 49.547 0 01-.177-3.88c0-1.328.06-2.61.177-3.88a6.518 6.518 0 011.63-3.076 6.476 6.476 0 013.076-1.63 49.547 49.547 0 013.88-.176c1.327 0 2.608.059 3.88.177a6.476 6.476 0 013.076 1.63 6.518 6.518 0 011.63 3.075c.117 1.27.177 2.552.177 3.88a48.59 48.59 0 01-.177 3.88z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-center">Locked</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="fans">
              <Card>
                <CardHeader>
                  <CardTitle>Fans</CardTitle>
                  <CardDescription>Players who follow you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 mx-auto mb-4 opacity-30">
                      <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                    </svg>
                    <p>You don't have any fans yet.</p>
                    <p className="text-sm">Play more games to gain popularity!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="gifts">
              <Card>
                <CardHeader>
                  <CardTitle>Gifts</CardTitle>
                  <CardDescription>Special items received from other players</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 mx-auto mb-4 opacity-30">
                      <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3zM11.25 12.75H3v6.75a2.25 2.25 0 002.25 2.25h6v-9zM12.75 21.75h6.75a2.25 2.25 0 002.25-2.25v-6.75h-9v9z" />
                    </svg>
                    <p>You haven't received any gifts yet.</p>
                    <p className="text-sm">Make friends with other players to receive gifts!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
