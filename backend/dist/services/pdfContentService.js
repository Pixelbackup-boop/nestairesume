"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentExcerpt = exports.deleteContentSource = exports.getContentSourceById = exports.getAllContentSources = exports.saveContentSource = exports.extractPdfContent = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdf = require("pdf-parse");
const database_1 = __importDefault(require("../config/database"));
// Extract text content from PDF buffer
const extractPdfContent = async (buffer) => {
    const data = await pdf(buffer);
    return {
        text: data.text,
        pageCount: data.numpages,
        info: {
            title: data.info?.Title,
            author: data.info?.Author,
        },
    };
};
exports.extractPdfContent = extractPdfContent;
// Save extracted content to database
const saveContentSource = async (name, filename, content, pageCount, metadata) => {
    // Truncate content if too large (SQLite text limit)
    const truncatedContent = content.length > 500000
        ? content.substring(0, 500000) + "\n\n[Content truncated due to size...]"
        : content;
    return database_1.default.contentSource.create({
        data: {
            name,
            filename,
            type: "pdf",
            content: truncatedContent,
            pageCount,
            metadata: metadata ? JSON.stringify(metadata) : null,
        },
    });
};
exports.saveContentSource = saveContentSource;
// Get all content sources
const getAllContentSources = async () => {
    return database_1.default.contentSource.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            filename: true,
            type: true,
            pageCount: true,
            createdAt: true,
            _count: {
                select: { scheduledPosts: true },
            },
        },
    });
};
exports.getAllContentSources = getAllContentSources;
// Get content source by ID (with full content)
const getContentSourceById = async (id) => {
    return database_1.default.contentSource.findUnique({
        where: { id },
    });
};
exports.getContentSourceById = getContentSourceById;
// Delete content source
const deleteContentSource = async (id) => {
    return database_1.default.contentSource.delete({
        where: { id },
    });
};
exports.deleteContentSource = deleteContentSource;
// Get content excerpt for AI processing (first N characters)
const getContentExcerpt = async (id, maxLength = 50000) => {
    const source = await database_1.default.contentSource.findUnique({
        where: { id },
        select: { content: true },
    });
    if (!source)
        return null;
    return source.content.length > maxLength
        ? source.content.substring(0, maxLength)
        : source.content;
};
exports.getContentExcerpt = getContentExcerpt;
//# sourceMappingURL=pdfContentService.js.map