interface ExtractedPDF {
    text: string;
    pageCount: number;
    info: {
        title?: string;
        author?: string;
    };
}
export declare const extractPdfContent: (buffer: Buffer) => Promise<ExtractedPDF>;
export declare const saveContentSource: (name: string, filename: string, content: string, pageCount: number, metadata?: Record<string, unknown>) => Promise<{
    name: string;
    id: string;
    createdAt: Date;
    type: string;
    content: string;
    pageCount: number | null;
    filename: string;
    metadata: string | null;
}>;
export declare const getAllContentSources: () => Promise<{
    name: string;
    id: string;
    createdAt: Date;
    _count: {
        scheduledPosts: number;
    };
    type: string;
    pageCount: number | null;
    filename: string;
}[]>;
export declare const getContentSourceById: (id: string) => Promise<{
    name: string;
    id: string;
    createdAt: Date;
    type: string;
    content: string;
    pageCount: number | null;
    filename: string;
    metadata: string | null;
} | null>;
export declare const deleteContentSource: (id: string) => Promise<{
    name: string;
    id: string;
    createdAt: Date;
    type: string;
    content: string;
    pageCount: number | null;
    filename: string;
    metadata: string | null;
}>;
export declare const getContentExcerpt: (id: string, maxLength?: number) => Promise<string | null>;
export {};
//# sourceMappingURL=pdfContentService.d.ts.map