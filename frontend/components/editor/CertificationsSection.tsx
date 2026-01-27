'use client';

import { useResumeStore, Certification } from '../../store/useResumeStore';
import { Plus, X, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useState } from 'react';
// Using native crypto.randomUUID() instead of uuid package

export default function CertificationsSection() {
    const { resumeData, addCertification, updateCertification, removeCertification } = useResumeStore();
    const { certifications } = resumeData;
    const [isAdding, setIsAdding] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [newCert, setNewCert] = useState({ name: '', issuer: '', date: '', url: '' });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCert.name.trim() || !newCert.issuer.trim()) return;

        const cert: Certification = {
            id: crypto.randomUUID(),
            name: newCert.name.trim(),
            issuer: newCert.issuer.trim(),
            date: newCert.date,
            url: newCert.url.trim() || undefined,
        };
        addCertification(cert);
        setNewCert({ name: '', issuer: '', date: '', url: '' });
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
                    <span className="text-sm">Add Certification</span>
                </button>
            ) : (
                <form onSubmit={handleAdd} className="bg-bg-card border border-border-subtle rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            value={newCert.name}
                            onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                            placeholder="Certification Name *"
                            className="col-span-2 bg-bg-card-light border border-border-subtle rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                        />
                        <input
                            type="text"
                            value={newCert.issuer}
                            onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                            placeholder="Issuing Organization *"
                            className="bg-bg-card-light border border-border-subtle rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                        />
                        <input
                            type="text"
                            value={newCert.date}
                            onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                            placeholder="Date (e.g., 2023-06)"
                            className="bg-bg-card-light border border-border-subtle rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                        />
                        <input
                            type="text"
                            value={newCert.url}
                            onChange={(e) => setNewCert({ ...newCert, url: e.target.value })}
                            placeholder="Credential URL (optional)"
                            className="col-span-2 bg-bg-card-light border border-border-subtle rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => { setIsAdding(false); setNewCert({ name: '', issuer: '', date: '', url: '' }); }}
                            className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-900 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!newCert.name.trim() || !newCert.issuer.trim()}
                            className="px-3 py-1.5 bg-accent-green text-bg-primary rounded-lg text-sm font-medium hover:bg-accent-teal transition disabled:opacity-50"
                        >
                            Add
                        </button>
                    </div>
                </form>
            )}

            {/* Certifications List */}
            <div className="space-y-2">
                {certifications.map((cert) => (
                    <div
                        key={cert.id}
                        className="bg-bg-card border border-border-subtle rounded-lg overflow-hidden"
                    >
                        <div
                            className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-white/5 transition"
                            onClick={() => setExpandedId(expandedId === cert.id ? null : cert.id)}
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-900 font-medium text-sm">{cert.name}</span>
                                    {cert.url && (
                                        <a
                                            href={cert.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-accent-green hover:text-accent-teal"
                                        >
                                            <ExternalLink size={12} />
                                        </a>
                                    )}
                                </div>
                                <span className="text-xs text-gray-500">{cert.issuer} • {cert.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeCertification(cert.id); }}
                                    className="text-gray-500 hover:text-red-400 transition p-1"
                                >
                                    <X size={14} />
                                </button>
                                {expandedId === cert.id ? (
                                    <ChevronUp size={14} className="text-gray-500" />
                                ) : (
                                    <ChevronDown size={14} className="text-gray-500" />
                                )}
                            </div>
                        </div>

                        {expandedId === cert.id && (
                            <div className="px-3 pb-3 pt-2 border-t border-border-subtle grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    value={cert.name}
                                    onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                                    placeholder="Certification Name"
                                    className="col-span-2 bg-bg-card-light border border-border-subtle rounded px-2 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                                />
                                <input
                                    type="text"
                                    value={cert.issuer}
                                    onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                                    placeholder="Issuer"
                                    className="bg-bg-card-light border border-border-subtle rounded px-2 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                                />
                                <input
                                    type="text"
                                    value={cert.date}
                                    onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                                    placeholder="Date"
                                    className="bg-bg-card-light border border-border-subtle rounded px-2 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                                />
                                <input
                                    type="text"
                                    value={cert.url || ''}
                                    onChange={(e) => updateCertification(cert.id, { url: e.target.value || undefined })}
                                    placeholder="Credential URL (optional)"
                                    className="col-span-2 bg-bg-card-light border border-border-subtle rounded px-2 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-accent-green"
                                />
                            </div>
                        )}
                    </div>
                ))}

                {certifications.length === 0 && !isAdding && (
                    <p className="text-gray-500 text-sm italic text-center py-2">No certifications added yet.</p>
                )}
            </div>
        </div>
    );
}
