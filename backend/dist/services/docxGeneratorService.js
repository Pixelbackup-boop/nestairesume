"use strict";
/**
 * DOCX Generator Service
 * Converts table-based HTML templates to .docx using html-to-docx
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderResumeDocx = renderResumeDocx;
exports.processDocxRequest = processDocxRequest;
const html_to_docx_1 = __importDefault(require("html-to-docx"));
const docx_1 = require("../templates/docx");
const docxHelpers_1 = require("../templates/docx/shared/docxHelpers");
const translations_1 = require("../templates/pdf/shared/translations");
/**
 * Render resume data to DOCX buffer
 */
async function renderResumeDocx(data, templateId, theme, translations, locale = 'en') {
    const renderTemplate = (0, docx_1.getDocxTemplateRenderer)(templateId);
    const t = (0, translations_1.getTranslations)(translations);
    // Render template to HTML
    const templateHtml = renderTemplate(data, theme, t, locale);
    // Wrap in minimal document structure
    const fullHtml = (0, docxHelpers_1.wrapDocxHtml)(templateHtml);
    // Convert to DOCX
    const docxBuffer = await (0, html_to_docx_1.default)(fullHtml, null, {
        table: { row: { cantSplit: true } },
        footer: false,
        pageNumber: false,
        margins: {
            top: 720, // 0.5 inch (in TWIPs: 1 inch = 1440)
            bottom: 720,
            left: 720,
            right: 720,
            header: 720,
            footer: 720,
            gutter: 0,
        },
    });
    return Buffer.from(docxBuffer);
}
/**
 * Process a DOCX generation request
 */
async function processDocxRequest(request) {
    const { data, templateId, theme, translations, locale } = request;
    return renderResumeDocx(data, templateId, theme, translations, locale || 'en');
}
//# sourceMappingURL=docxGeneratorService.js.map