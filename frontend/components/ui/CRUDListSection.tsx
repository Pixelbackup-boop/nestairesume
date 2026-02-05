'use client';

import { useState, useCallback, ReactNode } from 'react';
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';

// Field configuration for dynamic form generation
export interface FieldConfig {
  name: string;
  placeholder: string;
  type?: 'text' | 'email' | 'tel' | 'url' | 'textarea';
  required?: boolean;
  colSpan?: 1 | 2;
  rows?: number; // For textarea
}

// Base item type - items must have an id and string-indexable properties
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseItem = { id: string } & Record<string, any>;

export interface CRUDListSectionProps<T extends BaseItem> {
  items: T[];
  fields: FieldConfig[];
  onAdd: (item: T) => void;
  onUpdate: (id: string, updates: Partial<T>) => void;
  onRemove: (id: string) => void;
  addButtonText: string;
  emptyMessage: string;
  titleField: keyof T;
  /** Custom renderer for the title - if provided, replaces default title rendering */
  titleRenderer?: (item: T) => ReactNode;
  subtitleRenderer?: (item: T) => ReactNode;
  createEmptyItem: () => Omit<T, 'id'>;
  validateItem?: (item: Omit<T, 'id'>) => boolean;
  description?: string;
  renderItemExtra?: (item: T) => ReactNode;
}

export default function CRUDListSection<T extends BaseItem>({
  items,
  fields,
  onAdd,
  onUpdate,
  onRemove,
  addButtonText,
  emptyMessage,
  titleField,
  titleRenderer,
  subtitleRenderer,
  createEmptyItem,
  validateItem,
  description,
  renderItemExtra,
}: CRUDListSectionProps<T>) {
  const [isAdding, setIsAdding] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<Omit<T, 'id'>>(createEmptyItem);

  const handleFieldChange = useCallback((fieldName: string, value: string) => {
    setNewItem(prev => ({ ...prev, [fieldName]: value }));
  }, []);

  const handleAdd = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    // Default validation: check required fields
    const isValid = validateItem
      ? validateItem(newItem)
      : fields
          .filter(f => f.required)
          .every(f => {
            const value = newItem[f.name as keyof typeof newItem];
            return typeof value === 'string' && value.trim().length > 0;
          });

    if (!isValid) return;

    // Create item with ID and trimmed values
    const trimmedItem = Object.fromEntries(
      Object.entries(newItem).map(([k, v]) => [
        k,
        typeof v === 'string' ? (v.trim() || undefined) : v
      ])
    ) as Omit<T, 'id'>;

    const itemWithId = {
      ...trimmedItem,
      id: crypto.randomUUID(),
    } as T;

    onAdd(itemWithId);
    setNewItem(createEmptyItem());
    setIsAdding(false);
  }, [newItem, fields, validateItem, onAdd, createEmptyItem]);

  const handleCancel = useCallback(() => {
    setIsAdding(false);
    setNewItem(createEmptyItem());
  }, [createEmptyItem]);

  const handleUpdateField = useCallback((id: string, fieldName: string, value: string) => {
    onUpdate(id, { [fieldName]: value || undefined } as Partial<T>);
  }, [onUpdate]);

  const isSubmitDisabled = validateItem
    ? !validateItem(newItem)
    : !fields
        .filter(f => f.required)
        .every(f => {
          const value = newItem[f.name as keyof typeof newItem];
          return typeof value === 'string' && value.trim().length > 0;
        });

  const inputClassName = "bg-bg-card-light border border-border-subtle rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-accent-green";
  const editInputClassName = "bg-bg-card-light border border-border-subtle rounded px-2 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-accent-green";

  return (
    <div className="space-y-4">
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      {/* Add Button or Form */}
      {!isAdding ? (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-border-subtle rounded-lg text-gray-400 hover:text-accent-green hover:border-accent-green/50 transition"
        >
          <Plus size={18} />
          <span className="text-sm">{addButtonText}</span>
        </button>
      ) : (
        <form onSubmit={handleAdd} className="bg-bg-card border border-border-subtle rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {fields.map((field) => {
              const value = (newItem[field.name as keyof typeof newItem] as string) || '';
              const colSpanClass = field.colSpan === 2 ? 'col-span-2' : '';

              if (field.type === 'textarea') {
                return (
                  <textarea
                    key={field.name}
                    value={value}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    rows={field.rows || 2}
                    className={`${colSpanClass} ${inputClassName} resize-none`}
                  />
                );
              }

              return (
                <input
                  key={field.name}
                  type={field.type || 'text'}
                  value={value}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className={`${colSpanClass} ${inputClassName}`}
                />
              );
            })}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1.5 text-sm text-gray-400 hover:text-gray-900 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="px-3 py-1.5 bg-accent-green text-bg-primary rounded-lg text-sm font-medium hover:bg-accent-teal transition disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </form>
      )}

      {/* Items List */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-bg-card border border-border-subtle rounded-lg overflow-hidden"
          >
            <div
              className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-white/5 transition"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {titleRenderer ? (
                    titleRenderer(item)
                  ) : (
                    <span className="text-gray-900 font-medium text-sm">
                      {String(item[titleField] || '')}
                    </span>
                  )}
                  {renderItemExtra?.(item)}
                </div>
                {subtitleRenderer && (
                  <div className="text-xs text-gray-500">
                    {subtitleRenderer(item)}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
                  className="text-gray-500 hover:text-red-400 transition p-1"
                >
                  <X size={14} />
                </button>
                {expandedId === item.id ? (
                  <ChevronUp size={14} className="text-gray-500" />
                ) : (
                  <ChevronDown size={14} className="text-gray-500" />
                )}
              </div>
            </div>

            {expandedId === item.id && (
              <div className="px-3 pb-3 pt-2 border-t border-border-subtle grid grid-cols-2 gap-2">
                {fields.map((field) => {
                  const value = (item[field.name as keyof T] as string) || '';
                  const colSpanClass = field.colSpan === 2 ? 'col-span-2' : '';

                  if (field.type === 'textarea') {
                    return (
                      <textarea
                        key={field.name}
                        value={value}
                        onChange={(e) => handleUpdateField(item.id, field.name, e.target.value)}
                        placeholder={field.placeholder.replace(' *', '')}
                        rows={field.rows || 2}
                        className={`${colSpanClass} ${editInputClassName} resize-none`}
                      />
                    );
                  }

                  return (
                    <input
                      key={field.name}
                      type={field.type || 'text'}
                      value={value}
                      onChange={(e) => handleUpdateField(item.id, field.name, e.target.value)}
                      placeholder={field.placeholder.replace(' *', '')}
                      className={`${colSpanClass} ${editInputClassName}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {items.length === 0 && !isAdding && (
          <p className="text-gray-500 text-sm italic text-center py-2">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}
