import React from 'react';
import { RobloxUser } from '../types';
import { Check, X, AlertCircle } from 'lucide-react';

interface ConfirmationCardProps {
  user: RobloxUser;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationCard: React.FC<ConfirmationCardProps> = ({ user, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      ></div>

      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">
        <div className="p-6">
            <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-b from-slate-700 to-slate-900 mb-4">
                    <img 
                        src={user.avatarUrl} 
                        alt={user.username} 
                        className="w-full h-full object-cover rounded-full bg-slate-950 border-2 border-slate-800"
                    />
                </div>
                <h3 className="text-xl font-bold text-white">{user.displayName}</h3>
                <p className="text-slate-400">@{user.username}</p>
                <span className="mt-2 px-2 py-0.5 bg-slate-800 text-slate-400 text-xs font-mono rounded">ID: {user.id}</span>
            </div>

            <div className="bg-slate-950/50 rounded-lg p-3 mb-6 border border-slate-800/50 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
                <p className="text-sm text-slate-400 text-left">
                    Is this the user you want to restrict? Adding them will place them in the blacklist registry immediately.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={onCancel}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors font-medium text-sm"
                >
                    <X className="w-4 h-4" />
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 text-white hover:bg-red-500 transition-colors font-medium text-sm shadow-lg shadow-red-900/20"
                >
                    <Check className="w-4 h-4" />
                    Confirm Restriction
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};