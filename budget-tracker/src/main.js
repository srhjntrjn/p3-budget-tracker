import React, { useState } from "react";
import "./App.css";
import { Pie } from 'react-chartjs-2';
import TableExpense from "./components/TableExpense";
import Chart from 'chart.js/auto';


function BudgetTracker() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([
    "Food",
    "Groceries",
    "Rent",
    "Bills",
    "Entertainment",
    "Health/Medication",
    "Transpo",
  ]);

  const [budget, setBudget] = useState(0);
  const [newExpense, setNewExpense] = useState("");
  const [newCategory, setNewCategory] = useState(categories[0]);
  const [newAmount, setNewAmount] = useState(0);
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));



  const handleAddExpense = () => {
    if (!newExpense || !newCategory || newAmount <= 0 || !newDate || !categories.includes(newCategory)) {
      alert("Please fill in all fields with valid values.");
      return;
    }

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
        <span> P {getTotalForCategory(category)}</span>
      </div>
    ));
  };
  //reset budget button
  const resetBudget = () => {

    setBudget(0);
    setExpenses([]);
    const newExpenseItem = [];

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

  //creacting pie chart
  const myExpenses = getTotalExpenses();
  const RemainingMoney = budget - myExpenses;

  const data = {
    labels: ["Remaining Money", "Expenses"],
    datasets: [
      {
        data: [RemainingMoney, myExpenses],
        backgroundColor: ["#1c8249", "#FFCE56"],
      },
    ],
  };
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PhP',

  });
  return (
    <>
      <div className="main">
        <div className="container">
          <div><h1>Budget Tracker</h1></div>
          <div className="setBudget">
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
            <button onClick={resetBudget} className='reset' ></button>

            <div className="setExpense">
              <label>Description:</label>
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
                  <option key={category} value={category}>{category}</option>
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
              <button onClick={handleAddExpense} className='addButton'></button>
            </div>
          </div>
          <div className="summary">
          <div className="category">
            <h2>Summary</h2>
            {renderCategorySummary()}
            <p className="totalExpenses">Total Expenses: {formatter.format(getTotalExpenses())} </p>
          </div>
          <div className="chart">
            <Pie data={data} />
          </div>
        
        </div>
        </div>

        
        <div className="Expenses">
            <h2>Expenses</h2>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (

                  <TableExpense
                    expense={expense}
                    indes={index}
                    formatter={formatter}
                  />

                ))}
              </tbody>
            </table>
            <div className="checkBudget">

            <p className="remainingMoney">Remaining Money: {formatter.format(budget - getTotalExpenses())}</p>
            {checkBudget()}
          </div>
          </div>
          
      </div>
      {/* <div className="container">
          
          <div className="setBudget">
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
            <button onClick={resetBudget} className='reset' ></button>

          </div>
          <div className="setExpense">
            <label>Description:</label>
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
                <option key={category} value={category}>{category}</option>
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
            <button onClick={handleAddExpense} className='addButton'></button>
          </div>
          <div className="setExpense">
            <h2>Expenses</h2>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (

                  <TableExpense 
                    expense={expense}
                    indes={index}
                    formatter={formatter}
                  />
              
                ))}
              </tbody>
            </table>
          </div>
          <div className="checkBudget">

            <p className="remainingMoney">Remaining Money: {formatter.format(budget - getTotalExpenses())}</p>
            {checkBudget()}
          </div>
        </div>
        <div className="summary">
          <div className="category">
            <h2>Summary</h2>
            {renderCategorySummary()}
            <p className="totalExpenses">Total Expenses: {formatter.format(getTotalExpenses())} </p>
          </div>
          <div className="chart">
            <Pie data={data} />
          </div>
        </div>
    */}
    </>
  );
}
export default BudgetTracker;