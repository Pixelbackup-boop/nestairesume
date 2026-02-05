"use strict";
/**
 * DOCX Template Registry
 * Maps template IDs to their renderers (4 Word + 4 Google Docs templates)
 * Google Docs templates also output .docx (Google Docs imports .docx natively)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.docxTemplates = void 0;
exports.getDocxTemplateRenderer = getDocxTemplateRenderer;
const docx_classic_1 = require("./docx-classic");
const docx_sidebar_1 = require("./docx-sidebar");
const docx_header_1 = require("./docx-header");
const docx_minimal_1 = require("./docx-minimal");
const gdocs_clean_1 = require("../gdocs/gdocs-clean");
const gdocs_coral_1 = require("../gdocs/gdocs-coral");
const gdocs_elegant_1 = require("../gdocs/gdocs-elegant");
const gdocs_compact_1 = require("../gdocs/gdocs-compact");
exports.docxTemplates = {
    // Microsoft Word templates
    'docx-classic': docx_classic_1.renderDocxClassic,
    'docx-sidebar': docx_sidebar_1.renderDocxSidebar,
    'docx-header': docx_header_1.renderDocxHeader,
    'docx-minimal': docx_minimal_1.renderDocxMinimal,
    // Google Docs templates (same .docx output, Google Docs-optimized styling)
    'gdocs-clean': gdocs_clean_1.renderGdocsClean,
    'gdocs-coral': gdocs_coral_1.renderGdocsCoral,
    'gdocs-elegant': gdocs_elegant_1.renderGdocsElegant,
    'gdocs-compact': gdocs_compact_1.renderGdocsCompact,
};
function getDocxTemplateRenderer(templateId) {
    const renderer = exports.docxTemplates[templateId];
    if (!renderer) {
        console.warn(`DOCX template "${templateId}" not found, falling back to docx-classic`);
        return docx_classic_1.renderDocxClassic;
    }
    return renderer;
}
//# sourceMappingURL=index.js.map