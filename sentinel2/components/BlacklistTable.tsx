import React from 'react';
import { BlacklistedUser } from '../types';
import { Trash2, Copy, UserX, AlertCircle } from 'lucide-react';

interface BlacklistTableProps {
  users: BlacklistedUser[];
  onRemove: (id: number) => void;
}

export const BlacklistTable: React.FC<BlacklistTableProps> = ({ users, onRemove }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800/50 bg-slate-900/50 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-700">
          <UserX className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-slate-200 font-medium text-lg">Registry Empty</h3>
        <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">Search for a username above to add them to the restriction list.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-900/80 border-b border-slate-800">
            <tr className="text-slate-400">
              <th className="px-6 py-4 font-medium">User Profile</th>
              <th className="px-6 py-4 font-medium">Roblox ID</th>
              <th className="px-6 py-4 font-medium">Date Added</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-800/40 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                        <img 
                            src={user.avatarUrl} 
                            alt="" 
                            className="w-10 h-10 rounded-full bg-slate-800 object-cover ring-2 ring-slate-800 group-hover:ring-slate-700 transition-all" 
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 border-2 border-slate-900 rounded-full"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-200">{user.displayName}</div>
                      <div className="text-slate-500 text-xs">@{user.username}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => copyToClipboard(user.id.toString())}
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors font-mono bg-slate-950/50 px-2 py-1 rounded border border-slate-800/50 hover:border-blue-500/30"
                    title="Click to copy ID"
                  >
                    {user.id}
                    <Copy className="w-3 h-3" />
                  </button>
                </td>
                <td className="px-6 py-4 text-slate-400 text-xs">
                  {new Date(user.timestamp).toLocaleDateString()}
                  <span className="block text-slate-600 text-[10px]">
                    {new Date(user.timestamp).toLocaleTimeString()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onRemove(user.id)}
                    className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-all"
                    title="Remove restriction"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};