import data from '@/utils/transactions.json';

export const ITEMS_PER_PAGE = 5;

export type Transaction = {
    date: string;
    amount: number;
    payee: string;
    category: string;
};

export type DataChart = {
    category: string; // 'health' | 'gifts' | 'groceries' | 'shopping' | 'education' | 'entertainment' | 'travel' | 'utilities' | 'home' | 'dining'
    expenses: number; 
    fill: string; 
};

export function getCurrentParameters() {
    const currentMonth = new Date().toLocaleString('en-us',{month:'numeric'});
    const currentYear = new Date().toLocaleString('en-us',{year:'numeric'});
    return { 
        currentMonth: parseInt(currentMonth, 10), 
        currentYear: parseInt(currentYear, 10) 
    };
}

function convertDateToInt(trDate: string) {
    return parseInt(new Date(`${trDate} 12:00:00 UTC`).toLocaleString('en-us',{day:'numeric'}), 10);
}

function sortTransactionsByDate(transactions: Transaction[]) {
    return transactions.sort((first, second) => {
        const dayFirst = convertDateToInt(first.date);
        const daySecond = convertDateToInt(second.date);
        return dayFirst === daySecond ? 0 : dayFirst < daySecond ? 1 : -1;
    });
}

export function getDataPerMonth(month: number, year: number) {
    const trByMonth: Transaction[] = data.filter((transaction) => {
        const monthExpense = parseInt(new Date(`${transaction.date} 12:00:00 UTC`).toLocaleString('en-us',{month:'numeric'}), 10);
        const yearExpense = parseInt(new Date(`${transaction.date} 12:00:00 UTC`).toLocaleString('en-us',{year:'numeric'}), 10);
        return (monthExpense === month && yearExpense === year);
    });
    return sortTransactionsByDate(trByMonth);
}

export function calculateExpensesPerMonth(transactions: Transaction[]) {
    return transactions.reduce((accumulator, currentTransaction) => 
        accumulator + currentTransaction.amount, 0);
}

export function calculateExpensesByCategory(transactions: Transaction[], category: string) {
    return transactions.reduce((accumulator, currentTransaction) => {
        if (currentTransaction.category === category) {
            accumulator += currentTransaction.amount;
        }
        return accumulator;
    }, 0);
}
