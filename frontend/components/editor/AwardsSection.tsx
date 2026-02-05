'use client';

import { useResumeStore, Award } from '../../store/useResumeStore';
import CRUDListSection, { FieldConfig } from '../ui/CRUDListSection';

const AWARD_FIELDS: FieldConfig[] = [
  { name: 'title', placeholder: 'Award Title *', required: true, colSpan: 2 },
  { name: 'issuer', placeholder: 'Issuing Organization' },
  { name: 'date', placeholder: 'Year (e.g., 2023)' },
  { name: 'description', placeholder: 'Description (optional)', type: 'textarea', colSpan: 2, rows: 2 },
];

export default function AwardsSection() {
  const { resumeData, addAward, updateAward, removeAward } = useResumeStore();

  return (
    <CRUDListSection<Award>
      items={resumeData.awards}
      fields={AWARD_FIELDS}
      onAdd={addAward}
      onUpdate={updateAward}
      onRemove={removeAward}
      addButtonText="Add Award"
      emptyMessage="No awards added yet."
      titleField="title"
      subtitleRenderer={(award) => (
        <>
          {award.issuer && <span>{award.issuer}</span>}
          {award.issuer && award.date && <span> • </span>}
          {award.date && <span>{award.date}</span>}
        </>
      )}
      createEmptyItem={() => ({ title: '', issuer: '', date: '', description: '' })}
    />
  );
}
