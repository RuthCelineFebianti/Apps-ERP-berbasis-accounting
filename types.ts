
export enum View {
  Dashboard = 'DASHBOARD',
  Invoices = 'INVOICES',
  Customers = 'CUSTOMERS',
  Bills = 'BILLS',
  Vendors = 'VENDORS',
  ChartOfAccounts = 'CHART_OF_ACCOUNTS',
  JournalEntries = 'JOURNAL_ENTRIES',
  Reports = 'REPORTS',
  AI_Assistant = 'AI_ASSISTANT',
}

export enum InvoiceStatus {
  Draft = 'DRAFT',
  Sent = 'SENT',
  Paid = 'PAID',
  Overdue = 'OVERDUE',
}

export enum BillStatus {
  Draft = 'DRAFT',
  Submitted = 'SUBMITTED',
  Paid = 'PAID',
}

export enum AccountType {
  Asset = 'Asset',
  Liability = 'Liability',
  Equity = 'Equity',
  Revenue = 'Revenue',
  Expense = 'Expense',
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  issueDate: string;
  dueDate: string;
  items: LineItem[];
  status: InvoiceStatus;
  taxRate: number; // as a percentage
}

export interface Bill {
  id: string;
  billNumber: string;
  vendorId: string;
  issueDate: string;
  dueDate: string;
  items: LineItem[];
  status: BillStatus;
  taxRate: number; // as a percentage
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
}

export interface JournalEntryLine {
  accountId: string;
  debit: number;
  credit: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  description: string;
  lines: JournalEntryLine[];
}

export interface FinancialData {
  customers: Customer[];
  vendors: Vendor[];
  invoices: Invoice[];
  bills: Bill[];
  accounts: Account[];
  journalEntries: JournalEntry[];
}
