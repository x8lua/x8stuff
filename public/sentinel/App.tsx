import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { SearchBar } from './components/SearchBar';
import { ConfirmationCard } from './components/ConfirmationCard';
import { BlacklistTable } from './components/BlacklistTable';
import { searchRobloxUser } from './services/robloxService';
import { RobloxUser, BlacklistedUser } from './types';
import { Bell, ShieldCheck, Users, Info } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foundUser, setFoundUser] = useState<RobloxUser | null>(null);
  const [blacklist, setBlacklist] = useState<BlacklistedUser[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('roblox-blacklist');
    if (saved) {
      try {
        setBlacklist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse blacklist", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('roblox-blacklist', JSON.stringify(blacklist));
  }, [blacklist]);

  const handleSearch = async (username: string) => {
    setIsLoading(true);
    setError(null);
    setFoundUser(null);

    try {
      const user = await searchRobloxUser(username);
      if (user) {
        if (blacklist.some(b => b.id === user.id)) {
            setError(`User @${user.username} is already in the registry.`);
        } else {
            setFoundUser(user);
        }
      } else {
        setError(`User "${username}" not found.`);
      }
    } catch (err) {
      setError("Connection failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmBlacklist = () => {
    if (foundUser) {
      const newEntry: BlacklistedUser = {
        ...foundUser,
        timestamp: Date.now(),
      };
      setBlacklist(prev => [newEntry, ...prev]);
      setFoundUser(null);
    }
  };

  const handleRemoveFromBlacklist = (id: number) => {
    setBlacklist(prev => prev.filter(user => user.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex">
      
      <Sidebar />

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen bg-slate-950">
        {/* Header */}
        <header className="h-16 bg-slate-950/80 backdrop-blur border-b border-slate-900/50 flex items-center justify-between px-6 md:px-8 sticky top-0 z-20">
          <h2 className="text-lg font-semibold text-white">Dashboard</h2>
          <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>
        </header>

        {/* Main Content */}
        <main className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 border border-slate-900 p-4 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                    <Users className="w-6 h-6" />
                </div>
                <div>
                    <div className="text-2xl font-bold text-white leading-none">{blacklist.length}</div>
                    <div className="text-xs text-slate-500 font-medium mt-1">Total Registered</div>
                </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-900 p-4 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                    <div className="text-2xl font-bold text-white leading-none">Active</div>
                    <div className="text-xs text-slate-500 font-medium mt-1">System Status</div>
                </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-white">Registry Management</h1>
                    <p className="text-slate-400 text-sm">Search and manage restricted users.</p>
                </div>
                <div className="w-full md:w-96">
                    <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                    <Info className="w-5 h-5 shrink-0" />
                    {error}
                </div>
            )}

            <BlacklistTable users={blacklist} onRemove={handleRemoveFromBlacklist} />
          </div>
        </main>
      </div>

      {foundUser && (
        <ConfirmationCard 
          user={foundUser} 
          onConfirm={handleConfirmBlacklist} 
          onCancel={() => setFoundUser(null)} 
        />
      )}
    </div>
  );
};

export default App;