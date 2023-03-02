import React, { useState } from "react";

function BudgetTracker() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([
    "groceries",
    "rent",
    "entertainment",
  ]);

  const [budget, setBudget] = useState(0);
  const [newBudget, setNewBudget] = useState(0);
  const [newExpense, setNewExpense] = useState("");
  const [newCategory, setNewCategory] = useState(categories[0]);
  const [newAmount, setNewAmount] = useState(0);
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));

  // set budget by weekly
  const [budgetPeriod] = useState("week");

  // add a new expense to the list of expenses
  const handleAddExpense = () => {
    if (!newExpense || !newCategory || newAmount <= 0 || !newDate || !categories.includes(newCategory)) {
      alert("Please fill in all fields with valid values.");
      return;
    }
    // if (!newExpense || !newCategory || newAmount <= 0 || !newDate) {
    //   alert("Please fill in all fields with valid values.");
    //   return;
    // }
  
    const newExpenseItem = {
      expense: newExpense,
      category: newCategory,
      amount: newAmount,
      date: newDate,
    };
    if (budget - getTotalExpenses() < newAmount) {
      alert("You do not have enough budget for this expense!");
    } else {
      setExpenses([...expenses, newExpenseItem]);
      setNewExpense("");
      setNewCategory(categories[0]);
      setNewAmount(0);
      setNewDate(new Date().toISOString().slice(0, 10));
    }
  };

  // calculate the total amount spent in a category
  const getTotalForCategory = (category) => {
    const filteredExpenses = expenses.filter(
      (expense) => expense.category === category
    );
    return filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);
  };

  // calculate the total amount spent for all categories
  const getTotalExpenses = () => {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  };

  // calculate the amount left to spend before reaching budget limit
  const getAmountLeftToSpend = () => {
    return budget - getTotalExpenses();
  };

  // calculate summary per category
  const renderCategorySummary = () => {
    return categories.map((category, index) => (
      <div key={index}>
        <span>{category}: </span>
        <span>{getTotalForCategory(category)}</span>
      </div>
    ));
  };

  // check if user has no money left
  const checkBudget = () => {
    if (getAmountLeftToSpend() < 0) {
      return (
        <div>
          <p>You have no money left!</p>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Budget Tracker</h1>
      <div>
        <label>Budget:</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => {
            if (getTotalExpenses() === 0) {
              setBudget(parseInt(e.target.value));
            } else {
              alert("You cannot change the budget if there are existing expenses.");
            }
          }}
          disabled={getTotalExpenses() > 0}
        />
        <button onClick={() => setBudget(0)}>Reset Budget</button>
      </div>
      <div>
        <label>Expense:</label>
        <input
          type="text"
          value={newExpense}
          onChange={(e) => setNewExpense(e.target.value)}
        />
        <label>Category:</label>
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <label>Amount:</label>
        <input
          type="number"
          value={newAmount}
          onChange={(e) => setNewAmount(parseInt(e.target.value))}
        />
        <label>Date:</label>
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <div>
        <h2>Expenses</h2>
        <table>
          <thead>
            <tr>
              <th>Expense</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.expense}</td>
                <td>{expense.category}</td>
                <td>${expense.amount}</td>
                <td>{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Summary per category</h2>
        {renderCategorySummary()}
      </div>
      <p>Remaining Budget: {budget - getTotalExpenses()}</p>
      {checkBudget()}
            
    </div>
  );
          }
          export default BudgetTracker;