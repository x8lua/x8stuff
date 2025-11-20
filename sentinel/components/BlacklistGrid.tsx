import React from 'react';
import { BlacklistedUser } from '../types';
import { Trash2, AlertTriangle } from 'lucide-react';

interface BlacklistGridProps {
  users: BlacklistedUser[];
  onRemove: (id: number) => void;
}

export const BlacklistGrid: React.FC<BlacklistGridProps> = ({ users, onRemove }) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-12 px-4 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/50">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold text-slate-400 mb-2">Registry Empty</h3>
        <p className="text-slate-600">No users have been blacklisted yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <div 
          key={user.id} 
          className="group relative bg-slate-900 border border-slate-700 rounded-xl p-4 flex items-center gap-4 shadow-lg hover:border-red-500/50 transition-colors"
        >
          <div className="relative w-16 h-16 shrink-0">
            <img 
              src={user.avatarUrl} 
              alt={user.username}
              className="w-full h-full rounded-full object-cover bg-slate-800"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 border-2 border-slate-900 rounded-full flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">!</span>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-bold truncate">{user.displayName}</h4>
            <p className="text-slate-400 text-sm truncate">@{user.username}</p>
            <p className="text-xs text-slate-600 mt-1 font-mono">
              Added: {new Date(user.timestamp).toLocaleDateString()}
            </p>
          </div>

          <button 
            onClick={() => onRemove(user.id)}
            className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            title="Remove from blacklist"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};