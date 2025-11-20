import React from 'react';
import { BlacklistedUser } from '../types';
import { Trash2, Copy, UserX } from 'lucide-react';

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
      <div className="rounded-xl border border-slate-800/50 bg-slate-900/30 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800">
          <UserX className="w-8 h-8 text-slate-600" />
        </div>
        <h3 className="text-slate-300 font-medium">No Active Restrictions</h3>
        <p className="text-slate-500 text-sm mt-1">Search for a user to add them to the blacklist.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800/50 bg-slate-900/30 overflow-hidden backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800/50 text-slate-500">
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium">Registered</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                        src={user.avatarUrl} 
                        alt="" 
                        className="w-9 h-9 rounded-full bg-slate-800 object-cover ring-2 ring-slate-900" 
                    />
                    <div>
                      <div className="font-medium text-slate-200">{user.displayName}</div>
                      <div className="text-slate-500 text-xs">@{user.username}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => copyToClipboard(user.id.toString())}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-mono text-xs"
                  >
                    {user.id}
                    <Copy className="w-3 h-3 opacity-50" />
                  </button>
                </td>
                <td className="px-6 py-4 text-slate-400 text-xs">
                  {new Date(user.timestamp).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onRemove(user.id)}
                    className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-all"
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