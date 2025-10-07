
import React, { useState } from 'react';
import { View, FinancialData } from './types';
import { MOCK_DATA } from './constants';
import { Dashboard } from './components/dashboard/Dashboard';
import { InvoiceList } from './components/sales/InvoiceList';
import { AIChat } from './components/ai/AIChat';
import { DashboardIcon, InvoiceIcon, CustomerIcon, BillIcon, JournalIcon, ChartIcon, ReportIcon, AiIcon } from './components/ui/Icons';


const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
    <li
        onClick={onClick}
        className={`flex items-center p-3 my-1 rounded-md cursor-pointer transition-colors ${
            isActive ? 'bg-primary-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
        }`}
    >
        <span className="mr-3">{icon}</span>
        {label}
    </li>
);

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>(View.Dashboard);
    const [data] = useState<FinancialData>(MOCK_DATA);

    const renderView = () => {
        switch (currentView) {
            case View.Dashboard:
                return <Dashboard data={data} />;
            case View.Invoices:
                return <InvoiceList data={data} />;
            case View.AI_Assistant:
                 return <AIChat data={data} />;
            // Add other views here as components are created
            default:
                return <Dashboard data={data} />;
        }
    };
    
    const menuItems = [
      { view: View.Dashboard, label: 'Dashboard', icon: <DashboardIcon /> },
      { view: View.Invoices, label: 'Invoices', icon: <InvoiceIcon /> },
      { view: View.Customers, label: 'Customers', icon: <CustomerIcon /> },
      { view: View.Bills, label: 'Bills', icon: <BillIcon /> },
      { view: View.Vendors, label: 'Vendors', icon: <CustomerIcon /> },
      { view: View.ChartOfAccounts, label: 'Chart of Accounts', icon: <ChartIcon /> },
      { view: View.JournalEntries, label: 'Journal Entries', icon: <JournalIcon /> },
      { view: View.Reports, label: 'Reports', icon: <ReportIcon /> },
      { view: View.AI_Assistant, label: 'AI Assistant', icon: <AiIcon /> },
    ];


    return (
        <div className="flex h-screen bg-background text-text-primary font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-sidebar text-white flex flex-col">
                <div className="flex items-center justify-center h-20 border-b border-gray-700">
                    <h1 className="text-2xl font-bold">Zenith ERP</h1>
                </div>
                <nav className="flex-1 px-4 py-4">
                    <ul>
                        {menuItems.map(item => (
                            <NavItem
                                key={item.view}
                                icon={item.icon}
                                label={item.label}
                                isActive={currentView === item.view}
                                onClick={() => setCurrentView(item.view)}
                            />
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-20 bg-card border-b border-gray-200 flex items-center justify-end px-8">
                    {/* Header content like user profile, notifications can go here */}
                    <div className="flex items-center space-x-4">
                        <span className="text-text-secondary">Welcome, Admin</span>
                        <img src="https://picsum.photos/40" alt="User Avatar" className="w-10 h-10 rounded-full" />
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default App;
