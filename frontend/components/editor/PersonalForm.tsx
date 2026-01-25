'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useResumeStore, ImageShape, IdDocumentType } from '../../store/useResumeStore';
import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, Wand2, Loader2, Camera, X, User, Circle, Square, RectangleHorizontal, Flag, CreditCard, ChevronDown, Share2, Users, FileText } from 'lucide-react';
import { generateSummaryOnly } from '../../lib/aiResumeGenerator';
import Image from 'next/image';
import ImageCropper from './ImageCropper';
import CollapsibleSection from './CollapsibleSection';
import SocialLinksSection from './SocialLinksSection';
import ReferencesSection from './ReferencesSection';

export default function PersonalForm() {
  const t = useTranslations('Builder');
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo, references } = resumeData;
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const shapes: { id: ImageShape; label: string; icon: typeof Circle }[] = [
    { id: 'circle', label: t('shapes.circle'), icon: Circle },
    { id: 'rounded', label: t('shapes.rounded'), icon: RectangleHorizontal },
    { id: 'square', label: t('shapes.square'), icon: Square },
  ];

  const idDocumentTypes: { value: IdDocumentType; label: string }[] = [
    { value: '', label: t('selectDocType') },
    { value: 'id', label: t('nationalId') },
    { value: 'passport', label: t('passport') },
    { value: 'driving_license', label: t('drivingLicense') },
  ];

  const getShapeClass = (shape: ImageShape) => {
    switch (shape) {
      case 'circle': return 'rounded-full';
      case 'rounded': return 'rounded-xl';
      case 'square': return 'rounded-none';
      default: return 'rounded-full';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleGenerateSummary = () => {
    if (!personalInfo.jobTitle) return;
    setIsGenerating(true);

    // Small delay for visual feedback
    setTimeout(() => {
      const summary = generateSummaryOnly(personalInfo.jobTitle, 'mid');
      updatePersonalInfo({ summary });
      setIsGenerating(false);
    }, 500);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">{t('personalInfo.title')}</h2>
        <p className="text-gray-400 text-sm">{t('personalInfo.subtitle')}</p>
      </div>

      {/* Profile Image Upload - Compact */}
      <div className="flex items-center gap-4">
        <div className="relative group">
          <div className={`w-16 h-16 overflow-hidden bg-bg-card-light border-2 border-dashed border-border-subtle group-hover:border-accent-green/50 transition-colors ${getShapeClass(personalInfo.imageShape || 'circle')}`}>
            {personalInfo.profileImage ? (
              <Image
                src={personalInfo.profileImage}
                alt="Profile"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <User size={24} />
              </div>
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity ${getShapeClass(personalInfo.imageShape || 'circle')}`}
          >
            <Camera size={18} className="text-white" />
          </button>
          {personalInfo.profileImage && (
            <button
              onClick={handleRemoveImage}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition shadow-lg z-10"
            >
              <X size={12} />
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
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-300 block mb-2">{t('profilePhoto')}</label>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 text-xs font-medium text-accent-green border border-accent-green/30 rounded-lg hover:bg-accent-green/10 transition"
            >
              {personalInfo.profileImage ? t('change') : t('upload')}
            </button>
            {personalInfo.profileImage && (
              <>
                {shapes.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => handleShapeChange(shape.id)}
                    title={shape.label}
                    className={`p-1.5 rounded-md border transition ${
                      personalInfo.imageShape === shape.id
                        ? 'border-accent-green bg-accent-green/10 text-accent-green'
                        : 'border-border-subtle text-gray-400 hover:border-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <shape.icon size={14} />
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">{t('fullName')}</label>
          <input
            type="text"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            placeholder={t('fullNamePlaceholder')}
            className="w-full bg-bg-card-light border border-border-subtle rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">{t('jobTitle')}</label>
          <div className="relative">
            <Briefcase size={16} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="jobTitle"
              value={personalInfo.jobTitle}
              onChange={handleChange}
              placeholder={t('jobTitlePlaceholder')}
              className="w-full bg-bg-card-light border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">{t('email')}</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
              className="w-full bg-bg-card-light border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">{t('phone')}</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              placeholder={t('phonePlaceholder')}
              className="w-full bg-bg-card-light border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">{t('location')}</label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="location"
              value={personalInfo.location}
              onChange={handleChange}
              placeholder={t('locationPlaceholder')}
              className="w-full bg-bg-card-light border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">{t('website')}</label>
          <div className="relative">
            <Globe size={16} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="website"
              value={personalInfo.website}
              onChange={handleChange}
              placeholder={t('websitePlaceholder')}
              className="w-full bg-bg-card-light border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
            />
          </div>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-300">{t('linkedin')}</label>
          <div className="relative">
            <Linkedin size={16} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="linkedin"
              value={personalInfo.linkedin}
              onChange={handleChange}
              placeholder={t('linkedinPlaceholder')}
              className="w-full bg-bg-card-light border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
            />
          </div>
        </div>

        {/* Nationality */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">{t('nationality')}</label>
          <div className="relative">
            <Flag size={16} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="nationality"
              value={personalInfo.nationality || ''}
              onChange={handleChange}
              placeholder={t('nationalityPlaceholder')}
              className="w-full bg-bg-card-light border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
            />
          </div>
        </div>

        {/* ID Document */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">{t('idDocument')}</label>
          <div className="flex gap-3">
            {/* Document Type Dropdown */}
            <div className="relative w-2/5">
              <CreditCard size={16} className="absolute left-3 top-3 text-gray-500 pointer-events-none" />
              <select
                name="idType"
                value={personalInfo.idType || ''}
                onChange={handleChange}
                className="w-full bg-bg-card-light border border-border-subtle rounded-lg pl-10 pr-8 py-2.5 text-white focus:outline-none focus:border-accent-green transition appearance-none cursor-pointer"
              >
                {idDocumentTypes.map((type) => (
                  <option key={type.value} value={type.value} className="bg-slate-800">
                    {type.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
            </div>
            {/* Document Number */}
            <input
              type="text"
              name="idNumber"
              value={personalInfo.idNumber || ''}
              onChange={handleChange}
              placeholder={t('documentNumber')}
              disabled={!personalInfo.idType}
              className="flex-1 bg-bg-card-light border border-border-subtle rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">{t('professionalSummary')}</label>
          <button
            onClick={handleGenerateSummary}
            disabled={isGenerating || !personalInfo.jobTitle}
            className="text-xs flex items-center gap-1.5 text-accent-green hover:text-accent-teal transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
            {t('generateWithAI')}
          </button>
        </div>
        <textarea
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          rows={4}
          placeholder={t('summaryPlaceholder')}
          className="w-full bg-bg-card-light border border-border-subtle rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-green transition resize-none"
        />
      </div>

      {/* Additional Sections */}
      <div className="mt-8 pt-6 border-t border-border-subtle space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">{t('additionalInfo')}</h3>

        <CollapsibleSection
          title={t('socialLinks')}
          icon={Share2}
          defaultOpen={false}
        >
          <SocialLinksSection />
        </CollapsibleSection>

        <CollapsibleSection
          title={t('references')}
          icon={Users}
          badge={references.length}
          defaultOpen={false}
        >
          <ReferencesSection />
        </CollapsibleSection>

        <CollapsibleSection
          title={t('customField')}
          icon={FileText}
          defaultOpen={false}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">{t('sectionLabel')}</label>
              <input
                type="text"
                name="customFieldLabel"
                value={personalInfo.customFieldLabel || ''}
                onChange={handleChange}
                placeholder={t('sectionLabelPlaceholder')}
                className="w-full bg-bg-card-light border border-border-subtle rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent-green transition"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">{t('content')}</label>
              <textarea
                name="customField"
                value={personalInfo.customField || ''}
                onChange={handleChange}
                rows={4}
                placeholder={t('contentPlaceholder')}
                className="w-full bg-bg-card-light border border-border-subtle rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-green transition resize-none"
              />
            </div>
          </div>
        </CollapsibleSection>
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
