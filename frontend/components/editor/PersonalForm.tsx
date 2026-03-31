'use client';

import { useState, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useResumeStore, ImageShape, IdDocumentType } from '../../store/useResumeStore';
import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, Wand2, Loader2, Camera, X, User, Flag, CreditCard, ChevronDown, Share2, FileText } from 'lucide-react';
import { generateSummaryOnly } from '../../lib/aiResumeGenerator';
import Image from 'next/image';
import ImageCropper from './ImageCropper';
import CollapsibleSection from './CollapsibleSection';
import SocialLinksSection from './SocialLinksSection';
import CustomFieldsSection from './CustomFieldsSection';
import IconInput from '../ui/IconInput';

export default function PersonalForm() {
  const t = useTranslations('Builder');
  const tc = useTranslations('Common');
  const locale = useLocale();
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo, customFields = [] } = resumeData;
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleCropComplete = (croppedImage: string) => {
    updatePersonalInfo({ profileImage: croppedImage });
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

  const handleGenerateSummary = () => {
    if (!personalInfo.jobTitle) return;
    setIsGenerating(true);

    // Small delay for visual feedback
    setTimeout(() => {
      let summary = generateSummaryOnly(personalInfo.jobTitle, 'mid', locale);
      // Retry once if we got the same summary to avoid feeling stuck
      if (summary === personalInfo.summary) {
        summary = generateSummaryOnly(personalInfo.jobTitle, 'mid', locale);
      }
      updatePersonalInfo({ summary });
      setIsGenerating(false);
    }, 500);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('personalInfo.title')}</h2>
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
            aria-label={tc('uploadProfilePhoto')}
            className={`absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity ${getShapeClass(personalInfo.imageShape || 'circle')}`}
          >
            <Camera size={18} className="text-gray-900" />
          </button>
          {personalInfo.profileImage && (
            <button
              onClick={handleRemoveImage}
              aria-label={tc('removeProfilePhoto')}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-gray-900 hover:bg-red-600 transition shadow-lg z-10"
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
          <label className="text-sm font-medium text-gray-700 block mb-2">{t('profilePhoto')}</label>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 text-xs font-medium text-accent-green border border-accent-green/30 rounded-lg hover:bg-accent-green/10 transition"
          >
            {personalInfo.profileImage ? t('change') : t('upload')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">{t('fullName')}</label>
          <input
            type="text"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            placeholder={t('fullNamePlaceholder')}
            className="w-full bg-bg-card-light border border-border-subtle rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-accent-green transition"
          />
        </div>
        <IconInput
          label={t('jobTitle')}
          name="jobTitle"
          value={personalInfo.jobTitle}
          onChange={handleChange}
          icon={Briefcase}
          placeholder={t('jobTitlePlaceholder')}
        />

        <IconInput
          label={t('email')}
          name="email"
          value={personalInfo.email}
          onChange={handleChange}
          icon={Mail}
          type="email"
          placeholder={t('emailPlaceholder')}
        />

        <IconInput
          label={t('phone')}
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          icon={Phone}
          type="tel"
          placeholder={t('phonePlaceholder')}
        />

        <IconInput
          label={t('location')}
          name="location"
          value={personalInfo.location}
          onChange={handleChange}
          icon={MapPin}
          placeholder={t('locationPlaceholder')}
        />

        <IconInput
          label={t('website')}
          name="website"
          value={personalInfo.website}
          onChange={handleChange}
          icon={Globe}
          type="url"
          placeholder={t('websitePlaceholder')}
        />

        <IconInput
          label={t('linkedin')}
          name="linkedin"
          value={personalInfo.linkedin}
          onChange={handleChange}
          icon={Linkedin}
          type="url"
          placeholder={t('linkedinPlaceholder')}
          className="md:col-span-2"
        />

        <IconInput
          label={t('nationality')}
          name="nationality"
          value={personalInfo.nationality || ''}
          onChange={handleChange}
          icon={Flag}
          placeholder={t('nationalityPlaceholder')}
        />

        {/* ID Document */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">{t('idDocument')}</label>
          <div className="flex gap-3">
            {/* Document Type Dropdown */}
            <div className="relative w-2/5">
              <CreditCard size={16} className="absolute left-3 top-3 text-gray-500 pointer-events-none" />
              <select
                name="idType"
                value={personalInfo.idType || ''}
                onChange={handleChange}
                aria-label={tc('documentType')}
                className="w-full bg-bg-card-light border border-border-subtle rounded-lg pl-10 pr-8 py-2.5 text-gray-900 focus:outline-none focus:border-accent-green transition appearance-none cursor-pointer"
              >
                {idDocumentTypes.map((type) => (
                  <option key={type.value} value={type.value} className="bg-white">
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
              className="flex-1 bg-bg-card-light border border-border-subtle rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-accent-green transition disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">{t('professionalSummary')}</label>
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
          className="w-full bg-bg-card-light border border-border-subtle rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-accent-green transition resize-none"
        />
      </div>

      {/* Additional Sections */}
      <div className="mt-8 pt-6 border-t border-border-subtle space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('additionalInfo')}</h3>

        <CollapsibleSection
          title={t('socialLinks')}
          icon={Share2}
          defaultOpen={false}
        >
          <SocialLinksSection />
        </CollapsibleSection>

        <CollapsibleSection
          title={t('customFields.title')}
          icon={FileText}
          badge={customFields.length}
          defaultOpen={false}
        >
          <CustomFieldsSection />
        </CollapsibleSection>
      </div>

      {/* Image Cropper Modal */}
      {showCropper && tempImage && (
        <ImageCropper
          imageSrc={tempImage}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </div>
  );
}
