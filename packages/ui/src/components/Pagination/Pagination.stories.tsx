import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination, type PaginationProps } from "./Pagination";

function InteractivePagination(props: PaginationProps) {
  const [page, setPage] = useState(props.page);
  const [size, setSize] = useState(props.pageSize);
  return <Pagination {...props} page={page} pageSize={size} onPageChange={setPage} onPageSizeChange={next => { setSize(next); setPage(1); }} />;
}
const meta = { title: "Components/Pagination", component: Pagination, tags: ["autodocs"], args: { page: 1, pageSize: 10, totalItems: 120, onPageChange: () => { } }, render: args => <InteractivePagination key={`${args.page}-${args.pageSize}-${args.totalItems}`} {...args} /> } satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;
export const FirstPage: Story = {};
export const MiddlePage: Story = { args: { page: 6 } };
export const LastPage: Story = { args: { page: 12 } };
export const WithPageSize: Story = { args: { pageSizeOptions: [5, 10, 25, 50] } };
export const CompactMobile: Story = { parameters: { viewport: { defaultViewport: "mobile1" } }, args: { page: 6 } };
export const ZeroItems: Story = { args: { totalItems: 0 } };
export const OnePage: Story = { args: { totalItems: 7 } };
