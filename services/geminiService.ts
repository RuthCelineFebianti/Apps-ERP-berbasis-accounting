
import { GoogleGenAI } from "@google/genai";
import { FinancialData } from '../types';

if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getFinancialAnalysis = async (query: string, data: FinancialData): Promise<string> => {
    if (!process.env.API_KEY) {
        return "API Key is not configured. Please set the API_KEY environment variable to use the AI Assistant.";
    }

    const model = 'gemini-2.5-flash';
    
    // Create a simplified summary of the data to keep the prompt concise
    const dataSummary = {
        totalCustomers: data.customers.length,
        totalVendors: data.vendors.length,
        invoiceSummary: data.invoices.map(inv => ({ id: inv.invoiceNumber, status: inv.status, total: inv.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) })),
        billSummary: data.bills.map(bill => ({ id: bill.billNumber, status: bill.status, total: bill.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) })),
        accountBalances: data.accounts.map(acc => ({ name: acc.name, type: acc.type, balance: acc.balance })),
    };

    const prompt = `
        You are an expert financial analyst for a small business. Your name is Zenith AI.
        Analyze the following financial data summary and answer the user's question.
        Provide clear, concise, and actionable insights. Format your response using markdown.

        **Financial Data Summary:**
        \`\`\`json
        ${JSON.stringify(dataSummary, null, 2)}
        \`\`\`

        **User's Question:**
        "${query}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "I'm sorry, I encountered an error while analyzing your data. Please try again later.";
    }
};
