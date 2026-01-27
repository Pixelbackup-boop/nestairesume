'use client';

import { useResumeStore, Reference } from '../../store/useResumeStore';
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
// Using native crypto.randomUUID() instead of uuid package

export default function ReferencesSection() {
    const { resumeData, addReference, updateReference, removeReference } = useResumeStore();
    const { references } = resumeData;
    const [isAdding, setIsAdding] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [newRef, setNewRef] = useState({ name: '', title: '', company: '', phone: '', email: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newRef.name.trim()) return;

        const ref: Reference = {
            id: crypto.randomUUID(),
            name: newRef.name.trim(),
            title: newRef.title.trim(),
            company: newRef.company.trim(),
            phone: newRef.phone.trim() || undefined,
            email: newRef.email.trim() || undefined,
        };
        addReference(ref);
        setNewRef({ name: '', title: '', company: '', phone: '', email: '' });
        setIsAdding(false);
    };

    return (
        <div className="space-y-4">
            <p className="text-xs text-gray-500">Add professional references (optional, can be provided upon request).</p>

            {/* Add Button or Form */}
            {!isAdding ? (
                <button
                    onClick={() => setIsAdding(true)}
                    className="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-border-subtle rounded-lg text-gray-400 hover:text-accent-green hover:border-accent-green/50 transition"
                >
                    <Plus size={18} />
                    <span className="text-sm">Add Reference</span>
                </button>
            ) : (
                <form onSubmit={handleAdd} className="bg-bg-card border border-border-subtle rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            value={newRef.name}
                            onChange={(e) => setNewRef({ ...newRef, name: e.target.value })}
                            placeholder="Full Name *"
                            className="col-span-2 bg-bg-card-light border border-border-subtle rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                        />
                        <input
                            type="text"
                            value={newRef.title}
                            onChange={(e) => setNewRef({ ...newRef, title: e.target.value })}
                            placeholder="Job Title"
                            className="bg-bg-card-light border border-border-subtle rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                        />
                        <input
                            type="text"
                            value={newRef.company}
                            onChange={(e) => setNewRef({ ...newRef, company: e.target.value })}
                            placeholder="Company"
                            className="bg-bg-card-light border border-border-subtle rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                        />
                        <input
                            type="email"
                            value={newRef.email}
                            onChange={(e) => setNewRef({ ...newRef, email: e.target.value })}
                            placeholder="Email (optional)"
                            className="bg-bg-card-light border border-border-subtle rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                        />
                        <input
                            type="tel"
                            value={newRef.phone}
                            onChange={(e) => setNewRef({ ...newRef, phone: e.target.value })}
                            placeholder="Phone (optional)"
                            className="bg-bg-card-light border border-border-subtle rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => { setIsAdding(false); setNewRef({ name: '', title: '', company: '', phone: '', email: '' }); }}
                            className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-900 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!newRef.name.trim()}
                            className="px-3 py-1.5 bg-accent-green text-bg-primary rounded-lg text-sm font-medium hover:bg-accent-teal transition disabled:opacity-50"
                        >
                            Add
                        </button>
                    </div>
                </form>
            )}

            {/* References List */}
            <div className="space-y-2">
                {references.map((ref) => (
                    <div
                        key={ref.id}
                        className="bg-bg-card border border-border-subtle rounded-lg overflow-hidden"
                    >
                        <div
                            className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-white/5 transition"
                            onClick={() => setExpandedId(expandedId === ref.id ? null : ref.id)}
                        >
                            <div className="flex-1">
                                <span className="text-gray-900 font-medium text-sm">{ref.name}</span>
                                <div className="text-xs text-gray-500">
                                    {ref.title && <span>{ref.title}</span>}
                                    {ref.title && ref.company && <span> at </span>}
                                    {ref.company && <span>{ref.company}</span>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeReference(ref.id); }}
                                    className="text-gray-500 hover:text-red-400 transition p-1"
                                >
                                    <X size={14} />
                                </button>
                                {expandedId === ref.id ? (
                                    <ChevronUp size={14} className="text-gray-500" />
                                ) : (
                                    <ChevronDown size={14} className="text-gray-500" />
                                )}
                            </div>
                        </div>

                        {expandedId === ref.id && (
                            <div className="px-3 pb-3 pt-2 border-t border-border-subtle grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    value={ref.name}
                                    onChange={(e) => updateReference(ref.id, { name: e.target.value })}
                                    placeholder="Full Name"
                                    className="col-span-2 bg-bg-card-light border border-border-subtle rounded px-2 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                                />
                                <input
                                    type="text"
                                    value={ref.title}
                                    onChange={(e) => updateReference(ref.id, { title: e.target.value })}
                                    placeholder="Job Title"
                                    className="bg-bg-card-light border border-border-subtle rounded px-2 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                                />
                                <input
                                    type="text"
                                    value={ref.company}
                                    onChange={(e) => updateReference(ref.id, { company: e.target.value })}
                                    placeholder="Company"
                                    className="bg-bg-card-light border border-border-subtle rounded px-2 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                                />
                                <input
                                    type="email"
                                    value={ref.email || ''}
                                    onChange={(e) => updateReference(ref.id, { email: e.target.value || undefined })}
                                    placeholder="Email"
                                    className="bg-bg-card-light border border-border-subtle rounded px-2 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                                />
                                <input
                                    type="tel"
                                    value={ref.phone || ''}
                                    onChange={(e) => updateReference(ref.id, { phone: e.target.value || undefined })}
                                    placeholder="Phone"
                                    className="bg-bg-card-light border border-border-subtle rounded px-2 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                                />
                            </div>
                        )}
                    </div>
                ))}

                {references.length === 0 && !isAdding && (
                    <p className="text-gray-500 text-sm italic text-center py-2">No references added yet.</p>
                )}
            </div>
        </div>
    );
}
