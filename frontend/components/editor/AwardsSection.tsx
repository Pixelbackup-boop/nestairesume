'use client';

import { useResumeStore, Award } from '../../store/useResumeStore';
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function AwardsSection() {
    const { resumeData, addAward, updateAward, removeAward } = useResumeStore();
    const { awards } = resumeData;
    const [isAdding, setIsAdding] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [newAward, setNewAward] = useState({ title: '', issuer: '', date: '', description: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAward.title.trim()) return;

        const award: Award = {
            id: uuidv4(),
            title: newAward.title.trim(),
            issuer: newAward.issuer.trim(),
            date: newAward.date,
            description: newAward.description.trim() || undefined,
        };
        addAward(award);
        setNewAward({ title: '', issuer: '', date: '', description: '' });
        setIsAdding(false);
    };

    return (
        <div className="space-y-4">
            {/* Add Button or Form */}
            {!isAdding ? (
                <button
                    onClick={() => setIsAdding(true)}
                    className="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-border-subtle rounded-lg text-gray-400 hover:text-accent-green hover:border-accent-green/50 transition"
                >
                    <Plus size={18} />
                    <span className="text-sm">Add Award</span>
                </button>
            ) : (
                <form onSubmit={handleAdd} className="bg-bg-card border border-border-subtle rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            value={newAward.title}
                            onChange={(e) => setNewAward({ ...newAward, title: e.target.value })}
                            placeholder="Award Title *"
                            className="col-span-2 bg-bg-card-light border border-border-subtle rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-green"
                        />
                        <input
                            type="text"
                            value={newAward.issuer}
                            onChange={(e) => setNewAward({ ...newAward, issuer: e.target.value })}
                            placeholder="Issuing Organization"
                            className="bg-bg-card-light border border-border-subtle rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-green"
                        />
                        <input
                            type="text"
                            value={newAward.date}
                            onChange={(e) => setNewAward({ ...newAward, date: e.target.value })}
                            placeholder="Year (e.g., 2023)"
                            className="bg-bg-card-light border border-border-subtle rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-green"
                        />
                        <textarea
                            value={newAward.description}
                            onChange={(e) => setNewAward({ ...newAward, description: e.target.value })}
                            placeholder="Description (optional)"
                            rows={2}
                            className="col-span-2 bg-bg-card-light border border-border-subtle rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-green resize-none"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => { setIsAdding(false); setNewAward({ title: '', issuer: '', date: '', description: '' }); }}
                            className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!newAward.title.trim()}
                            className="px-3 py-1.5 bg-accent-green text-bg-primary rounded-lg text-sm font-medium hover:bg-accent-teal transition disabled:opacity-50"
                        >
                            Add
                        </button>
                    </div>
                </form>
            )}

            {/* Awards List */}
            <div className="space-y-2">
                {awards.map((award) => (
                    <div
                        key={award.id}
                        className="bg-bg-card border border-border-subtle rounded-lg overflow-hidden"
                    >
                        <div
                            className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-white/5 transition"
                            onClick={() => setExpandedId(expandedId === award.id ? null : award.id)}
                        >
                            <div className="flex-1">
                                <span className="text-white font-medium text-sm">{award.title}</span>
                                <div className="text-xs text-gray-500">
                                    {award.issuer && <span>{award.issuer}</span>}
                                    {award.issuer && award.date && <span> • </span>}
                                    {award.date && <span>{award.date}</span>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeAward(award.id); }}
                                    className="text-gray-500 hover:text-red-400 transition p-1"
                                >
                                    <X size={14} />
                                </button>
                                {expandedId === award.id ? (
                                    <ChevronUp size={14} className="text-gray-500" />
                                ) : (
                                    <ChevronDown size={14} className="text-gray-500" />
                                )}
                            </div>
                        </div>

                        {expandedId === award.id && (
                            <div className="px-3 pb-3 pt-2 border-t border-border-subtle grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    value={award.title}
                                    onChange={(e) => updateAward(award.id, { title: e.target.value })}
                                    placeholder="Award Title"
                                    className="col-span-2 bg-bg-card-light border border-border-subtle rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-accent-green"
                                />
                                <input
                                    type="text"
                                    value={award.issuer}
                                    onChange={(e) => updateAward(award.id, { issuer: e.target.value })}
                                    placeholder="Issuer"
                                    className="bg-bg-card-light border border-border-subtle rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-accent-green"
                                />
                                <input
                                    type="text"
                                    value={award.date}
                                    onChange={(e) => updateAward(award.id, { date: e.target.value })}
                                    placeholder="Year"
                                    className="bg-bg-card-light border border-border-subtle rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-accent-green"
                                />
                                <textarea
                                    value={award.description || ''}
                                    onChange={(e) => updateAward(award.id, { description: e.target.value || undefined })}
                                    placeholder="Description (optional)"
                                    rows={2}
                                    className="col-span-2 bg-bg-card-light border border-border-subtle rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-accent-green resize-none"
                                />
                            </div>
                        )}
                    </div>
                ))}

                {awards.length === 0 && !isAdding && (
                    <p className="text-gray-500 text-sm italic text-center py-2">No awards added yet.</p>
                )}
            </div>
        </div>
    );
}
