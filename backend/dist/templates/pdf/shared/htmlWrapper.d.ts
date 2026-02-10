/**
 * HTML Wrapper for PDF Generation
 * Wraps template content with proper document structure, fonts, and CSS
 */
interface WrapperOptions {
    headingFont: string;
    bodyFont: string;
    locale?: string;
    marginStrategy?: 'sidebar' | 'full-bleed' | 'standard';
}
export declare const wrapHtml: (content: string, options: WrapperOptions) => string;
export {};
//# sourceMappingURL=htmlWrapper.d.ts.map