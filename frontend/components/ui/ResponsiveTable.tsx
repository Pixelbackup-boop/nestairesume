"use client";

import { ReactNode } from "react";
import { Check, X, Minus } from "lucide-react";

export interface TableColumn {
  key: string;
  header: string;
  /** Width class for desktop table (e.g., "w-1/3") */
  width?: string;
  /** Render function for custom cell content */
  render?: (value: string | boolean, row: Record<string, string | boolean>) => ReactNode;
}

export interface ResponsiveTableProps {
  columns: TableColumn[];
  data: Record<string, string | boolean>[];
  /** Title shown above the table */
  title?: string;
  /** Additional class for the container */
  className?: string;
  /** Show comparison style (highlight differences) */
  comparisonMode?: boolean;
  /** Custom card renderer for mobile view */
  mobileCardRenderer?: (row: Record<string, string | boolean>, index: number) => ReactNode;
}

/** Default cell renderer - handles boolean checkmarks and text */
function DefaultCellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-teal-primary mx-auto" />
    ) : (
      <X className="w-5 h-5 text-red-400 mx-auto" />
    );
  }
  if (value === "partial" || value === "limited") {
    return <Minus className="w-5 h-5 text-amber-400 mx-auto" />;
  }
  return <span>{value}</span>;
}

/** Default mobile card renderer */
function DefaultMobileCard({
  row,
  columns,
  index,
}: {
  row: Record<string, string | boolean>;
  columns: TableColumn[];
  index: number;
}) {
  const featureColumn = columns[0];
  const dataColumns = columns.slice(1);

  return (
    <div
      key={index}
      className="bg-white rounded-xl p-4 shadow-sm border border-border-subtle"
    >
      {/* Feature name as card header */}
      <h3 className="font-semibold text-dark-teal mb-3 text-sm">
        {String(row[featureColumn.key])}
      </h3>

      {/* Data as labeled rows */}
      <div className="space-y-2">
        {dataColumns.map((col) => (
          <div
            key={col.key}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-text-secondary">{col.header}:</span>
            <span className="font-medium">
              {col.render ? (
                col.render(row[col.key], row)
              ) : (
                <DefaultCellValue value={row[col.key]} />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResponsiveTable({
  columns,
  data,
  title,
  className = "",
  comparisonMode = false,
  mobileCardRenderer,
}: ResponsiveTableProps) {
  return (
    <div className={className}>
      {title && (
        <h3 className="text-lg font-semibold text-dark-teal mb-4">{title}</h3>
      )}

      {/* Desktop: Traditional table (hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border-subtle">
        <table className="w-full">
          <thead>
            <tr className="bg-bg-light border-b border-border-subtle">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-sm font-semibold text-dark-teal ${
                    col.width || ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b border-border-subtle last:border-b-0 ${
                  comparisonMode && rowIndex % 2 === 0 ? "bg-white" : "bg-bg-light/50"
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-3 text-sm text-text-primary"
                  >
                    {col.render ? (
                      col.render(row[col.key], row)
                    ) : (
                      <DefaultCellValue value={row[col.key]} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Card layout (hidden on desktop) */}
      <div className="md:hidden space-y-3">
        {data.map((row, index) =>
          mobileCardRenderer ? (
            mobileCardRenderer(row, index)
          ) : (
            <DefaultMobileCard
              key={index}
              row={row}
              columns={columns}
              index={index}
            />
          )
        )}
      </div>
    </div>
  );
}
