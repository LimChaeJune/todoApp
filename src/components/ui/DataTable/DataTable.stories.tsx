// src/components/ui/dataTable/DataTable.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  createColumnHelper,
  ColumnFiltersState,
  RowSelectionState,
} from '@tanstack/react-table'
import DataTable from '@/components/ui/DataTable/DataTable'
import DataTableFilter from '@/components/ui/DataTable/DataTableFilter'
import DataTablePagination from '@/components/ui/DataTable/DataTablePagination'
import SelectColumnCell from '@/components/ui/DataTable/SelectColumnCell'
import { Button } from '@/components/ui/Button'

// --- 메타데이터 ---
const meta: Meta<typeof DataTable> = {
  title: 'UI/DataTable',
  component: DataTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// --- 샘플 데이터 및 컬럼 정의 ---
type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

const defaultData: Payment[] = [
  // 20개의 샘플 데이터
  { id: 'm5gr84i9', amount: 316, status: 'success', email: 'ken99@yahoo.com' },
  { id: '3u1reuv4', amount: 242, status: 'success', email: 'Abe45@gmail.com' },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com',
  },
  {
    id: 'p8fdy6y5',
    amount: 125,
    status: 'pending',
    email: 'john.doe@example.com',
  },
  {
    id: 'y9i3e2n6',
    amount: 450,
    status: 'success',
    email: 'jane.smith@example.com',
  },
  {
    id: 'r2g8h5t1',
    amount: 620,
    status: 'processing',
    email: 'peter.jones@example.com',
  },
  {
    id: 'w7q4k2z0',
    amount: 95,
    status: 'failed',
    email: 'susan.williams@example.com',
  },
  {
    id: 'a1b3c4d5',
    amount: 1000,
    status: 'success',
    email: 'michael.brown@example.com',
  },
  {
    id: 'f6g7h8i9',
    amount: 50,
    status: 'pending',
    email: 'lisa.miller@example.com',
  },
  {
    id: 'j0k1l2m3',
    amount: 300,
    status: 'success',
    email: 'david.wilson@example.com',
  },
  {
    id: 'n4p5q6r7',
    amount: 750,
    status: 'processing',
    email: 'sarah.davis@example.com',
  },
  {
    id: 's8t9u0v1',
    amount: 150,
    status: 'failed',
    email: 'james.taylor@example.com',
  },
  {
    id: 'w2x3y4z5',
    amount: 500,
    status: 'success',
    email: 'emily.anderson@example.com',
  },
  {
    id: 'a6b7c8d9',
    amount: 200,
    status: 'pending',
    email: 'chris.thomas@example.com',
  },
  {
    id: 'e0f1g2h3',
    amount: 900,
    status: 'success',
    email: 'jessica.jackson@example.com',
  },
  {
    id: 'i4j5k6l7',
    amount: 400,
    status: 'processing',
    email: 'matthew.white@example.com',
  },
  {
    id: 'm8n9p0q1',
    amount: 80,
    status: 'failed',
    email: 'olivia.harris@example.com',
  },
  {
    id: 'r2s3t4u5',
    amount: 600,
    status: 'success',
    email: 'daniel.martin@example.com',
  },
]

const columnHelper = createColumnHelper<Payment>()

const columns = [
  SelectColumnCell<Payment>(),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: () => <div className="text-right">Amount</div>,
    cell: (info) => {
      const amount = info.getValue()
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <div className="text-right">
        <Button variant="ghost" size="sm">
          Details
        </Button>
      </div>
    ),
  }),
]

// --- 완전한 데이터 테이블 컴포넌트 ---
const FullDataTableComponent = () => {
  const [data] = React.useState(() => [...defaultData])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
  })

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>
      <div className="flex items-center py-4">
        <DataTableFilter
          table={table}
          column="email"
          placeholder="Filter emails..."
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <DataTable table={table} />
      </div>
      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}

export const FullFeaturedTable: Story = {
  render: () => <FullDataTableComponent />,
}
