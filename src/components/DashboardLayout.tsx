
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { 
  Users, 
  MessageSquare, 
  User, 
  Gamepad, 
  Menu,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  chips_balance: number;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const { data: profile } = useQuery({
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
    enabled: !!user
  });
  
  const navItems = [
    { icon: <Users size={20} />, label: 'Friends', path: '/friends' },
    { icon: <Gamepad size={20} />, label: 'Games', path: '/dashboard' },
    { icon: <MessageSquare size={20} />, label: 'Chat', path: '/chat' },
    { icon: <User size={20} />, label: 'Profile', path: '/profile' },
    { icon: <Menu size={20} />, label: 'Menu', path: '/menu' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-poker-darkGold/30 p-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden">
              {profile?.avatar_url ? (
                <AvatarImage src={profile.avatar_url} alt={profile.username} />
              ) : (
                <AvatarFallback className="bg-poker-darkGold text-black">
                  {profile?.username.substring(0, 2).toUpperCase() || 'U'}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="text-sm font-bold text-white">{profile?.username || 'Loading...'}</p>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400">Lv.{Math.floor((profile?.chips_balance || 0) / 100)}</span>
                <div className="flex items-center gap-0.5">
                  <span className="text-poker-gold text-xs">💰</span>
                  <span className="text-xs font-medium text-poker-gold">
                    {profile?.chips_balance?.toLocaleString() || '0'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleSignOut}
              className="text-gray-400 hover:text-white"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
            <Link 
              to="/store" 
              className="bg-poker-gold px-4 py-1 rounded-full text-black text-xs font-bold"
            >
              STORE
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 pb-16">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Logo size="sm" />
          </div>
          
          {children}
        </div>
      </main>
      
      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-poker-darkGold/30">
        <div className="flex justify-around py-2">
          {navItems.map((item, index) => (
            <Link 
              key={index}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'text-poker-gold' : 'text-gray-500'}`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default DashboardLayout;
