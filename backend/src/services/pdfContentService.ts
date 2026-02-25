 
const pdf = require("pdf-parse");
import prisma from "../config/database";

interface ExtractedPDF {
  text: string;
  pageCount: number;
  info: {
    title?: string;
    author?: string;
  };
}

// Extract text content from PDF buffer
export const extractPdfContent = async (buffer: Buffer): Promise<ExtractedPDF> => {
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

// Save extracted content to database
export const saveContentSource = async (
  name: string,
  filename: string,
  content: string,
  pageCount: number,
  metadata?: Record<string, unknown>
) => {
  // Truncate content if too large (SQLite text limit)
  const truncatedContent = content.length > 500000
    ? content.substring(0, 500000) + "\n\n[Content truncated due to size...]"
    : content;

  return prisma.contentSource.create({
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

// Get all content sources
export const getAllContentSources = async () => {
  return prisma.contentSource.findMany({
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

// Get content source by ID (with full content)
export const getContentSourceById = async (id: string) => {
  return prisma.contentSource.findUnique({
    where: { id },
  });
};

// Delete content source
export const deleteContentSource = async (id: string) => {
  return prisma.contentSource.delete({
    where: { id },
  });
};

// Get content excerpt for AI processing (first N characters)
export const getContentExcerpt = async (id: string, maxLength = 50000): Promise<string | null> => {
  const source = await prisma.contentSource.findUnique({
    where: { id },
    select: { content: true },
  });

  if (!source) return null;

  return source.content.length > maxLength
    ? source.content.substring(0, maxLength)
    : source.content;
};
