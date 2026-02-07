'use client';

import { useTranslations } from 'next-intl';
import { useResumeStore, CustomField } from '../../store/useResumeStore';
import CRUDListSection, { FieldConfig } from '../ui/CRUDListSection';

export default function CustomFieldsSection() {
  const t = useTranslations('Builder');
  const { resumeData, addCustomField, updateCustomField, removeCustomField } = useResumeStore();

  const CUSTOM_FIELD_FIELDS: FieldConfig[] = [
    { name: 'label', placeholder: `${t('customFields.label')} *`, required: true, colSpan: 2 },
    { name: 'content', placeholder: t('customFields.content'), type: 'textarea', colSpan: 2, rows: 4 },
  ];

  return (
    <CRUDListSection<CustomField>
      items={resumeData.customFields ?? []}
      fields={CUSTOM_FIELD_FIELDS}
      onAdd={addCustomField}
      onUpdate={updateCustomField}
      onRemove={removeCustomField}
      addButtonText={t('customFields.add')}
      emptyMessage={t('customFields.noCustomFields')}
      titleField="label"
      description={t('customFields.subtitle')}
      createEmptyItem={() => ({ label: '', content: '' })}
    />
  );
}
