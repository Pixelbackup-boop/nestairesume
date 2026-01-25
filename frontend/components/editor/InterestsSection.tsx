'use client';

import { useResumeStore, Interest } from '../../store/useResumeStore';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
// Using native crypto.randomUUID() instead of uuid package

export default function InterestsSection() {
    const { resumeData, addInterest, removeInterest } = useResumeStore();
    const { interests } = resumeData;
    const [newInterest, setNewInterest] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newInterest.trim()) return;

        const interest: Interest = {
            id: crypto.randomUUID(),
            name: newInterest.trim(),
        };
        addInterest(interest);
        setNewInterest('');
    };

    return (
        <div className="space-y-4">
            <p className="text-xs text-gray-500">Add your hobbies and personal interests.</p>

            <form onSubmit={handleAdd} className="flex gap-2">
                <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="e.g. Photography, Travel, Reading"
                    className="flex-1 bg-bg-card border border-border-subtle rounded-lg px-3 py-2 text-white text-sm focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green outline-none transition"
                />
                <button
                    type="submit"
                    disabled={!newInterest.trim()}
                    className="bg-accent-green text-bg-primary px-3 py-2 rounded-lg font-medium hover:bg-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus size={18} />
                </button>
            </form>

            {/* Interests Tags */}
            <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                    <div
                        key={interest.id}
                        className="flex items-center gap-2 bg-bg-card border border-border-subtle px-3 py-1.5 rounded-full text-sm text-gray-200"
                    >
                        <span>{interest.name}</span>
                        <button
                            onClick={() => removeInterest(interest.id)}
                            className="text-gray-500 hover:text-red-400 transition"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}

                {interests.length === 0 && (
                    <p className="text-gray-500 text-sm italic w-full text-center py-2">No interests added yet.</p>
                )}
            </div>

            {/* Quick Add */}
            <div className="flex flex-wrap gap-2">
                {['Photography', 'Travel', 'Reading', 'Music', 'Sports', 'Cooking', 'Gaming', 'Art'].map(i => (
                    <button
                        key={i}
                        onClick={() => {
                            if (!interests.find(int => int.name === i)) {
                                addInterest({ id: crypto.randomUUID(), name: i });
                            }
                        }}
                        disabled={interests.some(int => int.name === i)}
                        className="px-2 py-1 bg-bg-card border border-border-subtle rounded-md text-xs text-gray-400 hover:text-white hover:border-gray-500 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        + {i}
                    </button>
                ))}
            </div>
        </div>
    );
}
