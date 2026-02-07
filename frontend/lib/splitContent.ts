/**
 * Split HTML content at the midpoint of block-level elements.
 * Used to insert an ad in the middle of article content.
 * Returns [firstHalf, secondHalf]. If content is too short to split,
 * secondHalf will be empty string.
 */
export function splitHtmlAtMiddle(html: string): [string, string] {
  const blockEndRegex = /<\/(p|h[1-6]|ul|ol|div|blockquote|table|pre|section)>/gi;
  const matches = [...html.matchAll(blockEndRegex)];

  if (matches.length < 4) return [html, ''];

  const midIdx = Math.floor(matches.length / 2);
  const splitPos = matches[midIdx].index! + matches[midIdx][0].length;

  return [html.substring(0, splitPos), html.substring(splitPos)];
}

/**
 * Split raw markdown content at the midpoint of paragraph boundaries.
 * Used before MDX compilation to insert an ad between two compiled halves.
 * Returns [firstHalf, secondHalf]. If content is too short, secondHalf is empty.
 */
export function splitMarkdownAtMiddle(content: string): [string, string] {
  const paragraphs = content.split(/\n\n+/);

  if (paragraphs.length < 4) return [content, ''];

  const midIdx = Math.floor(paragraphs.length / 2);
  return [
    paragraphs.slice(0, midIdx).join('\n\n'),
    paragraphs.slice(midIdx).join('\n\n'),
  ];
}
