import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { ConfirmationCard } from './components/ConfirmationCard';
import { BlacklistTable } from './components/BlacklistTable';
import { searchRobloxUser } from './services/robloxService';
import { RobloxUser, BlacklistedUser } from './types';
import { Shield, Bell, Menu, X, Users, ShieldCheck, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foundUser, setFoundUser] = useState<RobloxUser | null>(null);
  const [blacklist, setBlacklist] = useState<BlacklistedUser[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        setError(`User "${username}" not found. Check spelling.`);
      }
    } catch (err) {
      setError("Connection failed. Please retry.");
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
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col">
      
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-30 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/20">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">SENTINEL</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-white hover:text-blue-400 transition-colors">Registry</a>
              <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Analytics</a>
              <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Settings</a>
              <div className="w-px h-4 bg-slate-700"></div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden lg:block">
                   <div className="text-sm font-medium text-white">Admin</div>
                   <div className="text-xs text-slate-500">Administrator</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700"></div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-white rounded-lg"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 animate-in slide-in-from-top-5">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-slate-800">Registry</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-white hover:bg-slate-800">Analytics</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-white hover:bg-slate-800">Settings</a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Total Restricted</p>
              <h3 className="text-3xl font-bold text-white">{blacklist.length}</h3>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">System Status</p>
              <h3 className="text-3xl font-bold text-emerald-500">Active</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
             <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Action Required</p>
              <h3 className="text-3xl font-bold text-slate-400">0</h3>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg text-slate-500">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Search & Table Section */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">User Registry</h2>
              <p className="text-slate-400 mt-1">Manage restricted users and access control.</p>
            </div>
            <div className="w-full md:w-auto md:min-w-[400px]">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}

          <BlacklistTable users={blacklist} onRemove={handleRemoveFromBlacklist} />
        </div>
      </main>

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