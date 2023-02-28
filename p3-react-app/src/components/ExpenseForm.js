import React from 'react';
import { useState, useContext } from 'react';
import { ExpenseTrackerContext } from '../context/context';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { ADD_EXPENSE } from '../context/constants';

const ExpenseForm = () => {
  const navigate= useNavigate();
  const { dispatch } = useContext(ExpenseTrackerContext);
  const [expense, setExpense] = useState({
    category: '',
    amount: 0,
    date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      ...expense,
      id: uuidv4(),
    };
    dispatch({ type: ADD_EXPENSE, payload: newExpense });
    navigate.push('/');
  };

  const handleCategoryChange = (e) => {
    setExpense({ ...expense, category: e.target.value });
  };

  const handleAmountChange = (e) => {
    setExpense({ ...expense, amount: e.target.value });
  };

  const handleDateChange = (e) => {
    setExpense({ ...expense, date: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" value={expense.category} onChange={handleCategoryChange}>
          <option value="rent">Rent</option>
          <option value="health">Health</option>
          <option value="food">Food</option>
          <option value="transportation">Transportation</option>
        </select>
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" value={expense.amount} onChange={handleAmountChange} />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={expense.date} onChange={handleDateChange} />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
