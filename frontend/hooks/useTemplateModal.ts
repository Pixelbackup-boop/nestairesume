'use client';

import { useState, useCallback } from 'react';

interface SelectedTemplate {
    id: string;
    name: string;
}

export function useTemplateModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<SelectedTemplate | null>(null);

    const openModal = useCallback((templateId: string, templateName: string) => {
        setSelectedTemplate({ id: templateId, name: templateName });
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedTemplate(null);
    }, []);

    return {
        isModalOpen,
        selectedTemplate,
        openModal,
        closeModal,
    };
}
