import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return <h2>Welcome to Budget Tracker</h2>;
}

function Transactions({ transactions, onDeleteTransaction }) {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <span>{transaction.name}</span>
            <span>{transaction.amount}</span>
            <span>{transaction.date}</span>
            <button onClick={() => onDeleteTransaction(transaction.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Budgets({ budgets, onDeleteBudget }) {
  return (
    <div>
      <h2>Budgets</h2>
      <ul>
        {budgets.map((budget) => (
          <li key={budget.id}>
            <span>{budget.name}</span>
            <span>{budget.amount}</span>
            <span>{budget.date}</span>
            <button onClick={() => onDeleteBudget(budget.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExpenseCategories({ expenseCategories, onDeleteExpenseCategory }) {
  return (
    <div>
      <h2>Expense Categories</h2>
      <ul>
        {expenseCategories.map((category) => (
          <li key={category.id}>
            <span>{category.name}</span>
            <button onClick={() => onDeleteExpenseCategory(category.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Home, Transactions, Budgets, ExpenseCategories };
