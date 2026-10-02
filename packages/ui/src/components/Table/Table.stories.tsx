import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Table, type TableColumn, type TableProps, type TableSort } from "./Table";
import { Input } from "../Input";
import { Pagination } from "../Pagination";

interface Resource { id: string; title: string; category: string; minutes: number }
const data: Resource[] = [
  { id: "r1", title: "An introduction to motion", category: "Physics", minutes: 25 },
  { id: "r2", title: "Understanding ecosystems", category: "Biology", minutes: 40 },
  { id: "r3", title: "Practice with equations", category: "Mathematics", minutes: 15 },
];
const columns: TableColumn<Resource>[] = [
  { id: "title", header: "Resource", cell: row => row.title },
  { id: "category", header: "Category", cell: row => row.category },
  { id: "minutes", header: "Minutes", cell: row => row.minutes },
];
const ResourceTable = (props: TableProps<Resource>) => <Table {...props} />;
const meta = { title: "Components/Table", component: ResourceTable, tags: ["autodocs"], args: { columns, data, getRowId: (row: Resource) => row.id, caption: "Learning resources" } } satisfies Meta<typeof ResourceTable>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
function SortedTable(props: TableProps<Resource>) {
  const [sort, setSort] = useState<TableSort>({ columnId: "title", direction: "asc" });
  const ordered = [...props.data].sort((a, b) => {
    const difference = sort.columnId === "minutes" ? a.minutes - b.minutes : String(a[sort.columnId as "title" | "category"]).localeCompare(String(b[sort.columnId as "title" | "category"]));
    return sort.direction === "asc" ? difference : -difference;
  });
  return <Table {...props} columns={props.columns.map(column => ({ ...column, sortable: true }))} data={ordered} sort={sort} onSortChange={setSort} />;
}
export const Sortable: Story = { render: args => <SortedTable {...args} /> };
function FilteredTable(props: TableProps<Resource>) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const filtered = props.data.filter(row => row.title.toLowerCase().includes(query.toLowerCase()));
  return <><Table {...props} data={filtered.slice((page - 1) * 2, page * 2)} toolbar={<label className="w-full max-w-sm">Find a resource<Input value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} placeholder="Search titles" /></label>} /><Pagination className="mt-4" page={page} pageSize={2} totalItems={filtered.length} onPageChange={setPage} /></>;
}
export const WithToolbarOrFilters: Story = { render: args => <FilteredTable {...args} /> };
export const Empty: Story = { args: { data: [], emptyContent: "No resources match your selection." } };
export const Loading: Story = { args: { loading: true } };
export const ResponsiveOverflow: Story = { parameters: { viewport: { defaultViewport: "mobile1" } }, args: { columns: [...columns.map(column => ({ ...column, className: "min-w-[180px]" })), { id: "description", header: "Description", className: "min-w-[240px]", cell: () => "A detailed resource with practice activities, reference material, and a comprehensive explanation of the topic." }] } };
