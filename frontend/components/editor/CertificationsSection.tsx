'use client';

import { useResumeStore, Certification } from '../../store/useResumeStore';
import { ExternalLink } from 'lucide-react';
import CRUDListSection, { FieldConfig } from '../ui/CRUDListSection';

const CERTIFICATION_FIELDS: FieldConfig[] = [
  { name: 'name', placeholder: 'Certification Name *', required: true, colSpan: 2 },
  { name: 'issuer', placeholder: 'Issuing Organization *', required: true },
  { name: 'date', placeholder: 'Date (e.g., 2023-06)' },
  { name: 'url', placeholder: 'Credential URL (optional)', colSpan: 2 },
];

export default function CertificationsSection() {
  const { resumeData, addCertification, updateCertification, removeCertification } = useResumeStore();

  return (
    <CRUDListSection<Certification>
      items={resumeData.certifications}
      fields={CERTIFICATION_FIELDS}
      onAdd={addCertification}
      onUpdate={updateCertification}
      onRemove={removeCertification}
      addButtonText="Add Certification"
      emptyMessage="No certifications added yet."
      titleField="name"
      titleRenderer={(cert) => (
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
      )}
      subtitleRenderer={(cert) => (
        <span>{cert.issuer} • {cert.date}</span>
      )}
      createEmptyItem={() => ({ name: '', issuer: '', date: '', url: '' })}
      validateItem={(item) => Boolean(item.name?.trim() && item.issuer?.trim())}
    />
  );
}
