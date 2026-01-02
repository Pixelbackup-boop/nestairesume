'use client';

import { useState, useRef } from 'react';
import { useResumeStore, ImageShape } from '../../store/useResumeStore';
import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, Wand2, Loader2, Camera, X, User, Circle, Square, RectangleHorizontal } from 'lucide-react';
import api from '../../lib/api';
import Image from 'next/image';
import ImageCropper from './ImageCropper';

export default function PersonalForm() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resumeData;
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const shapes: { id: ImageShape; label: string; icon: typeof Circle }[] = [
    { id: 'circle', label: 'Circle', icon: Circle },
    { id: 'rounded', label: 'Rounded', icon: RectangleHorizontal },
    { id: 'square', label: 'Square', icon: Square },
  ];

  const getShapeClass = (shape: ImageShape) => {
    switch (shape) {
      case 'circle': return 'rounded-full';
      case 'rounded': return 'rounded-xl';
      case 'square': return 'rounded-none';
      default: return 'rounded-full';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setTempImage(base64);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImage: string, shape: ImageShape) => {
    updatePersonalInfo({ profileImage: croppedImage, imageShape: shape });
    setShowCropper(false);
    setTempImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setTempImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = () => {
    updatePersonalInfo({ profileImage: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleShapeChange = (shape: ImageShape) => {
    updatePersonalInfo({ imageShape: shape });
  };

  const handleGenerateSummary = async () => {
    if (!personalInfo.jobTitle) return;
    setIsGenerating(true);
    try {
      const response = await api.post('/ai/generate-summary', {
        job_title: personalInfo.jobTitle,
        experience: "Generated based on job title"
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

      {/* Profile Image Upload */}
      <div className="bg-bg-card-light border border-border-subtle rounded-xl p-5">
        <label className="text-sm font-medium text-gray-300 mb-4 block">Profile Photo</label>

        <div className="flex items-start gap-6">
          {/* Image Preview */}
          <div className="relative group">
            <div className={`w-28 h-28 overflow-hidden bg-bg-card border-2 border-dashed border-border-subtle group-hover:border-accent-green/50 transition-colors ${getShapeClass(personalInfo.imageShape || 'circle')}`}>
              {personalInfo.profileImage ? (
                <Image
                  src={personalInfo.profileImage}
                  alt="Profile"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                  <User size={32} />
                  <span className="text-xs mt-1">No photo</span>
                </div>
              )}
            </div>

            {/* Upload overlay */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity ${getShapeClass(personalInfo.imageShape || 'circle')}`}
            >
              <Camera size={24} className="text-white" />
            </button>

            {/* Remove button */}
            {personalInfo.profileImage && (
              <button
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition shadow-lg z-10"
              >
                <X size={14} />
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          {/* Controls */}
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-3">
                Upload a professional headshot. You can crop and adjust after selecting.
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 text-sm font-medium text-accent-green border border-accent-green/30 rounded-lg hover:bg-accent-green/10 transition"
              >
                {personalInfo.profileImage ? 'Change Photo' : 'Upload Photo'}
              </button>
            </div>

            {/* Shape Options */}
            {personalInfo.profileImage && (
              <div>
                <label className="text-xs font-medium text-gray-400 mb-2 block">Photo Shape</label>
                <div className="flex gap-2">
                  {shapes.map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => handleShapeChange(shape.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition ${
                        personalInfo.imageShape === shape.id
                          ? 'border-accent-green bg-accent-green/10 text-accent-green'
                          : 'border-border-subtle text-gray-400 hover:border-gray-500 hover:text-gray-300'
                      }`}
                    >
                      <shape.icon size={16} />
                      <span className="hidden sm:inline">{shape.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
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

      {/* Image Cropper Modal */}
      {showCropper && tempImage && (
        <ImageCropper
          imageSrc={tempImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          initialShape={personalInfo.imageShape || 'circle'}
        />
      )}
    </div>
  );
}
