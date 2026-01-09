/**
 * Shared Template Components
 *
 * IMPORTANT FOR TEMPLATE DEVELOPERS:
 * ---------------------------------
 * When creating new templates, you MUST use these shared components
 * to ensure consistent page break behavior and print output.
 *
 * Required Components:
 * 1. SectionHeader - Use for ALL section headings (Experience, Education, etc.)
 * 2. ResumeEntry - Use to wrap individual entries (each job, each school, etc.)
 *
 * Why This Matters:
 * - PagedPreview.tsx detects '.section-header' and '.resume-entry' classes
 * - Without these classes, content may be cut off at page boundaries
 * - Web preview won't match print output
 *
 * Example Usage:
 * ```tsx
 * import { SectionHeader, ResumeEntry } from '../shared';
 *
 * export default function MyNewTemplate({ data, theme, scale }) {
 *   return (
 *     <div>
 *       <SectionHeader theme={theme} scale={scale} variant="uppercase">
 *         Experience
 *       </SectionHeader>
 *       <div className="space-y-3">
 *         {data.experience.map((exp) => (
 *           <ResumeEntry key={exp.id}>
 *             <h3>{exp.title}</h3>
 *             <p>{exp.company}</p>
 *           </ResumeEntry>
 *         ))}
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 */

// Core shared components for page break support
export { default as SectionHeader } from './SectionHeader';
export type { SectionHeaderProps } from './SectionHeader';

export { default as ResumeEntry } from './ResumeEntry';
export type { ResumeEntryProps } from './ResumeEntry';

// Type definitions
export * from './types';

// Style helpers
export * from './styleHelpers';
