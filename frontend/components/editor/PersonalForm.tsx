'use client';


import { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, Wand2, Loader2 } from 'lucide-react';
import api from '../../lib/api';

export default function PersonalForm() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resumeData;
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const handleGenerateSummary = async () => {
    if (!personalInfo.jobTitle) return;
    setIsGenerating(true);
    try {
      const response = await api.post('/ai/generate-summary', {
        job_title: personalInfo.jobTitle,
        experience: "Generated based on job title" // MVP simplification
      });
      updatePersonalInfo({ summary: response.data.summary });
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>
        <p className="text-gray-400 text-sm">Start with your contact details and professional summary.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full bg-bg-card-light border border-border-subtle rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Job Title</label>
          <div className="relative">
            <Briefcase size={16} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="jobTitle"
              value={personalInfo.jobTitle}
              onChange={handleChange}
              placeholder="Software Engineer"
              className="w-full bg-bg-card-light border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
            />
          </div>
        </div>

        {/* ... existing fields ... */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full bg-bg-card-light border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Phone</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-bg-card-light border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Location</label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="location"
              value={personalInfo.location}
              onChange={handleChange}
              placeholder="New York, NY"
              className="w-full bg-bg-card-light border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Website</label>
          <div className="relative">
            <Globe size={16} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="website"
              value={personalInfo.website}
              onChange={handleChange}
              placeholder="johndoe.com"
              className="w-full bg-bg-card-light border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
            />
          </div>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-300">LinkedIn</label>
          <div className="relative">
            <Linkedin size={16} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="linkedin"
              value={personalInfo.linkedin}
              onChange={handleChange}
              placeholder="linkedin.com/in/johndoe"
              className="w-full bg-bg-card-light border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">Professional Summary</label>
          <button
            onClick={handleGenerateSummary}
            disabled={isGenerating || !personalInfo.jobTitle}
            className="text-xs flex items-center gap-1.5 text-accent-green hover:text-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
            Generate with AI
          </button>
        </div>
        <textarea
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          rows={4}
          placeholder="Experienced Software Engineer with a passion for building scalable web applications..."
          className="w-full bg-bg-card-light border border-border-subtle rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-green transition resize-none"
        />
      </div>
    </div>
  );
}
