"use strict";
/**
 * PDF Template Registry
 * Exports all 16 featured PDF templates
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMinimalBlueSections = exports.renderMinimalLabelsTan = exports.renderMinimalTimeline = exports.renderHeaderBlueClean = exports.renderHeaderIconSections = exports.renderHeaderGeometric = exports.renderHeaderDecorative = exports.renderHeaderRibbonYellow = exports.renderHeaderDiagonalYellow = exports.renderHeaderDarkBox = exports.renderHeaderDarkBanner = exports.renderHeaderDark = exports.renderSidebarMonogram = exports.renderSidebarNarrowYellow = exports.renderSidebarDarkNavy = exports.renderClassicProfessional = exports.getTemplateRenderer = exports.templates = void 0;
const classic_professional_1 = require("./classic-professional");
Object.defineProperty(exports, "renderClassicProfessional", { enumerable: true, get: function () { return classic_professional_1.renderClassicProfessional; } });
// Sidebar Templates (3)
const sidebar_dark_navy_1 = require("./sidebar-dark-navy");
Object.defineProperty(exports, "renderSidebarDarkNavy", { enumerable: true, get: function () { return sidebar_dark_navy_1.renderSidebarDarkNavy; } });
const sidebar_narrow_yellow_1 = require("./sidebar-narrow-yellow");
Object.defineProperty(exports, "renderSidebarNarrowYellow", { enumerable: true, get: function () { return sidebar_narrow_yellow_1.renderSidebarNarrowYellow; } });
const sidebar_monogram_1 = require("./sidebar-monogram");
Object.defineProperty(exports, "renderSidebarMonogram", { enumerable: true, get: function () { return sidebar_monogram_1.renderSidebarMonogram; } });
// Header Templates (9)
const header_dark_1 = require("./header-dark");
Object.defineProperty(exports, "renderHeaderDark", { enumerable: true, get: function () { return header_dark_1.renderHeaderDark; } });
const header_dark_banner_1 = require("./header-dark-banner");
Object.defineProperty(exports, "renderHeaderDarkBanner", { enumerable: true, get: function () { return header_dark_banner_1.renderHeaderDarkBanner; } });
const header_dark_box_1 = require("./header-dark-box");
Object.defineProperty(exports, "renderHeaderDarkBox", { enumerable: true, get: function () { return header_dark_box_1.renderHeaderDarkBox; } });
const header_diagonal_yellow_1 = require("./header-diagonal-yellow");
Object.defineProperty(exports, "renderHeaderDiagonalYellow", { enumerable: true, get: function () { return header_diagonal_yellow_1.renderHeaderDiagonalYellow; } });
const header_ribbon_yellow_1 = require("./header-ribbon-yellow");
Object.defineProperty(exports, "renderHeaderRibbonYellow", { enumerable: true, get: function () { return header_ribbon_yellow_1.renderHeaderRibbonYellow; } });
const header_decorative_1 = require("./header-decorative");
Object.defineProperty(exports, "renderHeaderDecorative", { enumerable: true, get: function () { return header_decorative_1.renderHeaderDecorative; } });
const header_geometric_1 = require("./header-geometric");
Object.defineProperty(exports, "renderHeaderGeometric", { enumerable: true, get: function () { return header_geometric_1.renderHeaderGeometric; } });
const header_icon_sections_1 = require("./header-icon-sections");
Object.defineProperty(exports, "renderHeaderIconSections", { enumerable: true, get: function () { return header_icon_sections_1.renderHeaderIconSections; } });
const header_blue_clean_1 = require("./header-blue-clean");
Object.defineProperty(exports, "renderHeaderBlueClean", { enumerable: true, get: function () { return header_blue_clean_1.renderHeaderBlueClean; } });
// Minimal Templates (3)
const minimal_timeline_1 = require("./minimal-timeline");
Object.defineProperty(exports, "renderMinimalTimeline", { enumerable: true, get: function () { return minimal_timeline_1.renderMinimalTimeline; } });
const minimal_labels_tan_1 = require("./minimal-labels-tan");
Object.defineProperty(exports, "renderMinimalLabelsTan", { enumerable: true, get: function () { return minimal_labels_tan_1.renderMinimalLabelsTan; } });
const minimal_blue_sections_1 = require("./minimal-blue-sections");
Object.defineProperty(exports, "renderMinimalBlueSections", { enumerable: true, get: function () { return minimal_blue_sections_1.renderMinimalBlueSections; } });
exports.templates = {
    // Sidebar Templates (3)
    'sidebar-dark-navy': sidebar_dark_navy_1.renderSidebarDarkNavy,
    'sidebar-narrow-yellow': sidebar_narrow_yellow_1.renderSidebarNarrowYellow,
    'sidebar-monogram': sidebar_monogram_1.renderSidebarMonogram,
    // Header Templates (9)
    'header-dark': header_dark_1.renderHeaderDark,
    'header-dark-banner': header_dark_banner_1.renderHeaderDarkBanner,
    'header-dark-box': header_dark_box_1.renderHeaderDarkBox,
    'header-diagonal-yellow': header_diagonal_yellow_1.renderHeaderDiagonalYellow,
    'header-ribbon-yellow': header_ribbon_yellow_1.renderHeaderRibbonYellow,
    'header-decorative': header_decorative_1.renderHeaderDecorative,
    'header-geometric': header_geometric_1.renderHeaderGeometric,
    'header-icon-sections': header_icon_sections_1.renderHeaderIconSections,
    'header-icon-orange': header_icon_sections_1.renderHeaderIconSections, // Alias
    'header-blue-clean': header_blue_clean_1.renderHeaderBlueClean,
    // Classic Templates (1)
    'classic-professional': classic_professional_1.renderClassicProfessional,
    'classic-pro': classic_professional_1.renderClassicProfessional, // Alias
    // Minimal Templates (3)
    'minimal-timeline': minimal_timeline_1.renderMinimalTimeline,
    'minimal-labels-tan': minimal_labels_tan_1.renderMinimalLabelsTan,
    'minimal-blue-sections': minimal_blue_sections_1.renderMinimalBlueSections,
    // Legacy aliases for backward compatibility
    'classic': classic_professional_1.renderClassicProfessional,
    'sidebar': sidebar_dark_navy_1.renderSidebarDarkNavy,
    'header': header_dark_1.renderHeaderDark,
    'minimal': minimal_timeline_1.renderMinimalTimeline,
};
const getTemplateRenderer = (templateId) => {
    const renderer = exports.templates[templateId];
    if (!renderer) {
        console.warn(`Template "${templateId}" not found, falling back to classic-professional`);
        return classic_professional_1.renderClassicProfessional;
    }
    return renderer;
};
exports.getTemplateRenderer = getTemplateRenderer;
//# sourceMappingURL=index.js.map