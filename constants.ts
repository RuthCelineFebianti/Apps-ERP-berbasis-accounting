
import { FinancialData, InvoiceStatus, BillStatus, AccountType } from './types';

export const MOCK_DATA: FinancialData = {
  customers: [
    { id: 'cust_1', name: 'Innovate Corp', email: 'contact@innovate.com', phone: '555-0101', address: '123 Tech Avenue' },
    { id: 'cust_2', name: 'Solutions Inc.', email: 'support@solutions.com', phone: '555-0102', address: '456 Business Blvd' },
    { id: 'cust_3', name: 'Synergy LLC', email: 'hello@synergy.com', phone: '555-0103', address: '789 Partnership Plaza' },
  ],
  vendors: [
    { id: 'vend_1', name: 'Office Supplies Co.', email: 'sales@officesupplies.com', phone: '555-0201', address: '101 Paper Street' },
    { id: 'vend_2', name: 'Cloud Services Provider', email: 'billing@cloud.com', phone: '555-0202', address: '202 Data Center Drive' },
    { id: 'vend_3', name: 'Marketing Agency', email: 'accounts@marketing.com', phone: '555-0203', address: '303 Creative Corner' },
  ],
  invoices: [
    {
      id: 'inv_1', invoiceNumber: 'INV-001', customerId: 'cust_1', issueDate: '2023-10-15', dueDate: '2023-11-14',
      items: [{ id: 'item_1', description: 'Web Development Services', quantity: 1, unitPrice: 5000 }],
      status: InvoiceStatus.Paid, taxRate: 0
    },
    {
      id: 'inv_2', invoiceNumber: 'INV-002', customerId: 'cust_2', issueDate: '2023-10-20', dueDate: '2023-11-19',
      items: [{ id: 'item_2', description: 'Cloud Hosting - Annual', quantity: 1, unitPrice: 1200 }],
      status: InvoiceStatus.Sent, taxRate: 8
    },
    {
      id: 'inv_3', invoiceNumber: 'INV-003', customerId: 'cust_1', issueDate: '2023-11-01', dueDate: '2023-12-01',
      items: [{ id: 'item_3', description: 'UI/UX Design Mockups', quantity: 10, unitPrice: 150 }],
      status: InvoiceStatus.Sent, taxRate: 0
    },
     {
      id: 'inv_4', invoiceNumber: 'INV-004', customerId: 'cust_3', issueDate: '2023-09-05', dueDate: '2023-10-05',
      items: [{ id: 'item_4', description: 'Marketing Campaign Setup', quantity: 1, unitPrice: 2500 }],
      status: InvoiceStatus.Overdue, taxRate: 5
    },
  ],
  bills: [
    {
      id: 'bill_1', billNumber: 'BILL-A01', vendorId: 'vend_1', issueDate: '2023-10-25', dueDate: '2023-11-24',
      items: [{ id: 'bitem_1', description: 'Office Chairs', quantity: 5, unitPrice: 120 }],
      status: BillStatus.Submitted, taxRate: 7
    },
    {
      id: 'bill_2', billNumber: 'BILL-B02', vendorId: 'vend_2', issueDate: '2023-11-01', dueDate: '2023-12-01',
      items: [{ id: 'bitem_2', description: 'Monthly Server Costs', quantity: 1, unitPrice: 300 }],
      status: BillStatus.Paid, taxRate: 0
    },
     {
      id: 'bill_3', billNumber: 'BILL-C03', vendorId: 'vend_3', issueDate: '2023-11-05', dueDate: '2023-12-05',
      items: [{ id: 'bitem_3', description: 'Social Media Ads', quantity: 1, unitPrice: 800 }],
      status: BillStatus.Draft, taxRate: 0
    },
  ],
  accounts: [
    { id: 'acc_1', name: 'Cash', type: AccountType.Asset, balance: 50000 },
    { id: 'acc_2', name: 'Accounts Receivable', type: AccountType.Asset, balance: 7500 },
    { id: 'acc_3', name: 'Office Equipment', type: AccountType.Asset, balance: 12000 },
    { id: 'acc_4', name: 'Accounts Payable', type: AccountType.Liability, balance: 4500 },
    { id: 'acc_5', name: "Owner's Equity", type: AccountType.Equity, balance: 65000 },
    { id: 'acc_6', name: 'Service Revenue', type: AccountType.Revenue, balance: 25000 },
    { id: 'acc_7', name: 'Rent Expense', type: AccountType.Expense, balance: 5000 },
    { id: 'acc_8', name: 'Utilities Expense', type: AccountType.Expense, balance: 1500 },
    { id: 'acc_9', name: 'Software Subscriptions', type: AccountType.Expense, balance: 1000 },
  ],
  journalEntries: [
    {
      id: 'je_1', date: '2023-10-01', description: 'Owner investment',
      lines: [
        { accountId: 'acc_1', debit: 10000, credit: 0 },
        { accountId: 'acc_5', debit: 0, credit: 10000 },
      ]
    },
    {
      id: 'je_2', date: '2023-10-05', description: 'Pay monthly rent',
      lines: [
        { accountId: 'acc_7', debit: 5000, credit: 0 },
        { accountId: 'acc_1', debit: 0, credit: 5000 },
      ]
    },
  ],
};
