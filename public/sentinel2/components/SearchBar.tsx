import React, { useState, useCallback } from 'react';
import { Search, Loader2, UserPlus } from 'lucide-react';

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  }, [input, onSearch]);

  return (
    <div className="bg-slate-900/50 rounded-xl p-1">
        <form onSubmit={handleSubmit} className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-500" />
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search username to restrict..."
                className="w-full pl-12 pr-32 py-4 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none text-base font-medium rounded-lg transition-colors"
                disabled={isLoading}
            />
            <div className="absolute right-2">
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Searching</span>
                        </>
                    ) : (
                        <>
                            <UserPlus className="w-4 h-4" />
                            <span>Add</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    </div>
  );
};