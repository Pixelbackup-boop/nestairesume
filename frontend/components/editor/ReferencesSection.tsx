'use client';

import { useResumeStore, Reference } from '../../store/useResumeStore';
import CRUDListSection, { FieldConfig } from '../ui/CRUDListSection';

const REFERENCE_FIELDS: FieldConfig[] = [
  { name: 'name', placeholder: 'Full Name *', required: true, colSpan: 2 },
  { name: 'title', placeholder: 'Job Title' },
  { name: 'company', placeholder: 'Company' },
  { name: 'email', placeholder: 'Email (optional)', type: 'email' },
  { name: 'phone', placeholder: 'Phone (optional)', type: 'tel' },
];

export default function ReferencesSection() {
  const { resumeData, addReference, updateReference, removeReference } = useResumeStore();

  return (
    <CRUDListSection<Reference>
      items={resumeData.references}
      fields={REFERENCE_FIELDS}
      onAdd={addReference}
      onUpdate={updateReference}
      onRemove={removeReference}
      addButtonText="Add Reference"
      emptyMessage="No references added yet."
      titleField="name"
      description="Add professional references (optional, can be provided upon request)."
      subtitleRenderer={(ref) => (
        <>
          {ref.title && <span>{ref.title}</span>}
          {ref.title && ref.company && <span> at </span>}
          {ref.company && <span>{ref.company}</span>}
        </>
      )}
      createEmptyItem={() => ({ name: '', title: '', company: '', phone: '', email: '' })}
    />
  );
}
