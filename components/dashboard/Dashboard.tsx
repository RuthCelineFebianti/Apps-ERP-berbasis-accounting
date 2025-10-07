
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { FinancialData, Invoice, InvoiceStatus, BillStatus, AccountType } from '../../types';

interface DashboardProps {
  data: FinancialData;
}

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const MetricCard: React.FC<{ title: string; value: string; subtext: string }> = ({ title, value, subtext }) => (
  <Card>
    <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
    <p className="mt-1 text-3xl font-semibold text-text-primary">{value}</p>
    <p className="text-sm text-text-secondary">{subtext}</p>
  </Card>
);

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const totalRevenue = data.invoices
    .filter(inv => inv.status === InvoiceStatus.Paid)
    .reduce((acc, inv) => acc + inv.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0), 0);

  const totalExpenses = data.bills
    .filter(bill => bill.status === BillStatus.Paid)
    .reduce((acc, bill) => acc + bill.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0), 0);
  
  const netProfit = totalRevenue - totalExpenses;

  const accountsReceivable = data.invoices
    .filter(inv => inv.status === InvoiceStatus.Sent || inv.status === InvoiceStatus.Overdue)
    .reduce((acc, inv) => acc + inv.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0), 0);

  const accountsPayable = data.bills
    .filter(bill => bill.status === BillStatus.Submitted)
    .reduce((acc, bill) => acc + bill.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0), 0);

  const cashBalance = data.accounts.find(acc => acc.name === 'Cash')?.balance || 0;

  const chartData = [
    { name: 'Jan', Income: 4000, Expenses: 2400 },
    { name: 'Feb', Income: 3000, Expenses: 1398 },
    { name: 'Mar', Income: 2000, Expenses: 9800 },
    { name: 'Apr', Income: 2780, Expenses: 3908 },
    { name: 'May', Income: 1890, Expenses: 4800 },
    { name: 'Jun', Income: 2390, Expenses: 3800 },
    { name: 'Jul', Income: 3490, Expenses: 4300 },
  ];
  
  const recentInvoices = [...data.invoices].sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Revenue" value={formatCurrency(totalRevenue)} subtext="All paid invoices" />
        <MetricCard title="Total Expenses" value={formatCurrency(totalExpenses)} subtext="All paid bills" />
        <MetricCard title="Net Profit" value={formatCurrency(netProfit)} subtext={netProfit > 0 ? 'You are profitable!' : 'Review your expenses'} />
        <MetricCard title="Cash Balance" value={formatCurrency(cashBalance)} subtext="In your main cash account" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Income" stroke="#3b82f6" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Expenses" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Account Balances</h3>
          <div className="space-y-3">
             <div className="flex justify-between items-center">
                <span className="text-text-secondary">Accounts Receivable</span>
                <span className="font-semibold text-text-primary">{formatCurrency(accountsReceivable)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Accounts Payable</span>
                <span className="font-semibold text-text-primary">{formatCurrency(accountsPayable)}</span>
              </div>
              {data.accounts.filter(a => a.type === AccountType.Asset && a.name !== 'Cash').slice(0,3).map(acc => (
                 <div key={acc.id} className="flex justify-between items-center">
                  <span className="text-text-secondary">{acc.name}</span>
                  <span className="font-semibold text-text-primary">{formatCurrency(acc.balance)}</span>
                </div>
              ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Invoices</h3>
         <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentInvoices.map((invoice: Invoice) => {
                 const customer = data.customers.find(c => c.id === invoice.customerId);
                 const amount = invoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) * (1 + invoice.taxRate / 100);
                 return (
                    <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.invoiceNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer?.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(amount)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.status}</td>
                    </tr>
                 )
              })}
            </tbody>
        </table>
      </Card>
    </div>
  );
};
