import React from 'react';
import { InvoiceStatus, BillStatus } from '../../types';

interface StatusBadgeProps {
  status: InvoiceStatus | BillStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  // FIX: Removed duplicate object keys. BillStatus.Paid has the same key as InvoiceStatus.Paid ('PAID'),
  // and BillStatus.Draft has the same key as InvoiceStatus.Draft ('DRAFT'). Since they shared the same styles,
  // the duplicate entries for BillStatus were removed to fix the error.
  const statusStyles: { [key: string]: string } = {
    [InvoiceStatus.Paid]: 'bg-green-100 text-green-800',
    [InvoiceStatus.Sent]: 'bg-blue-100 text-blue-800',
    [InvoiceStatus.Overdue]: 'bg-red-100 text-red-800',
    [InvoiceStatus.Draft]: 'bg-gray-100 text-gray-800',
    [BillStatus.Submitted]: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </span>
  );
};