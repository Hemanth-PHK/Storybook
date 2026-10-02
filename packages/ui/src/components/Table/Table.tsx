import type { HTMLAttributes, Key, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface TableSort { columnId: string; direction: "asc" | "desc" }
export interface TableColumn<Row> {
  id: string;
  header: ReactNode;
  cell: (row: Row) => ReactNode;
  sortable?: boolean;
  className?: string;
}
export interface TableProps<Row> extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  columns: TableColumn<Row>[];
  data: Row[];
  getRowId: (row: Row) => Key;
  sort?: TableSort;
  onSortChange?: (sort: TableSort) => void;
  loading?: boolean;
  emptyContent?: ReactNode;
  toolbar?: ReactNode;
  caption?: string;
}
/** Sorting is controlled: the consumer supplies data in the desired order. */
export function Table<Row>({ columns, data, getRowId, sort, onSortChange, loading = false, emptyContent = "No results found.", toolbar, caption = "Data table", className, ...props }: TableProps<Row>) {
  return <div {...props} className={cn("min-w-0 max-w-full text-text", className)}>
    {toolbar && <div className="mb-3 flex min-w-0 flex-wrap items-center gap-2">{toolbar}</div>}
    <div role="region" aria-label={`${caption} scroll area`} tabIndex={0} className="max-w-full overflow-x-auto rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
      <table aria-busy={loading} className="w-full border-collapse bg-surface text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead><tr>{columns.map(column => <th key={column.id} scope="col"
          aria-sort={column.sortable ? sort?.columnId === column.id ? sort.direction === "asc" ? "ascending" : "descending" : "none" : undefined}
          className={cn("border-b border-border px-4 py-3 font-semibold", column.className)}>
          {column.sortable ? <button type="button" disabled={!onSortChange} onClick={() => onSortChange?.({ columnId: column.id, direction: sort?.columnId === column.id && sort.direction === "asc" ? "desc" : "asc" })}
            className="flex items-center gap-2 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50">{column.header}<span aria-hidden="true">{sort?.columnId === column.id ? sort.direction === "asc" ? "↑" : "↓" : "↕"}</span></button> : column.header}
        </th>)}</tr></thead>
        <tbody>{loading || data.length === 0 ? <tr><td colSpan={Math.max(1, columns.length)} className="px-4 py-8 text-center text-muted">{loading ? "Loading data…" : emptyContent}</td></tr>
          : data.map(row => <tr key={getRowId(row)}>{columns.map(column => <td key={column.id} className={cn("max-w-xs break-words border-b border-border px-4 py-3 align-top [overflow-wrap:anywhere]", column.className)}>{column.cell(row)}</td>)}</tr>)}</tbody>
      </table>
    </div>
    <span role="status" className="sr-only">{loading ? "Loading data" : `${data.length} rows`}</span>
  </div>;
}
